import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';
import { DetailsRoutingModule } from './details.routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsRoutingModule
  ],
  providers: [{ provide: STEP_PREFIX, useValue: 'details' }],

})
export class DetailsModule { }
