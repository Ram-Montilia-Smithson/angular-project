import { AbstractControl, FormGroup } from '@angular/forms';
import { Question } from '../services/form.service';
import { FormOption } from './form-data-source.model';
import { ControlType, GridProps } from './question.model';
import { BehaviorSubject, Observable } from 'rxjs';

export type GroupType = 'default' | 'group' | 'custom' | 'date' | 'currency';

export interface GroupOptions {
  label?: string;
  type?: GroupType;
  controlType?: ControlType;
  formGroup?: FormGroup;
  gridProps?: GridProps;
  hasButton?: boolean;
}

export class QuestionGroupModel {
  public key?: string;
  public model?: Object;
  public questions?: Question[];
  public label?: string;
  public icon?: string;
  public type?: GroupType;
  public controlType?: ControlType;
  public formGroup?: FormGroup;
  public gridProps?: GridProps;
  public hasButton?: boolean;
  public group: Object;

  private questionState: BehaviorSubject<Question[]>;
  public questions$?: Observable<Question[]>;

  constructor(options?: {
    key?: string;
    questions?: Question[];
    label?: string;
    icon?: string;
    type?: GroupType;
    formGroup?: FormGroup;
    gridProps?: GridProps;
    hasButton?: boolean;
    group?: Object;
    questions$?: Observable<Question[]>;
  }) {
    this.key = options.key || '';
    this.label = options.label || '';
    this.type = options.type || 'default';
    this.controlType = 'group';
    this.icon = '';
    this.questions = options.questions || [];
    this.formGroup = options.formGroup;
    this.gridProps = options.gridProps || { cols: 1 };
    this.hasButton = options.hasButton || false;
    this.group = options.group || null;
    this.questionState = new BehaviorSubject<Question[]>(options.questions);
    this.questions$ = this.questionState.asObservable();
  }

  // method which set question state
  public setQuestionState(questions: Question[]) {
    this.questionState.next(questions);
  }

  // method to get question control
  public getControl(key: string): AbstractControl {
    const control: AbstractControl = this.formGroup.controls[key];
    if (control) {
      return control;
    }
    return undefined;
  }

  public findQuestion(key: string): Question {
    return this.questions.find((question) => question.key === key);
  }

  public findQuestions(key: keyof Question, value: any): Question[] {
    return this.questions.filter((question) => question[key] === value);
  }

  // return groupModel value
  public getControlValueChange(key): Observable<any> {
    const control: AbstractControl = this.formGroup.controls[key];
    if (control) {
      return control.valueChanges;
    }
    return undefined;
  }

  // return groupModel value
  public getValue(): Object {
    return this.formGroup.value;
  }

  // return groupModel controls
  public getControls(): {
    [key: string]: AbstractControl;
  } {
    return this.formGroup.controls;
  }

  public updateQuestions(formOption: FormOption): Question[] {
    const { key, options } = formOption;
    const indexToUpdate = this.questions.findIndex(
      (question) => question.key === key
    );
    if (indexToUpdate !== -1 && options.length > 0) {
      this.questions[indexToUpdate]['options'] = options;
    }
    this.questionState.next(this.questions);
    return this.questions;
  }

  public patchValue(item): void {
    this.formGroup.patchValue(item);
  }

  public clear(key?: string): void {
    if (key) {
      this.formGroup.controls[key].reset();
    } else {
      this.formGroup.reset();
    }
  }

  public emitQuestions$(questions: Question[]) {
    this.questionState.next(questions);
  }
}
