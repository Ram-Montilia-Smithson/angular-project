import { NgModule } from '@angular/core';
import { CoreModule } from './../core/core.module';

import { IconComponent } from './components/icon/icon.component';
import { TypographyComponent } from './components/typography/typography.component';

import { FormComponent } from './components/form/form/form.component';
import { FormInputComponent } from './components/form/form-input/form-input.component';
import { FormGroupComponent } from './components/form/form-group/form-group.component';
import { FormRadioComponent } from './components/form/form-radio/form-radio.component';
import { FormAutocompleteComponent } from './components/form/form-autocomplete/form-autocomplete.component';

import { StepperComponent } from './components/stepper/stepper.component';

import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarBottomComponent } from './components/navbar-bottom/navbar-bottom.component';

import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { ListComponent } from './components/list/list.component';

import { TitleComponent } from './components/title/title.component';
import { StatusComponent } from './components/status/status.component';

import { DataTableComponent } from './components/data-grid/data-table/data-table.component';
import { DataCellComponent } from './components/data-grid/data-cell/data-cell.component';
import { DataRowComponent } from './components/data-grid/data-row/data-row.component';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { VariantDirective } from './directives/variant.directive';
import { SizeDirective } from './directives/size.directive';
import { ButtonDirective } from './directives/button.directive';
import { UnderlineDirective } from './directives/underline.directive';

import { KKLDashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './screens/layout/layout.component';

import { ExpandPanelComponent } from './components/expand-panel/expand-panel.component';

import { ColumnFilterComponent } from './components/columns/column-filter/column-filter.component';
import { ColumnFormComponent } from './components/columns/column-form/column-form.component';

import { CardStatusComponent } from './components/cards/card-status/card-status.component';
import { CardWizardComponent } from './components/cards/card-wizard/card-wizard.component';
import { CardStepComponent } from './components/cards/card-step/card-step.component';
import { CardDashboardComponent } from './components/cards/card-dashboard/card-dashboard.component';

import { CardUserComponent } from './components/cards/card-user/card-user.component';
import { ColorDirective } from './directives/color.directive';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

import { FormDateComponent } from './components/form/form-date/form-date.component';
import { SearchLayoutComponent } from './screens/search-layout/search-layout.component';
import { ExpandTableComponent } from './components/expand-table/expand-table.component';

import { FormatPipe } from './pipes/format.pipe';
import { AreaPipe } from './pipes/area.pipe';
import { PrefixPipe } from './pipes/prefix.pipe';
import { RangePipe } from './pipes/range.pipe';
import { LocationPipe } from './pipes/location.pipe';

import { TableFiltersComponent } from './components/table-filters/table-filters.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';

import { FlexStartDirective } from './directives/flexStart';
import { BorderDirective } from './directives/border.directive';
import { StepperLayoutComponent } from './screens/stepper-layout/stepper-layout.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { CellDirective } from './directives/cell.directive';

import { TabButton } from './components/tab-button/tab-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';

import { OutletStepComponent } from './components/outlet-step/outlet-step.component';

import { LastUpdateComponent } from './components/last-update/last-update.component';
import { HeadlineTextComponent } from './components/headline-text/headline-text.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { KklUploadButtonComponent } from './components/kkl-upload-button/kkl-upload-button.component';
import { ListService } from './components/list/list.service';
import { TableFilterService } from '../shared/components/table-filters/table-filter.service';
import { TableCreateButtonComponent } from './components/table-buttons/table-create-button/table-create-button.component';
import { StepperMobileComponent } from './components/stepper-mobile/stepper-mobile.component';
const exportable = [
  LayoutComponent,
  OutletComponent,

  StepperLayoutComponent,
  OutletStepComponent,
  StepperComponent,
  StepperMobileComponent,

  SearchLayoutComponent,

  FormComponent,
  FormGroupComponent,
  FormInputComponent,
  FormRadioComponent,
  FormDateComponent,
  FormAutocompleteComponent,
  KklUploadButtonComponent,

  IconComponent,
  TypographyComponent,

  NavbarComponent,
  NavbarBottomComponent,
  MenuComponent,

  TableComponent,
  ExpandTableComponent,
  TableFiltersComponent,
  TableActionsComponent,
  PaginationComponent,
  TabButton,
  TableCreateButtonComponent,

  ColumnFilterComponent,
  ColumnFormComponent,

  ListComponent,
  ListItemComponent,

  TitleComponent,

  MenuItemComponent,
  KKLDashboardComponent,

  DataTableComponent,
  DataCellComponent,
  DataRowComponent,

  StatusComponent,
  SpinnerComponent,

  ExpandPanelComponent,

  SizeDirective,
  ButtonDirective,
  VariantDirective,
  UnderlineDirective,
  BorderDirective,
  ColorDirective,
  CellDirective,
  FlexStartDirective,

  LastUpdateComponent,

  CardStatusComponent,
  CardWizardComponent,
  CardStepComponent,
  CardDashboardComponent,
  CardUserComponent,

  AreaPipe,
  FormatPipe,
  PrefixPipe,
  RangePipe,
  LocationPipe,

  DialogComponent,
  DialogAlertComponent,

  //mpk
  HeadlineTextComponent,
  PageHeaderComponent,
];

@NgModule({
  declarations: exportable,
  imports: [CoreModule],
  exports: [CoreModule, ...exportable],
  providers: [AreaPipe, FormatPipe, PrefixPipe, RangePipe, LocationPipe],
})
export class SharedModule {}
