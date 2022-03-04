import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KakalUiModule } from '@ComraxLTD/kakal-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KakalUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
