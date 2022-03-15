import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletStepComponent } from 'src/app/shared/components/outlet-step/outlet-step.component';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix'; 
import { CollectContestYearlyDetailsComponent } from '../../collect-contest-yearly-details/collect-contest-yearly-details.component';

const routes: Routes = [
  {
    path: '',
    component: OutletStepComponent,
    children: [{ path: '', component: CollectContestYearlyDetailsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: MODULE_PREFIX, useValue: 'yearly-details' }],
})
export class YearlyDetailsRoutingModule {}