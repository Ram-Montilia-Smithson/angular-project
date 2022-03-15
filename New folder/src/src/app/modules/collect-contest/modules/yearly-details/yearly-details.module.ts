import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix'; 
import { YearlyDetailsRoutingModule } from './yearly-details.routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    YearlyDetailsRoutingModule
  ],
  providers: [{ provide: STEP_PREFIX, useValue: 'yearly-details' }],

})
export class YearlyDetailsModule { }
