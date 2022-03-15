import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix'; 
import { WorkInstructionsRoutingModule } from './work-instructions.routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkInstructionsRoutingModule
  ],
  providers: [{ provide: STEP_PREFIX, useValue: 'work-instructions' }],

})
export class WrokInstructionsModule { }
