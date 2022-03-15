import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from 'src/app/shared/components/outlet/outlet.component';
import { CollectContestTableComponent } from './collect-contest-table/collect-contest-table.component';
import { ContestStepperComponent } from './contest-stepper/contest-stepper.component';


const routes: Routes = [
    { path: 'collect-contest-table', component: CollectContestTableComponent },
    {
        path: '',
        component: OutletComponent,
        children: [
            {
                path: 'stepper',
                component: ContestStepperComponent,
                children: [
                    {
                        path: 'details',
                        loadChildren: () =>
                            import(
                                './modules/details/details.module'
                            ).then((m) => m.DetailsModule),
                    },
                    {
                        path: 'yearly-details',
                        loadChildren: () =>
                            import(
                                './modules/yearly-details/yearly-details.module'
                            ).then((m) => m.YearlyDetailsModule),

                    },
                    {
                        path: 'work-instructions',
                        loadChildren: () =>
                            import(
                                './modules/work-instructions/work-instructions.module'
                            ).then((m) => m.WrokInstructionsModule),

                    },
                    {
                        path: 'work-instructions-stand',
                        loadChildren: () =>
                            import(
                                './modules/work-instructions-stand/work-instructions-stand.module'
                            ).then((m) => m.WrokInstructionsStandModule),

                    },
                ]
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CollectContestRoutingModule { }