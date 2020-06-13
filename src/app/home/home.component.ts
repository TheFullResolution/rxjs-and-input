import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  template: `
    <main class="container">
      <app-input></app-input>
      <app-list></app-list>
    </main>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
