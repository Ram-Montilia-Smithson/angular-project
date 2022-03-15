import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectContestTableComponent } from './collect-contest-table/collect-contest-table.component';
import { CollectContestRoutingModule } from './collect-contest-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { CollectContestDetailsComponent } from './collect-contest-details/collect-contest-details.component';
import { CollectContestYearlyDetailsComponent } from './collect-contest-yearly-details/collect-contest-yearly-details.component';
import { CollectContestWorkInstructionsComponent } from './collect-contest-work-instructions/collect-contest-work-instructions.component';
import { CollectContestWorkInstructionsStandComponent } from './collect-contest-work-instructions-stand/collect-contest-work-instructions-stand.component';
import { ContestStepperComponent } from './contest-stepper/contest-stepper.component';
import { AreaActionsTableComponent } from './collect-contest-work-instructions-stand/components/area-actions-table/area-actions-table.component';

import { ForestryTendersModule} from 'yaaranut-gis'
@NgModule({
    declarations: [
        CollectContestTableComponent,
        ContestStepperComponent,
        CollectContestDetailsComponent,
        CollectContestYearlyDetailsComponent,
        CollectContestWorkInstructionsComponent,
        CollectContestWorkInstructionsStandComponent,
        AreaActionsTableComponent,
    ],
    imports: [CommonModule, CollectContestRoutingModule,SharedModule,ForestryTendersModule],
    providers: [{ provide: MODULE_PREFIX, useValue: 'collect-contest' }],
  
  })
  export class CollectContestModule {}