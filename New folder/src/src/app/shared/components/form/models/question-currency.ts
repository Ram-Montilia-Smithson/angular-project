import { ValidatorFn } from '@angular/forms';
import { QuestionSelectModel } from './question-select.model';
import { QuestionBaseModel, GridProps } from './question.model';

export class QuestionCurrency extends QuestionBaseModel<string> {
  public currency?: QuestionSelectModel;
  constructor(options: {
    key?: string;
    label: string;
    gridProps?: GridProps;
    icon?: string;
    validations?: ValidatorFn[];
    currency?: QuestionSelectModel;
  }) {
    super(options);
    this.key = options.key;
    this.label = options.label;
    this.controlType = 'cleave';
    this.cleave = { numeric: true };
    this.gridProps = options.gridProps;
    this.icon = this.icon;
    this.validations = options.validations;
    this.currency =
      options.currency ||
      new QuestionSelectModel({
        key: 'currency',
        label: 'מטבע',
        appearance: 'none',
        options: [
          { label: '€', value: 'euro' },
          { label: '$', value: 'dollar' },
          { label: '₪', value: 'shekel' },
        ],
      });
  }
}
