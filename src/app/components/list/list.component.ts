import { Component, OnInit } from "@angular/core";
import { ListService } from "../../services/list.service";
import { Item } from "../../types/item";
import { Observable } from "rxjs";

@Component({
  selector: "app-list",
  template: `
    <mat-list role="list">
      <ng-container *ngIf="list$ | async as list">
        <mat-list-item
          role="listitem"
          *ngFor="let item of list; trackBy: trackById"
        >
          <app-item [item]="item"></app-item>
        </mat-list-item>
      </ng-container>
    </mat-list>
  `,
  styles: [],
})
export class ListComponent implements OnInit {
  list$: Observable<Item[]>;

  constructor(private listService: ListService) {
    this.list$ = this.listService.list$;
  }

  ngOnInit(): void {}

  trackById = (index: number, item: Item) => item.id;
}
