import { ValidatorFn } from '@angular/forms';
import { QuestionBaseModel, GridProps } from './question.model';

export class QuestionCalendar extends QuestionBaseModel<Date> {
  public options?: any[];
  constructor(options: {
    key?: string;
    label?: string;
    gridProps?: GridProps;
    icon?: string;
    validations?: ValidatorFn[];
    options?: any[];
  }) {
    super(options);
    this.key = options.key;
    this.label = options.label;
    this.controlType = 'calendar';
    this.gridProps = options.gridProps;
    this.icon = 'calendar';
    this.validations = options.validations;
    this.options = options.options;
  }
}
