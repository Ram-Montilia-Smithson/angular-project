import { Injectable } from '@angular/core';
import { CardDashboardModel } from '../shared/components/cards/card-dashboard/card-dashboard.model';
import { CardStepModel } from '../shared/components/cards/card-step/card-step.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardLayoutService {

  private steps: CardStepModel[] = [
    new CardStepModel({
      label: 'ניהול יער',
      svgUrl: 'group',
      path: 'create-new-contract',
      size: 2.5,
      variant: 'square',
      type: 'wizard',
    }),
    new CardStepModel({
      label: 'תכנון תוכניות עבודה',
      svgUrl: 'connect',
      path: 'existing-procedures',
      size: 2.5,
      variant: 'square',
      type: 'wizard',
    }),

  ];

  private forestManagementtSteps: CardStepModel[] = [
    new CardStepModel({
      label: 'ניהול יער',
      svgUrl: 'group',
      path: 'create-new-contract',
      size: 2.5,
      variant: 'square',
      type: 'wizard',
    }),
    new CardStepModel({
      label: 'תכנון תוכניות עבודה',
      svgUrl: 'connect',
      path: 'existing-procedures',
      size: 2.5,
      variant: 'square',
      type: 'wizard',
    }),

  ];


  constructor() {}

  public getCards(): CardDashboardModel[] {
    return this.getSteps().map((item: CardStepModel) => {
      return new CardDashboardModel({
        ...item,
      });
    });
  }

  public getSteps(): CardStepModel[] {
    return [...this.steps];
  }


}
