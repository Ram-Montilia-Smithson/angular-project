import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxGalleryModule} from '@kolkov/ngx-gallery'

import { CollectSeedsOrderLocationModuleRoutingModule } from './collect-seeds-order-location--module-routing.module';
import { CollectSeedsOrderLocationComponent } from '../collect-seeds-order-location/collect-seeds-order-location.component';
import { STEP_PREFIX } from 'src/app/shared/constants/step-prefix';


@NgModule({
  declarations: [CollectSeedsOrderLocationComponent],
  imports: [
    CommonModule,
    CollectSeedsOrderLocationModuleRoutingModule,
    // NgxGalleryModule 
  ],
  providers: [{ provide: STEP_PREFIX, useValue: 'location' }],

})
export class CollectSeedsOrderLocationModuleModule { }
  