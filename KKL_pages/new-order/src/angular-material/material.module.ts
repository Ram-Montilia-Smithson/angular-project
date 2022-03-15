import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ]
})

export class MaterialModule { }
