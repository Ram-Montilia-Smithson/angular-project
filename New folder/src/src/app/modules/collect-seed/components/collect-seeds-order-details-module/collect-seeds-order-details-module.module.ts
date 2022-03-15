import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectSeedsOrderDetailsModuleRoutingModule } from './collect-seeds-order-details-module-routing.module';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CollectSeedsOrderDetailsModuleRoutingModule
  ],
  providers: [{ provide: STEP_PREFIX, useValue: 'details' }],

})
export class CollectSeedsOrderDetailsModuleModule { }
