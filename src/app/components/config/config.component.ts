import { DOCUMENT } from "@angular/common";
import { MatSelectChange } from "@angular/material/select";
import range from "lodash.range";
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { combineLatest, Observable, of, Subject } from "rxjs";
import {
  concatMap,
  delay,
  distinctUntilChanged,
  filter,
  map,
  skipWhile,
  takeUntil,
} from "rxjs/operators";
import { GlobalService, GlobalState } from "../../services/global.service";

@Component({
  selector: "app-config",
  template: `
    <div class="container">
      <mat-slide-toggle
        color="primary"
        [checked]="(globalState$ | async)?.backgroundError"
        (change)="toggleBackground($event)"
      >
        Background Color Animations
      </mat-slide-toggle>
      <mat-form-field appearance="outline" hintLabel="options 1 to 10">
        <mat-label>Service 1 Retry Count</mat-label>
        <mat-select
          [value]="(globalState$ | async)?.retries"
          (selectionChange)="updateRetries($event)"
        >
          <mat-option *ngFor="let option of options" [value]="option">
            {{ option }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styleUrls: ["./config.component.scss"],
})
export class ConfigComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe$ = new Subject();
  options = range(1, 11);
  globalState$: Observable<GlobalState>;

  constructor(
    private globalService: GlobalService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.globalState$ = this.globalService.globalState$;
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  ngOnInit(): void {
    combineLatest(
      this.globalService.errorTrigger$,
      this.globalService.globalState$.pipe(
        map((state) => state.backgroundError),
        distinctUntilChanged()
      )
    )
      .pipe(
        takeUntil(this._ngUnsubscribe$),
        filter(([error, animation]) => animation),
        map(([error, animation]) => error),
        concatMap((el) =>
          of(el).pipe(
            delay(100),
            map((el) => {
              this.renderer.addClass(this.document.body, "errorBody");
              return el;
            }),
            delay(300),
            map((el) => {
              this.renderer.removeClass(this.document.body, "errorBody");
              return el;
            }),
            delay(100)
          )
        )
      )
      .subscribe();
  }

  toggleBackground(change: MatSlideToggleChange) {
    this.globalService.updateState({ backgroundError: change.checked });
  }

  updateRetries(change: MatSelectChange) {
    this.globalService.updateState({ retries: change.value });
  }
}
