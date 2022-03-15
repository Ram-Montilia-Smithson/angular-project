import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletStepComponent } from 'src/app/shared/components/outlet-step/outlet-step.component';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';
import { CollectSeedsOrderInventoryComponent } from '../collect-seeds-order-inventory/collect-seeds-order-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: OutletStepComponent,
    children: [{ path: '', component: CollectSeedsOrderInventoryComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: STEP_PREFIX, useValue: 'inventory' }],
})
export class CollectSeedsOrderInventoryModuleRoutingModule {}
 