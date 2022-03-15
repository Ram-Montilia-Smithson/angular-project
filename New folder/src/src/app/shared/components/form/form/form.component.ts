import { GridProps } from '../models/question.model';
import { QuestionGroupModel } from './../models/question-group.model';
import { FormGroup } from '@angular/forms';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormDataSource, FormOption } from '../models/form-data-source.model';

@Component({
  selector: 'kkl-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() public group: QuestionGroupModel;
  @Input() public formDataSource: FormDataSource;

  @Input() public rowHeight: number;
  @Input() public gutter: number;

  @Input() public slots: {
    button?: ElementRef;
    group?: ElementRef;
  };

  @Input() optionsSlot: { [key: string]: ElementRef };

  public formGroup: FormGroup;
  public grid: GridProps;
  public hasButton: boolean = false;
  public cols: string | number;

  @Output() public changeSelect: EventEmitter<FormOption> = new EventEmitter();
  @Output() public changeOption: EventEmitter<MatAutocompleteSelectedEvent> =
    new EventEmitter();

  @Output() public submitEvent: EventEmitter<FormGroup> = new EventEmitter();
  @Output() public autocompleteEvent: EventEmitter<FormOption> =
    new EventEmitter();
  @Output() public focusoutEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.formGroup = this.group.formGroup;
    this.grid = this.group.gridProps;
    this.cols = this.group.gridProps?.cols || 1;
    this.hasButton = this.group.hasButton || false;
  }

  public onSubmit() {
    this.submitEvent.emit(this.formGroup);
  }

  public onSelect(option: FormOption) {
    this.changeSelect.emit(option);
  }

  public onAutocomplete(formOption: FormOption): void {
    this.autocompleteEvent.emit(formOption);
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.changeOption.emit(event);
  }

  public onFocusOut(key: string) {
    this.focusoutEvent.emit(key);
  }
}
