import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KakalUiModule } from '@ComraxLTD/kakal-ui';
import { MaterialModule } from '../angular-material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KakalUiModule,
    MaterialModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
