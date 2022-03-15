import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForestDescriptionComponent } from './components/forest-description/forest-description.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { AddBeeCompleteComponent } from './screens/add-bee-complete/add-bee-complete.component';
import { AddBeePlanComponent } from './screens/add-bee-plan/add-bee-plan.component';
import { AddProductionProcessComponent } from './screens/add-production-process/add-production-process.component';
import { AddProductionProgramComponent } from './screens/add-production-program/add-production-program.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { DilolYarotComponent } from './screens/dilol-yarot/dilol-yarot.component';
import { LoginBackdropComponent } from './screens/login-backdrop/login-backdrop.component';
import { LoginComponent } from './screens/login-backdrop/login/login.component';
import { OrderPlantsCompleteComponent } from './screens/order-plants-complete/order-plants-complete.component';
import { OrderPlantsComponent } from './screens/order-plants/order-plants.component';
import { ProductionProcessComponent } from './screens/production-process/production-process.component';
import { ResultsComponent } from './screens/results/results.component';
import { ForestyComponent } from './screens/search/foresty/foresty.component';
import { FormComponent } from './screens/search/foresty/form/form.component';
import { SpatialProductionProgramComponent } from './screens/spatial-production-program/spatial-production-program.component';
import { WorkingUnitComponent } from './screens/working-unit/working-unit.component';


/*const routes: Routes = [
  {path:'' , component:FormComponent},
  {path:'Work-unit-for-diluting-search-results' , component:WorkUnitForDilutingSearchResultsComponent},
];*/
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forestry/results', component: ResultsComponent },
  { path: 'forestry/dashboard', component:DashboardComponent },
  { path: 'forestry/spatial-production-program', component: SpatialProductionProgramComponent },
  { path: 'forestry/add-production-process', component: AddProductionProcessComponent },
  { path: 'forestry/production-process', component: ProductionProcessComponent },
  { path: 'forestry/add-production-program', component: AddProductionProgramComponent },
  { path: 'forestry/search', component: ForestyComponent },
  { path: 'work-unit', component: WorkingUnitComponent },
  { path: 'fd', component: ForestDescriptionComponent },
  { path: 'form', component: FormComponent },
  { path: 'login', component: LoginBackdropComponent },
  { path: 'dilol-yarot', component: DilolYarotComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'wizard', component: WizardComponent },
  { path: 'forestry/add-bee-plan', component: AddBeePlanComponent },
  { path: 'forestry/add-bee-plan-complete', component: AddBeeCompleteComponent },
  // { path: 'forestry/filter', component: FiltersComponent },
  // { path: '**', redirectTo: '/login' },
  { path: 'forestry/order-plants-complete', component: OrderPlantsCompleteComponent },
  { path: 'forestry/order-plants', component: OrderPlantsComponent },
  {path:'collect-seeds', loadChildren:()=>import('./modules/collect-seed/collect-seed.module').then(m=>m.CollectSeedModule)},
  {path:'collect-contest', loadChildren:()=>import('./modules/collect-contest/collect-contest.module').then(m=>m.CollectContestModule)},
  { path: '**', component: LoginBackdropComponent, pathMatch: 'full' },


];
@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
