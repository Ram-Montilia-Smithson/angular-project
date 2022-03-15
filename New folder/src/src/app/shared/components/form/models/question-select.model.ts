import { ValidatorFn } from '@angular/forms';
import { Appearance, GridProps, QuestionBaseModel } from "./question.model";

export interface SelectOption {
  label: string;
  value: any;
  selected? : boolean
  disabled? : boolean
}

export class QuestionSelectModel extends QuestionBaseModel<string>{

  public options?: SelectOption[];
  public onSelectChange?: Function;
  public multi?: boolean;

  constructor(options?: {
    key?: string,
    label?: string,
    appearance? : Appearance,
    validations?: ValidatorFn[],
    gridProps?: GridProps
    options?: SelectOption[];
    icon?: string;
    multi?: boolean;
    onSelectChange?: Function;
  }) {
    super(options)
    this.controlType = 'select'
    this.options = options.options || []
    this.icon = options.icon || 'keyboard_arrow_down'
    this.multi = options.multi || false
    this.onSelectChange = options.onSelectChange || (() => console.log('select'))
  }
}
