import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { InputComponent } from "./components/input/input.component";
import { ListComponent } from "./components/list/list.component";
import { HeaderComponent } from "./components/header/header.component";
import { ItemComponent } from "./components/item/item.component";
import { ConfigComponent } from './components/config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ListComponent,
    HomeComponent,
    HeaderComponent,
    ItemComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
