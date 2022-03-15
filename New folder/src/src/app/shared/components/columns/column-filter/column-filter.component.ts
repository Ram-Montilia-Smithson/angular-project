import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionGroupModel } from '../../form/models/question-group.model';
import { ColumnModel } from '../column.model';
import { SelectOption } from '../../form/models/question-select.model';
import { QuestionTextModel } from '../../form/models/question-text.model';

import { ColumnFilterService } from './column-filter.service';
import { TableFilterService } from '../../table-filters/table-filter.service';

import { RangePipe } from 'src/app/shared/pipes/range.pipe';

import { MatListOption } from '@angular/material/list';
import { ListItem } from '../../list-item/list-item.model';
import { merge, Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  skip,
} from 'rxjs/operators';
import { FormOption } from '../../form/models/form-data-source.model';

export interface Range {
  from: any;
  to: any;
}

export interface FilterOption<T> {
  column?: ColumnModel<T>;
  option?: SelectOption;
  label?: string;
  value$?: Observable<string>;
  value?: any;
  type?: 'amount' | 'date' | 'text';
  multi?: boolean;
}

export interface SortOption<T> {
  column?: ColumnModel<T>;
  dir: string;
}

@Component({
  selector: 'kkl-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss'],
  providers: [{ provide: ColumnFilterService, useClass: ColumnFilterService }],
})
export class ColumnFilterComponent<T> implements OnInit {
  @Input() public column: ColumnModel<T>;
  @Input() public filters$: Observable<ListItem<T>[]>;
  @Input() public filterSlots: {};

  public showSearch: boolean;
  public sortActive: boolean;

  public searchQuestion: QuestionTextModel;
  public amountFilter: QuestionGroupModel;

  private range: Range;

  public filterSubject: Subject<FilterOption<T>>;
  public filter$: Observable<FilterOption<T>>;

  public active$: Observable<boolean>;

  @Output() optionSelect: EventEmitter<Observable<FilterOption<T>>> =
    new EventEmitter();

  @Output() sortChange: EventEmitter<SortOption<T>> = new EventEmitter();
  @Output() dateSelect: EventEmitter<FilterOption<T>> = new EventEmitter();
  @Output() filterAutocomplete: EventEmitter<FilterOption<T>> =
    new EventEmitter();

  constructor(
    private columnFilterService: ColumnFilterService<T>,
    private tableFilterService: TableFilterService<T>,
    private rangePipe: RangePipe
  ) {}

  ngOnInit(): void {
    // TODO - ADD FILTER SUBJECT INSTEAD OF SKIP
    this.filterSubject = new Subject();

    this.searchQuestion = this.columnFilterService.getSearchFilter();
    this.amountFilter = this.columnFilterService.getAmountGroup();

    // handle for active filter style

    this.active$ = this.setActiveColumn();

    this.filter$ = this.setFilter$();

    this.showSearch = this.setShowSearch();
    this.onCurrencyFilter();
  }

  private onFilterSubjectAmount() {}

  private setShowSearch(): boolean {
    const question = this.column.filterQuestion;
    return question ? question['options'].length > 6 : true;
  }

  // set active column style method
  private setActiveColumn(): Observable<boolean> {
    return this.tableFilterService
      .getFiltersByKey(this.column.columnDef.toString(), [
        'push',
        'pushMany',
        'remove',
        'clear',
      ])
      .pipe(map((filters) => filters.length > 0));
  }

  // main method to emit filter option
  private filterEvent(option: FilterOption<T>) {
    console.log("filterEvent", option)
    const filterOption: FilterOption<T> = { ...option, column: this.column };

    // push to table-filter array

    this.tableFilterService.push(filterOption);

    // emit data outside
    this.optionSelect.emit(of(filterOption));
  }

  private emitFilter(filterOption: FilterOption<T>): FilterOption<T> {
    const { value, label } = filterOption;

    const filter: FilterOption<T> = {
      column: this.column,
      label,
      value$: of(value),
      value,
    };
    

    if (!this.column.filterQuestion) {
      this.filterEvent(filter);
    }

    this.filterAutocomplete.emit(filter);

    return filter;
  }

  // method which fire currency filter value
  private onCurrencyFilter() {
    return this.filterSubject.asObservable().pipe(
      skip(2),
      filter((filter: FilterOption<T>) => filter.type === 'amount'),
      map((filterOption) => filterOption.value),
      map((value: Range) => {
        const range: Range = Object.entries(value).reduce(
          (acc, [key, value]) => {
            const amount = value.toString().split(',').join('');

            return {
              ...acc,
              [key]: +amount,
            };
          },
          { from: 0, to: 0 }
        );

        return range;
      }),
      debounceTime(400),
      map((range: Range) => {
        const label = this.rangePipe.transform(range, 'currency');
        return { label, value: range };
      }),
      map((formOption: FormOption) => {
        return this.emitFilter(formOption);
      })
    );
  }

  // method which fire filterAutocomplete  search value
  public onAutocomplete(): Observable<FilterOption<T>> {
    return this.searchQuestion.control.valueChanges.pipe(
      skip(1),
      debounceTime(400),
      distinctUntilChanged(),
      map((value: string) => {
        return this.emitFilter({ value, label: value });
      })
    );
  }
  // method which combine the stream of autocomplete and currency
  private setFilter$(): Observable<FilterOption<T>> {
    const currencyFilter$ = this.onCurrencyFilter();
    const autocompleteFilter$ = this.onAutocomplete();
    return merge(autocompleteFilter$, currencyFilter$);
  }

  // EVENTS SECTION

  public onRangeDateEvent(name: string, date: string) {
    const range = { ...this.range };
    name === 'from' ? (range.from = date) : (range.to = date);
    this.range = { ...range };
    const label = this.rangePipe.transform(this.range, 'date');
    this.filterEvent({ label, value: this.range });
  }

  public onSelectionChange(list: MatListOption[]): void {
    console.log("selectionChanged", list);
    
    const filterOptions: SelectOption[] = this.column.filterQuestion['options'];
    // get selected options from mat-list
    const selected: number[] = list.map(
      (listOption: MatListOption) => listOption.value
    );
      // console.log(filterOptions);
      // console.log(selected);
      
      // get selected options label
      const labels: string[] = filterOptions
      .filter((option: SelectOption) => selected.indexOf(option.value) !== -1)
      .map((option) => option.label);
      // console.log(labels);
      
      const selectedOptions: SelectOption[] = filterOptions
      .filter((option: SelectOption) => selected.indexOf(option.value) !== -1)
      .map((option) => option);
      
      // console.log(selectedOptions);

    if (this.column?.filterQuestion['multi']) { 
      // console.log('filter multi');
      
      this.onMultiSelectChange(selectedOptions, selected);
    } else {
      this.filterEvent({
        label: labels[0],
        value: selected[0],
        option: selectedOptions[0],
      });
    }
  }

  private onMultiSelectChange(
    selectedOptions: SelectOption[],
    selected: number[]
  ) {
    this.tableFilterService.pushMany({
      selectedOptions,
      selected,
      item: { key: this.column.columnDef },
    });
  }

  public onSortClick() {
    const sortOption: SortOption<T> = {
      column: this.column,
      dir: this.column.sortDir,
    };
    console.log(sortOption);
    
    this.sortChange.emit(sortOption);
  }

  public onCurrencyAutocomplete(formOption: FormOption) {
    const { control } = formOption;

    const value = this.amountFilter.getValue();
    this.filterSubject.next({
      value,
      type: 'amount',
    });
  }
}
