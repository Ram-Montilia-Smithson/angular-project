import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ThemePalette } from '@angular/material/core';
import { PaginationInstance } from 'ngx-pagination';

import { RowModel } from './models/row.model';

import { SortDirection } from '@angular/material/sort';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';

import { ColumnDef, ColumnModel } from '../columns/column.model';
import {
  FilterOption,
  SortOption,
} from '../columns/column-filter/column-filter.component';
import { SelectOption } from '../form/models/question-select.model';
import { TableService } from './services/table.service';

import { v4 as uuid4 } from 'uuid';

import { ListItem } from '../list-item/list-item.model';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { ColumnsService } from '../columns/columns.service';
import {
  FilterMap,
  TableFilterService,
} from '../table-filters/table-filter.service';
import { TableDataSource } from './models/table-datasource';

declare type id = string | number;

// interface for table options : {
// filters - keys to remove unwanted fields form object (ex - id)
// pagination - a PaginationInstance
// editable - tag rows to start in edit mode
// pending - tag rows for specific start style
// }
export interface TableOptions<T> {
  key?: string;
  filters?: ColumnDef<T>[];
  pagination?: PaginationInstance;
  editable?: id[];
  selected?: id[];
}

// interface for every comp which handle kkl-table states :
// mode : edit/add/form/expand/close/remove/delete
// options : additional data

export declare type TableEvent =
  | 'edit'
  | 'add'
  | 'expand'
  | 'close'
  | 'cancel'
  | 'remove'
  | 'create'
  | 'delete'
  | 'save'
  | 'form'
  | 'update'
  | 'default'
  | 'selected'
  | 'updateOptions'
  | 'updateSelected'
  | 'updateOptionsSelected'
  | 'updateMulti';

export interface RowsState<T> {
  event?: TableEvent;
  row?: RowModel<T>;
  column?: ColumnModel<T>;
  options?: any;
}

// interface for update select and filter options

export type ColumnState<T> = {
  event?: TableEvent;
  key?: ColumnDef<T>;
  options$?: Observable<SelectOption[]>;
  multiOptions$?: Observable<FilterMap>;
  selectMap$?: Observable<FilterMap>;
  type?: 'filter' | 'select';
  dir?: SortDirection;
};

// interface for every comp which want to use kkl-table = {
// data : array of objects to render in table
//  columns : array of ColumnsModel
// options : see TableOptions interface
// model : new instance of the data object
// }
export interface Table<T> {
  dataSource: TableDataSource<T>;
  data$: Observable<T[]>;
  columns: ColumnModel<T>[];
  options: TableOptions<T>;
  model: T;
}

@Component({
  selector: 'kkl-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{ provide: TableService, useClass: TableService }],
})
export class TableComponent<T> implements OnInit {
  // color for header : primary or accent
  @Input() public theme: ThemePalette;

  // data[]
  @Input() public data$: Observable<T[]>;
  @Input() public columns$: Observable<ColumnModel<T>[]>;

  // array of columns model
  @Input() public columns: ColumnModel<T>[];

  // table data instance for column keys
  @Input() public model: T;

  @Input() public options: TableOptions<T>;

  @Input() public options$: Observable<TableOptions<T>>;

  // Subject which control table events handlers : edit/expand/save
  @Input() public rowsState$: Observable<RowsState<T>>;
  @Input() public columnsState$: Observable<ColumnState<T>>;

  // if table have events modes
  @Input() public paginator: boolean;
  @Input() public clickable: boolean;
  @Input() public selectable: boolean;
  @Input() public filterable: boolean;
  @Input() public hasState: boolean;
  @Input() public hasFooter: boolean;
  @Input() public hasActions: boolean;
  @Input() public hasStatus: boolean;

  //ng template for custom form inputs
  @Input() public formSlots: {};

  // ng template for column header
  @Input() public headerSlots: {};

  // ng template for cell
  @Input() public rowSlots: {};

  // ng template for filter
  @Input() public filterSlots: {};

  // ng template for footer cell
  @Input() public footerSlots: {};

  // ng template for select cell
  @Input() public selectSlot: {};

  public rows$: Observable<RowModel<T>[]>;
  public filters$: Observable<ListItem<T>[]>;
  public tableColumns$: Observable<ColumnModel<T>[]>;
  public rowsWithState$: Observable<RowModel<T>[]>;
  public pagination$: Observable<PaginationInstance>;
  public columnDefs: ColumnDef<T>[];

