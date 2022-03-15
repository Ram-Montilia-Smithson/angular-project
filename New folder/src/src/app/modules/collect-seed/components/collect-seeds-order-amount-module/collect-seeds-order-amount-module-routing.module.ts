import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletStepComponent } from 'src/app/shared/components/outlet-step/outlet-step.component';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { CollectSeedsOrderAmountComponent } from '../collect-seeds-order-amount/collect-seeds-order-amount.component';
import { CollectSeedsOrderInventoryComponent } from '../collect-seeds-order-inventory/collect-seeds-order-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: OutletStepComponent,
    children: [{ path: '', component: CollectSeedsOrderInventoryComponent }],

    // children: [{ path: '', component: CollectSeedsOrderAmountComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: MODULE_PREFIX, useValue: 'amount' }],
})
export class CollectSeedsOrderAmountModuleRoutingModule {}
