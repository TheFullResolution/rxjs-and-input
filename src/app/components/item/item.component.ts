import {
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ItemState } from "../../types/item.state";
import { ItemService } from "../../services/item.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-item",
  template: `
    <mat-card class="card">
      <mat-card-content>
        <div>
          <h2>Value: {{ item.value }}</h2>
          <p>Status: {{ itemState?.status }}</p>
        </div>
        <div>
          <p>Service1: {{ itemState?.service1 }}</p>
          <p>Service2: {{ itemState?.service2 }}</p>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
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
}
