import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Palette } from 'src/styles/theme';

export interface GridProps {
  cols?: number;
  rows?: number;
  offset?: number;
  gutter?: number;
  buttonCols?: number;
  fullWidth?: boolean;
  flex?: {
    width?: number;
    align?: string;
  };
}

export interface Clave {
  numeral: boolean;
  creditCard: boolean;
  phone: boolean;
  prefix: boolean;
  time: boolean;
}

export type ControlType =
  | 'text'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'calendar'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'group'
  | 'custom'
  | 'sum'
  | 'autocomplete'
  | 'toggle'
  | 'cleave';

export type QuestionType = 'default' | 'group' | 'custom' | 'date' | 'currency';

export type Appearance = 'none' | MatFormFieldAppearance;

export abstract class QuestionBaseModel<T> {
  public key?: any;
  public theme?: Palette;
  public label?: string;
  public value?: T | undefined;
  public appearance?: Appearance;
  public type?: QuestionType;
  public format?: string;
  public controlType?: ControlType;
  public gridProps?: GridProps;
  public icon?: string;
  public customRef?: string;
  public validations?: ValidatorFn[];
  public disabled?: boolean;
  public control?: AbstractControl | FormControl;
  public cleave?: {};
  public localFilter?: boolean;
  public autocomplete?: boolean;

  constructor(options: {
    key?: string;
    value?: T;
    label?: string;
    appearance?: Appearance;
    type?: QuestionType;
    format?: string;
    controlType?: ControlType;
    disabled?: boolean;
    gridProps?: GridProps;
    icon?: string;
    customRef?: string;
    validations?: ValidatorFn[];
    control?: AbstractControl | FormControl;
    cleave?: {};
    localFilter?: boolean;
  }) {
    this.key = options.key || '';
    this.value = options.value;
    this.label = options.label || '';
    this.appearance = options.appearance || 'outline';
    this.type = options.type || 'default';
    this.format = options.format;
    this.controlType = options.controlType || 'text';
    this.disabled = this.disabled || false;
    this.validations = options.validations || [];
    this.gridProps = options.gridProps || {
      cols: 1,
      rows: 1,
      gutter: 0,
      offset: 0,
      fullWidth: false,
    };
    this.icon = options.icon || '';
    this.customRef = options.customRef || '';
    this.control = options.control || null;
    this.cleave = options.cleave || {};
    this.localFilter = options.localFilter;
  }
}
