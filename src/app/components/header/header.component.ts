import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  template: `
    <header class="mat-typography header">
      <picture>
        <img
          sizes="(max-width: 1380px) 100vw, 1380px"
          srcset="
            assets/header_h9zbgv_w_460.jpg   460w,
            assets/header_h9zbgv_w_773.jpg   773w,
            assets/header_h9zbgv_w_1056.jpg 1056w,
            assets/header_h9zbgv_w_1295.jpg 1295w,
            assets/header_h9zbgv_w_1380.jpg 1380w
          "
          src="assets/header_h9zbgv_w_1380.jpg"
          alt=""
        />
      </picture>
      <h1>Input Value Generator</h1>
    </header>
  `,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
