import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { ThemePalette } from '@angular/material/core';
import { PaginationInstance } from 'ngx-pagination';

import { SortDirection } from '@angular/material/sort';
import { ColumnDef, ColumnModel } from '../columns/column.model';

import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import {
  FilterOption,
  SortOption,
} from '../columns/column-filter/column-filter.component';
import { MatExpansionPanel } from '@angular/material/expansion';
import { RowModel } from '../table/models/row.model';

import { TableService } from '../table/services/table.service';

import { v4 as uuid4 } from 'uuid';

import { ListItem } from '../list-item/list-item.model';
import { TableFilterService } from '../table-filters/table-filter.service';
import { TableOptions, RowsState, ColumnState } from '../table/table.component';

import { ColumnsService } from '../columns/columns.service';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';

@Component({
  selector: 'kkl-expand-table',
  templateUrl: './expand-table.component.html',
  styleUrls: ['./expand-table.component.scss'],
  providers: [{ provide: TableService, useClass: TableService }],
})
export class ExpandTableComponent<T> implements OnInit {
  @ViewChild('panel', { read: MatExpansionPanel })
  panel: MatExpansionPanel;

  // color for header : primary or accent
  @Input() public theme: ThemePalette;

  // data[]
  @Input() public data$: Observable<T[]>;
  @Input() public columns$: Observable<ColumnModel<T>[]>;

  // table data instance for column keys
  @Input() public model: T;

  @Input() public options: TableOptions<T>;

  // Subject which control table state mode : edit/expand/save
  @Input() public rowsState$: Observable<RowsState<T>>;
  @Input() public columnsState$: Observable<ColumnState<T>>;

  // if table have state modes
  @Input() public paginator: boolean;
  @Input() public expendable: boolean;
  @Input() public clickable: boolean;
  @Input() public accordion: boolean;
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

  // ng template for expand cell
  @Input() public expandSlots: {};

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
  @Output() rowClicked: EventEmitter<RowModel<T>> = new EventEmitter();

  // prop to hold rows current data
  private rows: RowModel<T>[];
  private columns: ColumnModel<T>[];

  // main obj which subscribe to table data - rows & columns & pagination
  public table$: any;
  public filters$: Observable<ListItem<T>[]>;
  public pagination: PaginationInstance;
  public options$: Observable<TableOptions<T>>;
  // cdk object that handle selection
  public selection: SelectionModel<RowModel<T>> = new SelectionModel<
    RowModel<T>
  >(true, [], true);

  constructor(
    private tableService: TableService<T>,
    private columnsService: ColumnsService<T>,
    private tableFilterService: TableFilterService<T>
  ) {}

  private setRows$(): Observable<RowModel<T>[]> {
    return this.rowsState$ ? this.setRowWithState$() : this.setDataRows$();
  }

  private setColumns$(): Observable<ColumnModel<T>[]> {
    return this.columnsState$ ? this.setColumnsWithState$() : this.setColumns();
  }

  private setPagination$(pagination: PaginationInstance) {
    return this.data$.pipe(
      map((data) => {
        return { ...pagination, id: uuid4(), totalItems: data.length };
      })
    );
  }

  private setTable$(pagination) {
    return combineLatest([
      this.setColumns$(),
      this.setRows$(),
      this.setPagination$(pagination),
    ]).pipe(
      map(([columns, rows, paginate]) => {
        return { columns, rows, paginate };
      })
    );
  }
  ngOnInit() {
    this.options$ = of(this.options);
    this.theme = this.theme || 'accent';
    const { pagination } = this.options;

    this.pagination = { ...pagination, id: uuid4() };

    this.table$ = this.setTable$(pagination);

    this.filters$ = this.tableFilterService.getFilters$(this.hasStatus);

    this.expendable = this.expendable || this.accordion;

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

        this.pagination = { ...this.pagination, totalItems: data.length };

        return this.rows;
      })
    );
  }

  // method which handle row state events
  private setRowState(
    rows: RowModel<T>[],
    events: RowsState<T>,
    columns?: ColumnModel<T>[]
  ): RowModel<T>[] {
    const { event, row, options } = events;

    switch (event) {
      case 'expand':
        rows = this.tableService.onExpendMode(rows, events);
        break;
      case 'form':
        rows = this.tableService.onFormEvent(rows, columns, this.options);
        break;
      case 'create':
        rows = this.tableService.onCreateEvent(rows, columns, options.item);
        break;

      case 'edit':
        rows = this.tableService.onEditEvent(rows, row, columns);
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

  public close(panel: MatExpansionPanel): void {
    panel.close();
  }

  // TODO - separate columns logic from rows
  private setRowWithState$(): Observable<RowModel<T>[]> {
    // return this.columns$.pipe(
    //   switchMap((columns) => {
    return combineLatest([this.setDataRows$(), this.rowsState$]).pipe(
      map((pair) => {
        this.rows = this.setRowState(pair[0], pair[1], this.columns);
        return this.rows;
      })
      //   );
      // })
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
          accordion: this.accordion,
          hasActions: this.hasActions,
        });

        // this.columns = columns;
        this.columnDefs = columnsDefs;
        this.columns = columns;
        
        return columns;
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

  // method which fire when row is rowClicked
  public onRowClick(row: RowModel<T>) {
    if (this.clickable) {
      this.rowClicked.emit(row);
    }
    if (this.accordion) {
      this.expand.emit(row);
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
        return source.selected.map((row) => row.item);
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
}
