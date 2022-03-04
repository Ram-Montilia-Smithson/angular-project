import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { KakalUiModule } from '@ComraxLTD/kakal-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    KakalUiModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
