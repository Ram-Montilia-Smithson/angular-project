import { ValidatorFn } from '@angular/forms';
import {
  ControlType,
  GridProps,
  QuestionBaseModel,
  QuestionType,
} from './question.model';

export class QuestionTextModel extends QuestionBaseModel<string> {
  public autocomplete?: boolean;

  constructor(options?: {
    key?: string;
    label?: string;
    type?: QuestionType;
    controlType?: ControlType;
    gridProps?: GridProps;
    icon?: string;
    validations?: ValidatorFn[];
    disabled?: boolean;
    autocomplete?: boolean;
    cleave?: {};
  }) {
    super(options);
    this.key = options.key;
    this.label = options.label;
    this.controlType = options.controlType;
    this.gridProps = options.gridProps || super.gridProps;
    this.icon = options.icon;
    this.validations = options.validations;
    this.disabled = options.disabled;
    this.autocomplete = options.autocomplete || false;
    this.cleave = options.cleave || {};
  }
}
