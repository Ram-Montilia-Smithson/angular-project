import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { QuestionAutocompleteModel } from '../models/question-autocomplete';
import { SelectOption } from '../models/question-select.model';
import { FormDataSource, FormOption } from '../models/form-data-source.model';
import { MatSelectionList } from '@angular/material/list';
import {
  debounceTime,
  distinctUntilKeyChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import { combineLatest, merge, Observable, of } from 'rxjs';

@Component({
  selector: 'kkl-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.scss'],
})
export class FormAutocompleteComponent implements OnInit {
  private formDataSource: FormDataSource;

  @Input() public question: QuestionAutocompleteModel;
  @Input() public control: FormControl;
  @Input() public options$: Observable<SelectOption[]>;
  @Input() public optionsSlot: {};

  // use when option value is object
  @Input() public selector: string;

  @Input() public multiSelect: boolean = false;
  @Input() public panelWidthAuto: boolean = false;

  public label: string;
  public icon: string;
  public error: string = '';
  public disabled: boolean;

  @Output() autocomplete: EventEmitter<FormOption> = new EventEmitter();
  @Output() optionSelected: EventEmitter<FormOption> = new EventEmitter();
  @Output() multiOptionsSelected: EventEmitter<FormOption> = new EventEmitter();

  public autocomplete$: Observable<string>;

  constructor() {}

  // get displayValue() {
  //   const values = this.control.value;
  //   console.log(values);
  //   if (values) {
  //     return this.question.options
  //       .filter(({ value }) => values.includes(value))
  //       .map(({ label }) => label)
  //       .join(', ');
  //   } else {
  //     return '';
  //   }
  // }

  ngOnInit(): void {
    this.formDataSource = new FormDataSource();

    if (this.options$) {
      this.options$ = this.setOptionsWithState();
    }

    this.multiSelect = this.question.multi;

    this.label = this.question?.label || '';
    this.icon = this.question?.icon || '';
  }

  private mergeFormEvents() {
    return merge(
      this.onAutocompleteEvent(),
      this.formDataSource.getStateOf.optionSelected()
    );
  }

  private setOptionsWithState() {
    return combineLatest([
      this.options$.pipe(startWith([])),
      this.mergeFormEvents(),
    ]).pipe(
      map(([options, formOption]) => {
        if (formOption) {
          const { event, value } = formOption;

          if (event === 'optionSelected') {
            const option = options.find((option) =>
              this.onOptionSelectedEvent(option, value)
            );

            this.optionSelected.emit({
              key: this.question.key,
              control: this.control,
              option,
            });
          }
        }

        return options;
      })
    );
  }

  private onAutocompleteEvent(): Observable<FormOption> {
    return this.formDataSource.getStateOf.autocomplete().pipe(
      debounceTime(500),
      distinctUntilKeyChanged('value'),
      tap((formOption: FormOption) => {
        this.autocomplete.emit({
          key: this.question.key,
          value: formOption.value,
          value$: of(formOption.value),
        });
        return formOption;
      })
    );
  }
  private onOptionSelectedEvent(option: SelectOption, value: any): boolean {
    const isString = typeof value === 'string';
    return isString
      ? option.value === value
      : option.value[this.selector] === value[this.selector];
  }

  public search(value: string): void {
    this.formDataSource
      .getActions()
      .autocomplete({ key: this.question.key, value });
    this.autocomplete.emit({ key: this.question.key, value });
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;

    if (this.options$) {
      this.formDataSource
        .getActions()
        .optionSelected({ key: this.question.key, value });
    } else {
      const [filter] = this.question.options.filter(
        (option) => option.value === value
      );

      this.optionSelected.emit({
        key: this.question.key,
        value: filter.value,
        option: filter,
      });
      
      if (this.control) {
        this.control.setValue(filter.label);
      }
    }
  }

  public onSelectionChange(option: MatSelectionList): void {
    const options = option.selectedOptions.selected;

    const selected: string[] = options.map((option) => {
      return option.value;
    });

    let selectedLabel:any = this.question.options.filter(option => selected.includes(option.value));
    selectedLabel = selectedLabel.map(option => option.label);
    
    if (options.length == 0) {
      this.multiOptionsSelected.emit({ key: this.question.key, value: [] });
      return;
    }
    this.multiOptionsSelected.emit({
      key: this.question.key,
      value: selected,
      options: this.question.options.filter(
        (option: SelectOption) => selected.indexOf(option.value) >= 0
      ),
    });
    if (this.control) {
      this.control.setValue(selectedLabel);
    }
  }
}
