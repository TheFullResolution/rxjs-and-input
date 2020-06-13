import {
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ItemState, ItemStatus } from "../../types/item.state";
import { ItemService } from "../../services/item.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-item",
  template: `
    <mat-card class="card">
      <mat-card-content class="content">
        <div class="space">
          <h2>Value: {{ item.value }}</h2>
          <p class="withIcon">Status: {{ itemState?.status }}</p>
        </div>
        <div class="space service">
          <p>Service1: {{ itemState?.service1 }}</p>
          <p>Service2: {{ itemState?.service2 }}</p>
        </div>
        <div class="space visual">
          <mat-spinner
            *ngIf="itemState?.processing"
            [diameter]="50"
            class="spinner"
          ></mat-spinner>
          <mat-icon
            *ngIf="isCancelled() && !itemState?.processing"
            class="error"
          >
            cancel_presentation
          </mat-icon>
          <mat-icon *ngIf="isFailed() && !itemState?.processing" class="error">
            cancel
          </mat-icon>
          <mat-icon *ngIf="isProcessed() && !itemState?.processing" class="processed">
            done_outline
          </mat-icon>
          <div *ngIf="checkIfRetry() && !itemState?.processing" class="buttons">
            <button mat-raised-button color="warn" (click)="cancel()">
              Cancel
            </button>
            <button mat-raised-button color="accent" (click)="continue()">
              Skip Service1
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./item.component.scss"],
  providers: [ItemService],
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input()
  item!: ItemState;
  itemState: ItemState | null = null;
  private _ngUnsubscribe$ = new Subject();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.state$
      .pipe(takeUntil(this._ngUnsubscribe$))
      .subscribe((state) => {
        this.itemState = state;
      });

    this.itemService.initialize(this.item);
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  checkIfRetry() {
    return this.itemState?.status === ItemStatus.failedService1;
  }

  isCancelled() {
    return this.itemState?.status === ItemStatus.cancelled;
  }

  isFailed() {
    return this.itemState?.status === ItemStatus.failedService2;
  }

  isProcessed() {
    return this.itemState?.status === ItemStatus.processed;
  }

  cancel() {
    this.itemService.cancel();
  }

  continue() {
    this.itemService.continue(this.item);
  }
}
