import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { QuestionGroupModel } from '../../form/models/question-group.model';
import { QuestionBase } from '../../form/services/form.service';
import { RowModel } from '../../table/models/row.model';
import { ColumnModel } from '../column.model';

@Component({
  selector: 'kkl-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent<T> implements OnInit {
  @Input() public row: RowModel<T>;
  @Input() public form: QuestionGroupModel;
  @Input() public column: ColumnModel<T>;
  @Input() public slot: ElementRef;

  public question: QuestionBase;

  constructor() {}

  ngOnInit(): void {
    this.question = this.form.group[this.column.getKey()];
  }
}
