import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletStepComponent } from 'src/app/shared/components/outlet-step/outlet-step.component';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { CollectSeedOrderDetailsComponent } from '../collect-seed-order-details/collect-seed-order-details.component';

const routes: Routes = [
  {path:'', component:OutletStepComponent,children:[
    { path: '', component: CollectSeedOrderDetailsComponent },
  ]}
]; 
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class CollectSeedsOrderDetailsModuleRoutingModule {}
