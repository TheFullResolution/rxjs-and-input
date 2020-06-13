import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatSelectModule} from '@angular/material/select'
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {MatSliderModule} from '@angular/material/slider'

@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
})
export class MaterialModule {}
