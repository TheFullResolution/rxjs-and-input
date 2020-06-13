import { Component, Input, OnInit } from "@angular/core";
import { Item } from "../../types/item";

@Component({
  selector: "app-item",
  template: `
    <mat-card class="card">
      <p>{{item.value}}</p>
    </mat-card>
  `,
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
  @Input()
  item!: Item;

  constructor() {}

  ngOnInit(): void {

  }
}