  // emit sort event : Sort
  @Output() sortChange: EventEmitter<SortOption<T>> = new EventEmitter();

  // emit pagination event : {next : number, prev : number}
  @Output() pageChange: EventEmitter<{
    next: number;
    prev: number;
  }> = new EventEmitter();

  // emit filter event : ColumnModel<T>
  @Output() filter: EventEmitter<FilterOption<T>> = new EventEmitter();

  @Output() filterAutocomplete: EventEmitter<FilterOption<T>> =
    new EventEmitter();

  // emit select event : Observable<T[]>
  @Output() selected: EventEmitter<Observable<T[]>> = new EventEmitter();

  // emit row event expand : Observable<RowModel<T>
  @Output() expand: EventEmitter<RowModel<T>> = new EventEmitter();

  // emit row : Observable<RowModel<T>
  @Output() clicked: EventEmitter<RowModel<T>> = new EventEmitter();

  //output range
  @Output() date: EventEmitter<{ type: string; date: string; column: string }> =
    new EventEmitter();

  //output checkbox
  @Output() checkboxFilterEvent: EventEmitter<{
    column: string;
    labels: string[];
  }> = new EventEmitter();

  //output input filetr
  @Output() inputChanged: EventEmitter<{ column: string; value: string }> =
    new EventEmitter();

  // prop to hold rows current data
  private rows: RowModel<T>[];

  // cdk object that handle selection
  public selection: SelectionModel<RowModel<T>> = new SelectionModel<
    RowModel<T>
  >(true, [], true);

  constructor(
    private tableService: TableService<T>,
    private columnsService: ColumnsService<T>,
    private tableFilterService: TableFilterService<T>
  ) {}

  private setPagination$(pagination: PaginationInstance) {
    return this.data$.pipe(
      map((data) => {
        return { ...pagination, id: uuid4(), totalItems: data.length };
      })
    );
  }

  private setRows$(): Observable<RowModel<T>[]> {
    return this.rowsState$ ? this.setRowWithState$() : this.setDataRows$();
  }

  private setColumns$(): Observable<ColumnModel<T>[]> {
    return this.columnsState$ ? this.setColumnsWithState$() : this.setColumns();
  }

  ngOnInit() {
    this.theme = this.theme || 'accent';
    const { pagination } = this.options;
    // set columns$ obs with and without state
    this.tableColumns$ = this.setColumns$();

    // set rows$ obs with and without state
    this.rows$ = this.setRows$();
    this.pagination$ = this.setPagination$(pagination);

    this.filters$ = this.tableFilterService.getFilters$(this.hasStatus);

    this.formSlots = this.formSlots || {};
  }

  // set row$ with data$ form parent
  private setDataRows$(): Observable<RowModel<T>[]> {
    return this.data$.pipe(
      map((data) => {
        this.rows = this.tableService.setRows(data, this.options).map((row) => {
          if (row.selectable) {
            this.selection.select(row);
          }

          return row;
        });

        return this.rows;
      })
    );
  }
  // method which handle row state events
  private setRowState(
    rows: RowModel<T>[],
    state: RowsState<T>,
    columns?: ColumnModel<T>[]
  ): RowModel<T>[] {
    const { event, row, column, options } = state;

    switch (event) {
      case 'form':
        rows = this.tableService.onFormMode(rows, columns, this.options);
        console.log(rows);
        
        break;
      case 'add':
        rows = this.tableService.onAddFormRow(rows, columns, options.item);
        break;
      case 'edit':
        rows = this.tableService.onEditMode(rows, row, columns, options);
        console.log(rows);
        break;
      case 'create':
        rows = this.tableService.onCreateEvent(rows, columns, options.item);
        break;
      case 'save':
        rows = this.tableService.onSaveEvent(rows, row.item, options.key);
        break;
      case 'close':
        rows = this.tableService.onCloseEvent(rows, row.item, options.key);
        break;
      case 'cancel':
        rows.shift();
        break;
      default:
        break;
    }
    this.rows = rows;

    return rows;
  }

  private setRowWithState$(): Observable<RowModel<T>[]> {
    return this.tableColumns$.pipe(
      switchMap((columns) => {
        return combineLatest([this.setDataRows$(), this.rowsState$]).pipe(
          map((pair) => {
            this.rows = this.setRowState(pair[0], pair[1], columns);
            return this.rows;
          })
        );
      })
    );
  }

