import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CollectSeedRoutingModule } from './collect-seed-routing.module';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollectSeedsTableComponent } from './components/collect-seeds-table/collect-seeds-table.component';
import { CollectSeedOrderComponent } from './components/collect-seed-order/collect-seed-order.component';
import { CollectSeedOrderDetailsComponent } from './components/collect-seed-order-details/collect-seed-order-details.component';
import { CollectSeedsOrderLocationComponent } from './components/collect-seeds-order-location/collect-seeds-order-location.component';
import { CollectSeedsOrderAmountComponent } from './components/collect-seeds-order-amount/collect-seeds-order-amount.component';
import { CollectSeedsOrderInventoryComponent } from './components/collect-seeds-order-inventory/collect-seeds-order-inventory.component';
import { CollectSeedsIframeComponent } from './components/collect-seeds-table/collect-seeds-iframe/collect-seeds-iframe.component';
// import {SeedsCollectComponent,SeedsCollectService,SeedsCollectModule} from 'yaaranut-gis'

@NgModule({
  declarations: [
    CollectSeedsTableComponent,
    CollectSeedOrderComponent,
    CollectSeedOrderDetailsComponent,
    CollectSeedsOrderLocationComponent,
    CollectSeedsOrderAmountComponent,
    CollectSeedsOrderInventoryComponent,
    CollectSeedsIframeComponent
  ],
  // imports: [CommonModule, CollectSeedRoutingModule, SharedModule,SeedsCollectModule],
  imports: [CommonModule, CollectSeedRoutingModule, SharedModule],

  providers: [{ provide: MODULE_PREFIX, useValue: 'collect-seeds' },DatePipe],
})
export class CollectSeedModule {}
