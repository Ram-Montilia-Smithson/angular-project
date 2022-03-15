import { ValidatorFn } from '@angular/forms';
import { GridProps, QuestionBaseModel } from './question.model';

export interface RadioOption {
  label: string;
  value: any;
  checked?: boolean;
}

export class QuestionRadioModel extends QuestionBaseModel<string> {
  public options?: RadioOption[];

  constructor(options?: {
    key?: string;
    label?: string;
    gridProps?: GridProps;
    icon?: string;
    validations?: ValidatorFn[];
    options?: RadioOption[];
  }) {
    super(options);
    this.key = options.key;
    this.label = options.label;
    this.controlType = 'radio';
    this.gridProps = options.gridProps;
    this.validations = options.validations;
    this.options = options.options;
  }
}
