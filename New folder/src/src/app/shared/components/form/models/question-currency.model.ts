import { FormGroup } from '@angular/forms';
import { Question } from '../services/form.service';
import { GroupType, QuestionGroupModel } from './question-group.model';
import { GridProps } from './question.model';

export class QuestionCurrencyModel extends QuestionGroupModel {


  constructor(options: {
    key?: string;
    label?: string;
    type?: GroupType;
    gridProps?: GridProps;
    questions?: Question[];
    formGroup?: FormGroup;
    group?: Object;
  }) {
    super(options);
    this.key = options.key;
    this.label = options.label;
    this.type = options.type || 'currency';
    this.gridProps = options.gridProps;
    this.questions = [
      {
        key: 'currency',
        label: '',
        controlType: 'select',
        appearance: 'none',
      },
      {
        key: 'sum',
        controlType: 'sum',
      },
    ];
  }
}
