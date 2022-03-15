import { Injectable } from '@angular/core';
import { QuestionDateModel } from '../../form/models/question-date.model';
import { QuestionGroupModel } from '../../form/models/question-group.model';
import { QuestionTextModel } from '../../form/models/question-text.model';
import { FormService, Question } from '../../form/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnFilterService<T> {
  private searchQuestion: QuestionTextModel = new QuestionTextModel({
    key: 'search',
    label: '',
    icon: 'search',
  });

  private amountQuestions: Question[] = [
    {
      key: 'from',
      label: 'מסכום',
      controlType: 'cleave',
      cleave: {
        numeral: true,
        numericOnly: true,
      },
      format: 'currency',
      autocomplete: true,
    },
    {
      key: 'to',
      label: 'עד סכום',
      controlType: 'cleave',
      cleave: {
        numeral: true,
        numericOnly: true,
      },
      format: 'currency',
      autocomplete: true,
    },
  ];

  private dateQuestions: QuestionDateModel[] = [
    {
      key: 'from',
      label: 'מתאריך',
      controlType: 'date',
      format: 'date',
    },
    {
      key: 'to',
      label: 'עד תאריך',
      controlType: 'date',
      format: 'date',
    },
  ];

  constructor(private formService: FormService) {}
 
  public getSearchFilter(): QuestionTextModel {
    const control = this.formService.getFieldControl(this.searchQuestion);
    this.searchQuestion.control = control;
    return this.searchQuestion;
  }

  public getAmountGroup(): QuestionGroupModel {
    return this.formService.createQuestionGroup({
      key: 'amount',
      questions: this.amountQuestions,
      options: {
        gridProps: {
          cols: 2,
        },
      },
    });
  }
}
