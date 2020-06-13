import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnDestroy, Renderer2 } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { delay, map, takeUntil } from "rxjs/operators";

export interface GlobalState {
  backgroundError: boolean;
  retries: number;
}

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  private _globalState$ = new BehaviorSubject<GlobalState>({
    backgroundError: true,
    retries: 3,
  });
  private _errorTrigger$ = new Subject<null>();

  public globalState$ = this._globalState$.asObservable();
  public errorTrigger$ = this._errorTrigger$.asObservable();

  constructor() {}

  updateState(newState: Partial<GlobalState>) {
    const oldState = this._globalState$.getValue();

    this._globalState$.next({ ...oldState, ...newState });
  }

  triggerError() {
    this._errorTrigger$.next(null);
  }
}
