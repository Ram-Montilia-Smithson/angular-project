import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletStepComponent } from 'src/app/shared/components/outlet-step/outlet-step.component';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';
import { CollectSeedsOrderLocationComponent } from '../collect-seeds-order-location/collect-seeds-order-location.component';

const routes: Routes = [
  {
    path: '',
    component: OutletStepComponent,
    children: [{ path: '', component: CollectSeedsOrderLocationComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: STEP_PREFIX, useValue: 'location' }],
})
export class CollectSeedsOrderLocationModuleRoutingModule {}
