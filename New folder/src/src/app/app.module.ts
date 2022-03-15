import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import {DilolYarotComponent} from './screens/dilol-yarot/dilol-yarot.component'
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ResultsComponent } from './screens/results/results.component';
import { LoginBackdropComponent } from './screens/login-backdrop/login-backdrop.component';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { LinksComponent } from './components/links/links.component';
import { SelectComponent } from './components/select/select.component';
import { TableComponent } from './screens/results/table/table.component';
import { MainComponent } from './components/main/main.component';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeforestationComponent } from './screens/deforestation/deforestation.component';
import { NecessaryActionComponent } from './screens/working-unit/necessary-action/necessary-action.component';
import { AreaPurposeComponent } from './components/area-purpose/area-purpose.component';
import { ForestDescriptionComponent } from './components/forest-description/forest-description.component';
import { WorkingContentComponent } from './screens/working-unit/working-content/working-content.component';
import { WorkingStepsComponent } from './screens/working-unit/working-steps/working-steps.component';
import { WorkingHeaderComponent } from './screens/working-unit/working-header/working-header.component';
import { WorkingUnitComponent } from './screens/working-unit/working-unit.component';
import { OldSpinnerComponent } from './components/spinner/spinner.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductionProcessComponent } from './screens/production-process/production-process.component';
import { ProcessTableComponent } from './screens/production-process/process-table/process-table.component';
import { AddProductionProgramComponent } from './screens/add-production-program/add-production-program.component';
import { ProcessFormComponent } from './screens/production-process/process-form/process-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { SearchComponent } from './screens/search/search.component';
import { ForestyComponent } from './screens/search/foresty/foresty.component';
import { LoginComponent } from './screens/login-backdrop/login/login.component';
import { LoginFormComponent } from './screens/login-backdrop/login-form/login-form.component';
import { OtpFormComponent } from './screens/login-backdrop/otp-form/otp-form.component';
import { LoginProcessComponent } from './screens/login-backdrop/login-process/login-process.component';
import { FormComponent } from './screens/search/foresty/form/form.component';
import { AddProductionProcessComponent } from './screens/add-production-process/add-production-process.component';
import { SpatialDialogComponent } from './screens/spatial-production-program/spatial-dialog/spatial-dialog.component';
import { SpatialFormComponent } from './screens/spatial-production-program/spatial-form/spatial-form.component';
import { SpatialHeaderComponent } from './screens/spatial-production-program/spatial-header/spatial-header.component';
import { SpatialTableComponent } from './screens/spatial-production-program/spatial-table/spatial-table.component';
import { SpatialTooltipComponent } from './screens/spatial-production-program/spatial-tooltip/spatial-tooltip.component';
import { SpatialProductionProgramComponent } from './screens/spatial-production-program/spatial-production-program.component';
import { FilterCardsComponent } from './components/filter-cards/filter-cards.component';
import { AddBeePlanComponent } from './screens/add-bee-plan/add-bee-plan.component';
import { AddBeePlanHeaderComponent } from './screens/add-bee-plan/add-bee-plan-header/add-bee-plan-header.component';
import { AddBeePlanTableComponent } from './screens/add-bee-plan/add-bee-plan-table/add-bee-plan-table.component';
import { AddBeeCompleteComponent } from './screens/add-bee-complete/add-bee-complete.component';
import { AddBeeCompleteHeaderComponent } from './screens/add-bee-complete/add-bee-complete-header/add-bee-complete-header.component';
import { AddBeeCompleteFormComponent } from './screens/add-bee-complete/add-bee-complete-form/add-bee-complete-form.component';
import { AddBeeCompleteTableComponent } from './screens/add-bee-complete/add-bee-complete-table/add-bee-complete-table.component';
import { FiltersComponent } from './components/filters/filters.component';
import { OrderPlantsCompleteComponent } from './screens/order-plants-complete/order-plants-complete.component';
import { OrderPlantsCompleteHeaderComponent } from './screens/order-plants-complete/order-plants-complete-header/order-plants-complete-header.component';
import { OrderPlantsCompleteFormComponent } from './screens/order-plants-complete/order-plants-complete-form/order-plants-complete-form.component';
import { OrderPlantsCompleteTableComponent } from './screens/order-plants-complete/order-plants-complete-table/order-plants-complete-table.component';
import { OrderPlantsComponent } from './screens/order-plants/order-plants.component';
import { OrderPlantsTableComponent } from './screens/order-plants/order-plants-table/order-plants-table.component';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationNewComponent } from './components/pagination-new/pagination-new.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExpandingTableComponent } from './screens/order-plants-complete/expanding-table/expanding-table.component';
import { YaaranutService,WorkUnitModule } from 'yaaranut-gis';
import {NgxGalleryModule} from '@kolkov/ngx-gallery'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormatPipe } from './shared/pipes/format.pipe';
import { CommonModule, DatePipe } from '@angular/common';
// import { FilterModelComponent } from './components/filter-Model/filter-model.component';
import { NewSpatialTableComponent } from './screens/spatial-production-program/new-spatial-table/new-spatial-table.component';
import { SharedModule } from './shared/shared.module';
import { NewOrderPlantesCompleteTableComponent } from './screens/order-plants-complete/new-order-plantes-complete-table/new-order-plantes-complete-table.component';
import { NewOrderPlantesCompleteExpandingTableComponent } from './screens/order-plants-complete/new-order-plantes-complete-expanding-table/new-order-plantes-complete-expanding-table.component';
import { NewOrderPlantsCompleteInnerTableComponent } from './screens/order-plants-complete/new-order-plantes-complete-expanding-table/components/new-order-plants-complete-inner-table/new-order-plants-complete-inner-table.component';
import { NewBeeCompleteTableComponent } from './screens/add-bee-complete/new-bee-complete-table/new-bee-complete-table.component';
import { NewOrderPlantsTableComponent } from './screens/order-plants/new-order-plants-table/new-order-plants-table.component';
import { NewAddBeePlanTableComponent } from './screens/add-bee-plan/new-add-bee-plan-table/new-add-bee-plan-table.component';
import { SpatialTableFiltersComponent } from './screens/spatial-production-program/spatial-table-filters/spatial-table-filters.component';
//  import { ForestryTendersModule} from 'yaaranut-gis'
// import { NewBeeCompleteTableService } from './new-bee-complete-table.service';
import { NewProductionProcessComponent } from './screens/production-process/new-production-process/new-production-process.component';

