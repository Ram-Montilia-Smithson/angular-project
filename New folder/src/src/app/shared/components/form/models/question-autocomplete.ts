import { ValidatorFn } from '@angular/forms';
import { ControlType, GridProps } from './question.model';
import { QuestionSelectModel, SelectOption } from './question-select.model';

export class QuestionAutocompleteModel extends QuestionSelectModel {
  public onOptionSelect?: Function;

  constructor(options?: {
    
    key?: string;
    label?: string;
    controlType?: ControlType;
    validations?: ValidatorFn[];
    gridProps?: GridProps;
    icon?: string;
    options?: SelectOption[];
    onOptionSelect?: Function;
    multi?: boolean;
    format? : string
    cleave?: {};
  }) {
    super(options);
    this.icon=options.icon || ''
    this.controlType = options.controlType || 'autocomplete';
    this.options = options.options || []; 
    this.multi = options.multi || false;
    this.onOptionSelect =
      options.onOptionSelect || (() => console.log('select'));
  }
}
