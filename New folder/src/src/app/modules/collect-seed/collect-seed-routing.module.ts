import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from 'src/app/shared/components/outlet/outlet.component';
import { CollectSeedOrderDetailsComponent } from './components/collect-seed-order-details/collect-seed-order-details.component';
import { CollectSeedOrderComponent } from './components/collect-seed-order/collect-seed-order.component';
import { CollectSeedsIframeComponent } from './components/collect-seeds-table/collect-seeds-iframe/collect-seeds-iframe.component';
import { CollectSeedsTableComponent } from './components/collect-seeds-table/collect-seeds-table.component';

const routes: Routes = [
  { path: 'collect-seeds-table', component: CollectSeedsTableComponent },
  { path: 'iframe', component: CollectSeedsIframeComponent  },
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: 'order',
        component: CollectSeedOrderComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import(
                './components/collect-seeds-order-details-module/collect-seeds-order-details-module.module'
              ).then((m) => m.CollectSeedsOrderDetailsModuleModule),
          },
          // {
          //   path: 'amount',
          //   loadChildren: () =>
          //     import(
          //       './components/collect-seeds-order-amount-module/collect-seeds-order-amount-module.module'
          //     ).then((m) => m.CollectSeedsOrderAmountModuleModule),
          // },

          {
            path: 'location',
            loadChildren: () =>
              import(
                './components/collect-seeds-order-location--module/collect-seeds-order-location--module-routing.module'
              ).then((m) => m.CollectSeedsOrderLocationModuleRoutingModule),
          },
          {
            path: 'inventory',
            loadChildren: () =>
              import(
                './components/collect-seeds-order-inventory-module/collect-seeds-order-inventory-module.module'
              ).then((m) => m.CollectSeedsOrderInventoryModuleModule),
          },
        ],
      },

    ],
    // ]}
    // {
    //   path: 'squad',
    //   loadChildren: () =>
    //     import('./tour-squad/tour-squad.module').then(
    //       (m) => m.TourSquadModule
    //     ),
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectSeedRoutingModule {}
