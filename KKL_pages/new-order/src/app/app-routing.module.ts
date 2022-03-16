import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent, NavbarBottomComponent, NavbarComponent, NavigationComponent, StepperComponent, StepperLayoutComponent } from "@ComraxLTD/kakal-ui";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'navbar-bottom', component: NavbarBottomComponent },
  { path: 'stepper-layout', component: StepperLayoutComponent },
  {
    // path: 'layout', component: LayoutRootComponent, children: [
    //   { path: '', component: LayoutDashboardComponent },
    //   {path:'stepper-layout',component:StepperLayoutComponent}
    // ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
