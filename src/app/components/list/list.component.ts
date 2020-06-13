import { Component, OnInit } from "@angular/core";
import { ListService } from "../../services/list.service";
import { ItemState } from "../../types/item.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-list",
  template: `
    <ul class="list">
      <ng-container *ngIf="list$ | async as list">
        <li *ngFor="let item of list; trackBy: trackById" class="item">
          <app-item [item]="item"></app-item>
        </li>
      </ng-container>
    </ul>
  `,
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  list$: Observable<ItemState[]>;

  constructor(private listService: ListService) {
    this.list$ = this.listService.list$;
  }

  ngOnInit(): void {}

  trackById = (index: number, item: ItemState) => item.id;
}
