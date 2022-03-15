import { QuestionSelectModel } from 'src/app/shared/components/form/models/question-select.model';
import { Injectable } from '@angular/core';
import { QuestionTextareaModel } from '../models/question-textarea.model';
import { QuestionTextModel } from '../models/question-text.model';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { QuestionBaseModel } from '../models/question.model';
import {
  GroupOptions,
  QuestionGroupModel,
} from '../models/question-group.model';
import { QuestionNumberModel } from '../models/question-number.model';
import { QuestionAutocompleteModel } from '../models/question-autocomplete';
import { QuestionRadioModel } from '../models/question-radio.model';
import { QuestionSumModel } from '../models/question-sum.model';
import { QuestionCurrencyModel } from '../models/question-currency.model';
import { QuestionDateModel } from '../models/question-date.model';

export type ControlTemplate = [
  state: any,
  validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
];

export type QuestionBase = QuestionBaseModel<string | number | Date>;

export type Question =
  | QuestionBase
  | QuestionSelectModel
  | QuestionTextModel
  | QuestionRadioModel
  | QuestionDateModel
  | QuestionCurrencyModel
  | QuestionSumModel
  | QuestionTextareaModel
  | QuestionNumberModel
  | QuestionAutocompleteModel
  | QuestionGroupModel;

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  // method which create a control template for FormBuilder
  private setFieldControl(question: Question): ControlTemplate {
    return [
      { value: question['value'] || '', disabled: question['disabled'] },
      question['validations'],
    ];
  }
  // method which create inner FormGroup instance
  private setGroupControl(control: QuestionGroupModel): FormGroup {
    const { questions } = control;
    return this.fb.group(this.setGroup(questions));
  }

  // method which create a template of to create a FormGroup instance with FormBuilder
  private setGroup(questions: Question[]): Object {
    return questions
      .map((question: Question) => question)
      .reduce((acc, control: Question) => {
        let template;
        const { key } = control;

        if (control instanceof QuestionBaseModel) {
          template = this.setFieldControl(control);
        }

        if (control instanceof QuestionGroupModel) {
          template = this.setGroupControl(control);
        }
        return {
          ...acc,
          [key]: template,
        };
      }, {});
  }

  // method which create a questions array
  public setQuestionList(questions: Question[]): Question[] {
    return questions.map((question: Question) => {
      return this.setQuestion(question);
    });
  }

  // method which return single FormControl instance
  public getFieldControl(question: Question): FormControl {
    const template = this.setFieldControl(question);
    return this.fb.control(template[0], template[1]);
  }

  private setQuestionKeyFromModel(model: Object, questions: Question[]) {
    const keys = Object.keys(model);
    return questions.map((question: Question, i) => {
      return {
        ...question,
        key: keys[i],
      };
    });
  }

  // method which return QuestionGroupModel instance
  public createQuestionGroup(config: {
    key?: string;
    questions: Question[];
    model?: Object;
    options?: GroupOptions;
  }): QuestionGroupModel {
    let { key, questions, options, model } = config;

    if (model) {
      questions = this.setQuestionKeyFromModel(model, questions);
    }
    questions = this.setQuestionList(questions);


    // if (options?.type === 'currency') {
    //   return new QuestionCurrencyModel({
    //     ...options,
    //     key,
    //     label: '' || options?.label,
    //     questions,
    //     formGroup: this.setFormGroup(questions),
    //     group: this.setQuestionsAsGroup(questions),
    //   });
    // }

    return new QuestionGroupModel({
      ...options,
      key,
      label: '' || options?.label,
      questions,
      formGroup: this.setFormGroup(questions),
      group: this.setQuestionsAsGroup(questions),
    });
  }

  public createFormArray(arr) {
    return this.fb.array(arr);
  }

  public setQuestionGroup(group: QuestionGroupModel): QuestionGroupModel {
    return this.createQuestionGroup({
      key: group.key,
      questions: group.questions,
      options: { ...group },
    });
  }

  // method which create a FormGroup angular instance
  public setFormGroup(questions: Question[]): FormGroup {
    const template = this.setGroup(this.setQuestionList(questions));
    return this.fb.group(template);
  }

  // method which create a question instance
  public setQuestion(question: Question): Question {
    switch (question.controlType) {
      case 'group':
        const { key, type, gridProps, label } = question;
        return this.createQuestionGroup({
          key,
          questions: question['questions'],
          model: question['model'],
          options: {
            label,
            type,
            gridProps,
          },
        });

      case 'number':
        return new QuestionNumberModel(question);

      case 'sum':
        return new QuestionSumModel(question);

      case 'select':
        return new QuestionSelectModel(question);
      case 'radio':
        return new QuestionRadioModel(question);

      case 'textarea':
        return new QuestionTextareaModel(question);

      case 'date':
        return new QuestionDateModel(question);

      case 'autocomplete':
        return new QuestionAutocompleteModel(question);
      default:
        return new QuestionTextModel(question);
    }
  }

  // create questions object for row instance to render to kkl-form {}
  public setQuestionsAsGroup(questions: Question[]): Object {
    return questions
      .map((question: Question) => question)
      .reduce((acc, control: Question) => {
        const { key } = control;
        return {
          ...acc,
          [key]: control,
        };
      }, {});
  }
}
