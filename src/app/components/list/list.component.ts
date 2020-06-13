import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { fadeInOut } from "../../animations/fadeInOut";
import { ListService } from "../../services/list.service";
import { ItemState } from "../../types/item.state";

const animations = fadeInOut(0.6);

@Component({
  selector: "app-list",
  animations: [animations],
  template: `
    <ul class="list">
      <ng-container *ngIf="list$ | async as list">
        <li
          *ngFor="let item of list; trackBy: trackById"
          class="item"
          [@fadeInOut]
        >
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
