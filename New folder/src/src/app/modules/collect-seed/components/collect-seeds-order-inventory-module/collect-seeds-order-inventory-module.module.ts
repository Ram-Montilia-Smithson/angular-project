import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectSeedsOrderInventoryModuleRoutingModule } from './collect-seeds-order-inventory-module-routing.module';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';
import { CollectSeedsOrderInventoryComponent } from '../collect-seeds-order-inventory/collect-seeds-order-inventory.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CollectSeedsOrderInventoryModuleRoutingModule],
  providers: [{ provide: STEP_PREFIX, useValue: 'inventory' }], 
}) 
export class CollectSeedsOrderInventoryModuleModule {}
