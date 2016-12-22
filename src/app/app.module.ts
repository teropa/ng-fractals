import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PythagorasComponent } from './pythagoras/pythagoras.component';

@NgModule({
  declarations: [
    AppComponent,
    PythagorasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
