import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletStepComponent } from 'src/app/shared/components/outlet-step/outlet-step.component';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix'; 
import { CollectContestWorkInstructionsStandComponent } from '../../collect-contest-work-instructions-stand/collect-contest-work-instructions-stand.component';
 
const routes: Routes = [
  {
    path: '',
    component: OutletStepComponent,
    children: [{ path: '', component: CollectContestWorkInstructionsStandComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: MODULE_PREFIX, useValue: 'work-instructions-stand' }],
})
export class WorkInstructionsStandRoutingModule {}