  // method which handle columns state : select and filter options
  private setColumnsState$(
    columns: ColumnModel<T>[]
  ): Observable<ColumnModel<T>[]> {
    return this.columnsState$.pipe(
      switchMap((state: ColumnState<T>) => {
        if (state) {
          const { key, type, options$, selectMap$, multiOptions$, dir } = state;
          
          if (multiOptions$) {
            return multiOptions$.pipe(
              map((multiOptions) => {
                console.log({ multiOptions })

                Object.entries(multiOptions).map(([key, options]) => {
                  columns = this.columnsService.updateColumnsOptions(
                    columns,
                    key,
                    type,
                    options
                  );
                });
                this.columns = columns;
                return columns;
              })
            );
          } else if (selectMap$) {
            return selectMap$.pipe(
              map((selectMap) => {
                console.log({ selectMap })
                Object.entries(selectMap).map(([key, options]) => {
                  const selected: string[] = options.map(
                    (option) => option.value
                  );

                  columns = this.columnsService.updateColumnsOptionsSelect(
                    columns,
                    key,
                    selected
                  );
                });
                this.columns = columns;
                return columns;
              })
            );
          } else if (options$) {
            return options$.pipe(
              map((options) => {
                columns = this.columnsService.updateColumnsOptions(
                  columns,
                  key,
                  type,
                  options
                );
                this.columns = columns;

                return columns;
              })
            );
          }

          if (dir) {
            const index = columns.findIndex(
              (column: ColumnModel<T>) => column.columnDef === key
            );
            // update sort direction
            const columns$ = of(dir).pipe(
              map((dir: SortDirection) => {
                columns[index].sortDir = dir;
                this.columns = columns;
                return columns;
              })
            );
            return columns$;
          }
        }
        this.columns = columns;
        return of(columns);
      })
    );
  }
  // method which combine columns$ obs  columnsState$ obs
  private setColumnsWithState$(): Observable<ColumnModel<T>[]> {
    return this.setColumns().pipe(
      switchMap((columns) => this.setColumnsState$(columns))
    );
  }

  // method which convert columns to columns$ with additional logic
  private setColumns(): Observable<ColumnModel<T>[]> {
    return this.columns$.pipe(
      map((tableColumns: ColumnModel<T>[]) => {
        const { columns, columnsDefs } = this.tableService.setColumns({
          tableColumns: tableColumns,
          model: this.model,
          filters: this.options.filters,
          selectable: this.selectable,
          filterable: this.filterable,
          hasActions: this.hasActions,
        });

        this.columns = columns;
        this.columnDefs = columnsDefs;

        return columns;
      })
    );
  }

  // method which fire when row is clicked
  public onRowClick(row: RowModel<T>) {
    if (this.clickable) {
      this.clicked.emit(row);
    }
  }

  // EMIT EVENTS

  // method which emit page data
  public onPageChange(event: { next: number; prev: number }) {
    this.pageChange.emit(event);
  }

  // method which sort data
  public onSort(sort: SortOption<T>): void {
    this.sortChange.emit(sort);
  }

  //method to emit range
  emitRange($event) {
    this.date.emit($event);
  }

  // ------------------------------------------------------------------------------------

  // method which emit filter data
  public onFilter(filterOption: FilterOption<T>): void {
    this.filter.emit(filterOption);
  }

  // method which emit autocomplete filter data
  public onFilterAutocomplete(filterOption: FilterOption<T>): void {
    this.filterAutocomplete.emit(filterOption);
  }

  // ------------------------------------------------------------------------------------

  // method which emit selected items : []T
  public onSelect(): void {
    const select$ = this.selection.changed.pipe(
      map((selection: SelectionChange<RowModel<T>>) => {
        const { source } = selection;
        const selected: T[] = source.selected.map((row) => row.item);
        return selected;
      })
    );

    this.selected.emit(select$);
  }

  // SELECT LOGIC SECTION

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected?.length;
    const numRows = this.rows.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.rows.map((row) => this.selection.select(row));
  }

  //output checkbox
  checkboxFilterEventEmit($event) {
    this.checkboxFilterEvent.emit($event);
  }

  //output autocomplete
  inputChangedFunc($event) {
    this.inputChanged.emit($event);
  }
}
