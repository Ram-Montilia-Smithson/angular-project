import { CardStepModel } from './../cards/card-step/card-step.model';
import { ListItemKeys } from '../list-item/list-item.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperService {

  constructor() {}

  private activeStep(items: CardStepModel[], key: ListItemKeys, value: any) {
    items.find((item) => {
      if (item[key] === value) {
        item.active();
      }
    });
  }

  private unactiveStep(items: CardStepModel[]) {
    items.find((item) => {
      if (item.isActive) {
        item.unactive();
      }
    });
  }

  public setStepsStatus(
    items: CardStepModel[],
    key: ListItemKeys,
    value: string
  ): CardStepModel[] {
    this.unactiveStep(items);
    this.activeStep(items, key, value);
    return [...items];
  }

  public setSteps(
    steps: CardStepModel[],
    key: ListItemKeys,
    path: string
  ): CardStepModel[] {
    return this.setStepsStatus(steps, key, path);
  }
}
