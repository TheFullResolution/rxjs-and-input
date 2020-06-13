import { Injectable, OnDestroy } from "@angular/core";
import { ItemState, itemDefault, ItemStatus } from "../types/item.state";
import { combineLatest, merge, Observable, of, Subject } from "rxjs";
import {
  catchError,
  filter,
  flatMap,
  map,
  retryWhen,
  scan,
  shareReplay,
  startWith,
  tap,
} from "rxjs/operators";
import { Service1Service } from "./service1.service";
import { checkIfOnlyNumeric } from "../utils/checkIfOnlyNumeric";
import { Service2Service } from "./service2.service";
import { retryWhenConfig } from "../utils/retryWhenConfig";
import {
  Action,
  ActionType,
  InitializeAction,
  StartService1Action,
  StartService2Action,
} from "../types/item.actions";

@Injectable()
export class ItemService implements OnDestroy {
  private actions$: Subject<Action> = new Subject();

  constructor(
    private service1: Service1Service,
    private service2: Service2Service
  ) {}

  ngOnDestroy() {
    this.actions$.complete();
  }

  dispatch(action: Action) {
    this.actions$.next(action);
  }

  initialize(item: ItemState) {
    this.dispatch({
      type: ActionType.initialize,
      payload: item,
    });
  }

  private initializeValue$: Observable<Action> = this.actions$.pipe(
    filter(
      (action): action is InitializeAction =>
        action.type === ActionType.initialize
    ),
    map((action) => {
      const { value } = action.payload;

      if (checkIfOnlyNumeric(value)) {
        this.dispatch({
          type: ActionType.startService1,
          payload: { value },
        });
      } else {
        this.dispatch({
          type: ActionType.startService2,
          payload: { value, service1: null },
        });
      }
      return {
        type: ActionType.setState,
        payload: action.payload,
      };
    })
  );

  private startService1$: Observable<Action> = this.actions$.pipe(
    filter(
      (action): action is StartService1Action =>
        action.type === ActionType.startService1
    ),
    flatMap((action) => {
      return combineLatest(
        this.service1
          .processValue(action.payload.value)
          .pipe(retryWhen(retryWhenConfig(1, 100))),
        [action.payload.value]
      );
    }),
    map(([service1, value]) => {
      this.dispatch({
        type: ActionType.startService2,
        payload: { service1, value },
      });

      return {
        type: ActionType.finishedService1,
        payload: { service1 },
      };
    }),
    catchError((error) =>
      of({
        type: ActionType.errorService1,
        payload: { error: error.message },
      })
    )
  );

  private startService2$: Observable<Action> = this.actions$.pipe(
    filter(
      (action): action is StartService2Action =>
        action.type === ActionType.startService2
    ),
    flatMap((action) => {
      return this.service2.processValue(
        action.payload.value,
        action.payload.service1
      );
    }),
    map((service2) => {
      return {
        type: ActionType.finishedService2,
        payload: { service2 },
      };
    }),
    catchError((error) =>
      of({
        type: ActionType.errorService2,
        payload: { error: error.message },
      })
    )
  );

  private dispatcher$: Observable<Action> = merge(
    this.actions$,
    this.initializeValue$,
    this.startService1$,
    this.startService2$
  );

  state$ = this.dispatcher$.pipe(
    scan((state: ItemState, action: Action) => {
      console.log(JSON.stringify(action.type, null, 2), {
        payload: (action as any).payload,
      });

      switch (action.type) {
        case ActionType.initialize:
          return action.payload;
        case ActionType.startService1:
          return { ...state, processing: true, status: ItemStatus.service1 };
        case ActionType.errorService1:
          return {
            ...state,
            processing: false,
            service1: action.payload.error,
            status: ItemStatus.failedService1,
          };
        case ActionType.finishedService1:
          return {
            ...state,
            service1: action.payload.service1,
          };
        case ActionType.startService2:
          return { ...state, processing: true, status: ItemStatus.service2 };
        case ActionType.errorService2:
          return {
            ...state,
            processing: false,
            service2: action.payload.error,
            status: ItemStatus.failedService2,
          };
        case ActionType.finishedService2:
          return {
            ...state,
            service2: action.payload.service2,
            processing: false,
            status: ItemStatus.processed,
          };

        default:
          return state;
      }
    }, {} as ItemState),
    shareReplay(1)
  );
}
