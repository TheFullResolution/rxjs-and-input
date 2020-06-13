import { Component, OnInit } from "@angular/core";
import { ListService } from "../../services/list.service";

@Component({
  selector: "app-input",
  template: `
    <form (ngSubmit)="onSubmit()" #inputForm="ngForm" class="container">
      <mat-form-field appearance="outline" class="input" color="accent">
        <mat-label>Input Your Value Here</mat-label>
        <input
          matInput
          matAutosize
          type="text"
          [(ngModel)]="input.value"
          name="name"
          autocomplete="off"
        />
        <button
          type="button"
          mat-button
          *ngIf="input.value"
          matSuffix
          mat-icon-button
          aria-label="Input"
          (click)="input.value = ''"
          required
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
      <div class="buttons">
        <button
          type="submit"
          [disabled]="!inputForm.form.valid"
          mat-raised-button
        >
          Submit
        </button>
      </div>
    </form>
  `,
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  input = { value: "" };

  constructor(private listService: ListService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.listService.processNewInput(this.input.value);

    this.input.value = "";
  }
}