@NgModule({
  declarations: [
    AppComponent,
     NavbarComponent, 
     DilolYarotComponent,
      WizardComponent,
       UserInfoComponent, 
       LinksComponent, 
       FormComponent, 
       SelectComponent, 
       ResultsComponent,
        TableComponent, 
        LoginComponent,
         LoginBackdropComponent, 
         LoginFormComponent, 
         MainComponent, 
         DashboardComponent,
    OtpFormComponent,
    LoginProcessComponent,
    WorkingUnitComponent,
    WorkingHeaderComponent,
    WorkingStepsComponent,
    WorkingContentComponent,
    ForestDescriptionComponent,
    AreaPurposeComponent,
    NecessaryActionComponent,
    DeforestationComponent,
    OldSpinnerComponent,NavigationComponent,
     ProductionProcessComponent,
     ProcessTableComponent,
     ProcessFormComponent,
     AddProductionProgramComponent,
     SearchComponent,
     ForestyComponent,  
     AddProductionProcessComponent,
     SpatialDialogComponent,
     SpatialFormComponent,
     SpatialHeaderComponent,
     SpatialTableComponent,
     SpatialTooltipComponent,
     SpatialProductionProgramComponent,
     FilterCardsComponent,
     AddBeePlanComponent,
     AddBeePlanHeaderComponent,
     AddBeePlanTableComponent,
     AddBeeCompleteComponent,
     AddBeeCompleteHeaderComponent,
     AddBeeCompleteFormComponent,
     AddBeeCompleteTableComponent,
     FiltersComponent,
    OrderPlantsCompleteHeaderComponent,
    OrderPlantsCompleteFormComponent,
    OrderPlantsCompleteComponent,
    // FilterModelComponent,
    OrderPlantsCompleteTableComponent,
    OrderPlantsComponent,
    OrderPlantsTableComponent,
    BottomNavigationComponent,
    PaginationNewComponent,
    ExpandingTableComponent,
    NewSpatialTableComponent,
    NewOrderPlantesCompleteTableComponent,
    NewOrderPlantesCompleteExpandingTableComponent,
    NewOrderPlantsCompleteInnerTableComponent,
    NewBeeCompleteTableComponent,
    NewOrderPlantsTableComponent,
    NewAddBeePlanTableComponent,
    NewProductionProcessComponent,
    SpatialTableFiltersComponent
  ],
  imports: [
    // BrowserModule ,
    BrowserAnimationsModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FontAwesomeModule, 
    AngularSvgIconModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatTableModule,
    WorkUnitModule,
    MatMenuModule,
    MatPaginatorModule,
    NgxGalleryModule, 
    NgxPaginationModule,
    MaterialFileInputModule,
  ],
  providers: [YaaranutService,DatePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
