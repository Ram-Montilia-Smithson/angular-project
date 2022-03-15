import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
registerLocaleData(localePt, 'he-HE');

const exportable = [
  FlexLayoutModule,
  NgxPaginationModule,
  CommonModule,
  RouterModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  NgxGalleryModule,
];
@NgModule({
  declarations: [],
  imports: exportable,
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'he-HE',
    },
  ],
  exports: exportable,
})
export class CoreModule {}
