import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectSeedsOrderAmountModuleRoutingModule } from './collect-seeds-order-amount-module-routing.module';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CollectSeedsOrderAmountModuleRoutingModule
  ],
  providers: [{ provide: STEP_PREFIX, useValue: 'amount' }],

})
export class CollectSeedsOrderAmountModuleModule { }
