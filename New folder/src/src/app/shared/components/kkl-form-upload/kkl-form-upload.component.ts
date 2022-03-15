import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColumnModel } from '../columns/column.model';
import { QuestionGroupModel } from '../form/models/question-group.model';
import { QuestionBaseModel } from '../form/models/question.model';
import { Question, QuestionBase } from '../form/services/form.service';
import { RowModel } from '../table/models/row.model';

@Component({
  selector: 'kkl-form-upload',
  templateUrl: './kkl-form-upload.component.html',
  styleUrls: ['./kkl-form-upload.component.scss'],
})
export class KklFormUploadComponent<T> implements OnInit {
  @Input() public question: QuestionBase | QuestionGroupModel;
  @Input() public control: FormControl;
  @Input() public row: RowModel<T>;
  @Input() public questions: Question[];

  public icon: string;
  public label: string;
  public disabled: boolean;
  public color: string;

  public preview: string;
  public file: File | null = null;

  @Input() multi: boolean = true;

  @Output() fileChange = new EventEmitter<File | string>();

  @HostListener('input', ['$event.target.files']) emitFiles(event: FileList) {
    this.file = event && event.item(0);
    this.fileChange.emit(this.file);
  }

  constructor() {}

  ngOnInit(): void {
    this.label = this.question?.label || '';

    if (this.question instanceof QuestionBaseModel) {
      this.icon = this.question?.icon || '';
    }
  }
}
