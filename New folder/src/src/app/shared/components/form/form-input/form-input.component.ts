import { MessageService } from './../services/message.service';
import { FormControl } from '@angular/forms';
import { QuestionBase } from '../services/form.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  QuestionSelectModel,
  SelectOption,
} from './../models/question-select.model';
import { Appearance, ControlType, GridProps } from '../models/question.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Palette } from 'src/styles/theme';
import { QuestionAutocompleteModel } from '../models/question-autocomplete';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { FormOption } from '../models/form-data-source.model';

@Component({
  selector: 'kkl-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  @Input() public question: QuestionBase;
  @Input() public control: FormControl;
  @Input() public appearance: Appearance;
  @Input() public optionsSlot: ElementRef;

  public controlType: ControlType;
  public label: string;
  public icon: string;
  public options: SelectOption[];
  public error: string = '';

  public error$: BehaviorSubject<string>;
  public color$: BehaviorSubject<Palette>;

  public gridProps: GridProps;
  public color: Palette;
  public iconType: string = 'svg';
  public iconRotate: number = 0;
  public autocompleteValue$: Observable<string>;
  public optionSelected$: Observable<any>;

  public localFilter: boolean;
  public filteredOptions: Observable<any[]>;

  @Output() public selected: EventEmitter<FormOption> = new EventEmitter();
  @Output() public optionSelected: EventEmitter<FormOption> =
    new EventEmitter();
  @Output() autocomplete: EventEmitter<FormOption> = new EventEmitter();
  @Output() focusoutEvent: EventEmitter<string> = new EventEmitter();

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    const color: Palette = this.control?.disabled
      ? 'disable'
      : 'primary' || 'primary';
    this.color$ = new BehaviorSubject<Palette>(color);
    this.error$ = new BehaviorSubject<string>('');

    if (this.question) {
      this.appearance = this.question?.appearance;
      this.controlType = this.question?.controlType;
      this.gridProps = this.question?.gridProps;
      this.label = this.question?.label || '';
      this.icon = this.question?.icon || '';
      this.localFilter = this.question?.localFilter;
    }

    if (this.question instanceof QuestionSelectModel) {
      this.options = this.question.options;
    }

    if (
      this.question instanceof QuestionAutocompleteModel ||
      this.question.autocomplete
    ) {
      this.autocompleteValue$ = this.onAutocomplete();
    }

    if (!this.localFilter) {
      this.localFilter = true;
    }

    if (this.localFilter) {
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value))
      );
    }
  }

  private filter(value: string): SelectOption[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) =>
      option.label.toLowerCase().includes(filterValue)
    );
  }

  // private subscribeToControl() {
  private setIconColor() {
    if (this.control.disabled) {
      this.color = 'disable';
    } else if (this.control.errors) {
      this.color = 'warn';
    } else {
      this.color = 'primary';
    }
  }

  private setErrorMessage() {
    this.error = this.messageService.getErrorMessage(this.control, this.label);
    this.error$.next(this.error);

    if (this.error) {
      this.color$.next('warn');
    } else {
      this.color$.next('primary');
    }
  }

  public validate() {
    this.setErrorMessage();
    this.setIconColor();
  }
  private setFormOption(value: string): FormOption {
    let option = null;

    if (this.question['options']) {
      option = this.question['options'].find(
        (option: SelectOption) => option.value === value
      );
    }

    const formOption: FormOption = {
      key: this.question.key,
      control: this.control,
      option,
      value$: of(value),
    };

    return formOption;
  }

  // EVENTS SECTION

  public onSelectChange() {
    const formOption: FormOption = this.setFormOption(this.control.value);
    if (
      this.question instanceof QuestionSelectModel &&
      this.question.onSelectChange
    ) {
      this.question.onSelectChange(formOption);
    }

    this.selected.emit(formOption);
  }

  public onAutocomplete(): Observable<string> {
    return this.control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map((value: string) => {
        const formOption: FormOption = this.setFormOption(value);
        this.autocomplete.emit(formOption);
        return value;
      })
    );
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;
    const formOption: FormOption = this.setFormOption(value);

    this.optionSelected.emit(formOption);

    if (
      this.question instanceof QuestionAutocompleteModel &&
      this.question.onOptionSelect
    ) {
      this.question.onOptionSelect(formOption);
    }
  }

  public onAutocompleteFocusout() {
    this.focusoutEvent.emit(this.question.key);
  }
}
