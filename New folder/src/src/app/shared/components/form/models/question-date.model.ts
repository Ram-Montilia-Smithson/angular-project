import { ValidatorFn } from '@angular/forms';
import { QuestionBaseModel, GridProps } from './question.model';

export class QuestionDateModel extends QuestionBaseModel<Date> {


  constructor(options: {
    key?: string;
    label?: string;
    gridProps?: GridProps
    icon?: string;
    validations?: ValidatorFn[]
  }
  ) {
    super(options)
    this.key = options.key
    this.label = options.label
    this.controlType = 'date';
    this.gridProps = options.gridProps
    this.icon = this.icon
    this.validations = options.validations
  }

}
