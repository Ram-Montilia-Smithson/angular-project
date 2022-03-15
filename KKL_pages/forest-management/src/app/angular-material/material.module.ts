import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    FlexLayoutModule
  ]
})

export class MaterialModule { }
