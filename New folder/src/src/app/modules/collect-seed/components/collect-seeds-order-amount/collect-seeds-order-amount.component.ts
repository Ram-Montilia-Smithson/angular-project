import { Component, OnInit } from '@angular/core';
import {
  AMOUNT_CALC_MOCK,
  AMOUNT_SEEDS_MOCK,
} from 'src/app/mock_data/collect-seeds-data';
import { CollectSeedsOrderAmountCalcModel } from './collect-seeds-order-amount-calc';
import { CollectSeedsOrderAmountSeedsModel } from './collect-seeds-order-amount-seeds';

@Component({
  selector: 'app-collect-seeds-order-amount',
  templateUrl: './collect-seeds-order-amount.component.html',
  styleUrls: ['./collect-seeds-order-amount.component.scss'],
})
export class CollectSeedsOrderAmountComponent implements OnInit {
  public calcDetails: CollectSeedsOrderAmountCalcModel;
  public seedsDetails: CollectSeedsOrderAmountSeedsModel;
  public seedsHeadlines: { key: string; value: string }[] = [];
  public calcHeadlines: { key: string; value: string }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.seedsHeadlines = [
      { key: 'fruitWeigh', value: 'משקל פירות (ק"ג)' },
      { key: 'seedWeigh', value: 'משקל זרעים נטו (ק"ג)' },
      { key: 'bagNumber', value: 'מספר שקים' },
    ];

    this.calcHeadlines = [
      { key: 'collectionDate', value: 'משקל זרעים מדגמי (גרם)' },
      { key: 'seedCount', value: 'מספר זרעים במשקל מדגמי' },
      { key: 'seedsCountInPortion', value: 'מספר זרעים ב- 100 גרם' },
    ];
    this.seedsDetails = AMOUNT_SEEDS_MOCK;
    this.calcDetails = AMOUNT_CALC_MOCK;
  }
}
