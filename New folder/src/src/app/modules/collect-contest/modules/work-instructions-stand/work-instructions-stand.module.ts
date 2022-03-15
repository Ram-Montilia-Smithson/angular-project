import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';  
import { WorkInstructionsStandRoutingModule } from './work-instructions-stand.routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkInstructionsStandRoutingModule
  ],
  providers: [{ provide: STEP_PREFIX, useValue: 'work-instructions-stand' }],

})
export class WrokInstructionsStandModule { }
