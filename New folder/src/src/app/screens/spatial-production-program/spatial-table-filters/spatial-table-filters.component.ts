import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import {
  combineLatest,
  forkJoin,
  map,
  merge,
  Observable,
  of,
  skipWhile,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  FilterOption,
  SortOption,
} from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { ListItem } from 'src/app/shared/components/list-item/list-item.model';
import {
  FilterMap,
  TableFilterService,
} from 'src/app/shared/components/table-filters/table-filter.service';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  ColumnState,
  RowsState,
  Table,
  TableEvent,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { NewSpatialTableDataService } from '../new-spatial-table/new-spatial-table-data.service';
import { NewSpatialTableModel } from '../new-spatial-table/new-spatial-table.model';
import { NewSpatialTableDataFiltersService } from './spatial-table-filters.service';

@Component({
  selector: 'app-spatial-table-filters',
  templateUrl: './spatial-table-filters.component.html',
  styleUrls: ['./spatial-table-filters.component.scss'],
  providers: [{ provide: TableFilterService, useClass: TableFilterService }],
})
export class SpatialTableFiltersComponent
  implements OnInit, Table<NewSpatialTableModel>
{
  private formDataSource: FormDataSource;
  private sortObj: SortOption<NewSpatialTableModel>;
  public autocompleteEvent$: Observable<boolean>;
  public getAllFlag: boolean = false;

  public dataSource: TableDataSource<NewSpatialTableModel>;
  //table data
  public data$: Observable<NewSpatialTableModel[]>;
  public columns$: Observable<ColumnModel<NewSpatialTableModel>[]>;
  public rowsState$: Observable<RowsState<NewSpatialTableModel>>;

  public columnsState$: Observable<ColumnState<NewSpatialTableModel>>;

  public model: NewSpatialTableModel = new NewSpatialTableModel();

  private pagination: PaginationInstance = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 10,
  };

  public events$: Observable<TableEvent>;

  constructor(
    private tableFilterService: TableFilterService<NewSpatialTableModel>,
    private newSpatialTableDataFiltersService: NewSpatialTableDataFiltersService
  ) {}

  public columns: ColumnModel<NewSpatialTableModel>[] = [
    new ColumnModel({
      label: 'מין הצמח',
      question: {
        key: 'minHatzemach',
      },
      filterQuestion: {
        key: 'minHatzemach',
        multi: false,
        options: [],
      },
    }),

    new ColumnModel({
      label: 'כמות ',
      question: {
        key: 'kamut',
      },
      filterQuestion: {
        key: 'kamut',
        multi: false,
        options: [],
      },
    }),
    new ColumnModel({
      label: 'אזור',
      question: {
        key: 'ezor',
      },
      filterQuestion: {
        key: 'ezor',
        multi: false,
        options: [],
      },
    }),
    new ColumnModel({
      label: 'כלי קיבול',
      question: {
        key: 'kibul',
      },
      filterQuestion: {
        key: 'kibul',
        multi: false,
        options: [],
      },
    }),
    new ColumnModel({
      label: 'ריבוי',
      question: {
        key: 'ribuy',
      },
      filterQuestion: {
        key: 'ribuy',
        multi: false,
        options: [],
      },
    }),
    new ColumnModel({
      label: 'מקור הזרע',
      question: {
        key: 'makor',
      },
      filterQuestion: {
        key: 'makor',
        multi: false,
        options: [],
      },
    }),
    new ColumnModel({
      label: 'הערות',
      question: {
        key: 'hearot',
      },
      filterQuestion: {
        key: 'hearot',
        multi: false,
        options: [],
      },
    }),
  ];

  public options: TableOptions<NewSpatialTableModel> = {
    pagination: this.pagination,
    filters: ['id', 'teurMishpacha', 'kodMinHatzemach'],
  };

  ngOnInit(): void {
    this.formDataSource = new FormDataSource();
    this.dataSource = new TableDataSource<NewSpatialTableModel>();
    this.data$ = this.setDataWithFilters();
    this.columns$ = this.setColumns$();
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.events$ = this.dataSource.getEvents$();
  }

  // main method to set columns$
  private setColumns$() {
    return combineLatest([
      this.dataSource.connectColumns(this.columns),
      this.setColumnsFiltersOptions(),
      this.tableFilterService.filtersStateSubject
    ]).pipe(
      map(([columns, tableFilters, filtersState]) => {
        if (tableFilters) {
          const { event, multiOptions$, selectMap$ } = tableFilters;

          const selectedValues = filtersState ? filtersState.map((item) => `${item.key}-${item.value}`) : []

          switch (event) {
            case 'updateMulti':
              this.dataSource.updateOptions({
                type: 'filter',
                multiOptions$: multiOptions$.pipe(map(
                  (allFilters) => {
                    return Object.keys(allFilters)
                      .reduce((acc, key) => {
                        acc[key] = allFilters[key]
                          .map((option) => {
                            return {
                              ...option,
                              selected: selectedValues.includes(`${key}-${option.value}`)
                            }
                          })

                        return acc;
                      }, allFilters);
                  }
                )),
              });
              break;
            case 'updateOptionsSelected':
              this.dataSource.updateOptions({
                type: 'filter',
                selectMap$,
              });
              break;
          }
        }

        return columns;
      })
    );
  }

  // main method to handle columns filters options
  private setColumnsFiltersOptions(): Observable<
    ColumnState<NewSpatialTableModel>
  > {
    return this.getFilterOptions().pipe(tap((filters) => {}));
  }

  // method to get all filters options from server
  private getFilterOptions(): Observable<ColumnState<NewSpatialTableModel>> {
    return this.newSpatialTableDataFiltersService.getFilterOptions().pipe(
      map((filters) => {
        const minHatzemach = filters[0];
        const kamut = filters[1];
        const ezor = filters[2];
        const kibul = filters[3];
        const ribuy = filters[4];
        const makor = filters[5];
        const hearot = filters[6];
        return {
          event: 'updateMulti',
          multiOptions$: of({
            minHatzemach,
            kamut,
            ezor,
            kibul,
            ribuy,
            makor,
            hearot,
          }),
        };
      })
    );
  }

  public onSortChange(sortOption: SortOption<NewSpatialTableModel>) {
    const { dir, column } = sortOption;
    const newDir = dir === '' ? 'asc' : dir === 'asc' ? 'desc' : 'asc';
    sortOption.dir = newDir;
    this.dataSource.updateSortDir({ key: column.columnDef, dir: newDir });
    this.sortObj = sortOption;
    this.filterData();
  }

  private filterData() {
    this.tableFilterService.filtersStateSubject
      .asObservable()
      .pipe(
        switchMap((filters) => {
          return this.newSpatialTableDataFiltersService.searchSCData(
            filters,
            this.sortObj,
            this.getAllFlag
          );
        })
      )
      .subscribe((data) => this.dataSource.load(data));
  }

  private setDataWithFilters(): Observable<NewSpatialTableModel[]> {
    const data$ = this.newSpatialTableDataFiltersService.searchSCData([]).pipe(
      switchMap((data) => {
        this.dataSource.load(data);
        return this.dataSource.connect();
      })
    );

    const filterCallback = (filters: ListItem<NewSpatialTableModel>[]) =>
      this.newSpatialTableDataFiltersService
        .searchSCData(filters, this.sortObj, this.getAllFlag)
        .pipe(map((results: NewSpatialTableModel[]) => results));

    return this.tableFilterService.filterFormServer(data$, filterCallback);
  }

  public onSaveEvent(row: RowModel<NewSpatialTableModel>) {
    console.log('save');
  }

  public onCancelEvent(row: RowModel<NewSpatialTableModel>) {
    console.log('cancel');
  }
  public getFiltersOfTable(filter: FilterOption<NewSpatialTableModel>) {}
}
