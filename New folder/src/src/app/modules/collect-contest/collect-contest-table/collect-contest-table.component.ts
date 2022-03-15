import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, map, merge, Observable, of, skipWhile, startWith, switchMap } from 'rxjs';
import { FilterOption, SortOption } from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { SelectOption } from 'src/app/shared/components/form/models/question-select.model';
import { Question } from 'src/app/shared/components/form/services/form.service';
import { ListService } from 'src/app/shared/components/list/list.service';
import { FilterMap, TableFilterService } from 'src/app/shared/components/table-filters/table-filter.service';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { ColumnState, RowsState, TableOptions } from 'src/app/shared/components/table/table.component';
import { CollectContestModule } from '../collect-contest.module';
import { ContestTableModel } from './collect-contest.model';
import { ContestService } from './contest.service';

@Component({
  selector: 'app-collect-contest-table',
  templateUrl: './collect-contest-table.component.html',
  styleUrls: ['./collect-contest-table.component.scss'],
  providers: [ListService, TableFilterService],
})
export class CollectContestTableComponent implements OnInit {

  index: number | string;
  toggle: boolean = false;

  public question: Question;
  public options$: Observable<SelectOption[]>;
  public control: FormControl;

  public edit$: Observable<boolean>;
  public data$: Observable<ContestTableModel[]>
  public rowsState$: BehaviorSubject<RowsState<ContestTableModel>>;
  public model: ContestTableModel = new ContestTableModel();
  public columns$: Observable<ColumnModel<ContestTableModel>[]>;
  public columnsState$: Observable<ColumnState<ContestTableModel>>;

  public dataSource: TableDataSource<ContestTableModel>;
  sortObj: any;

  constructor(private contestService: ContestService,
     public collectContestTable: ContestService, 
     private route: Router,
     private tableFilterService:TableFilterService<ContestTableModel>) { }

  public columns: ColumnModel<ContestTableModel>[] = [

    new ColumnModel({ label: 'מספר מרכז', question: { key: '', controlType: 'number' } }),
    new ColumnModel({ label: 'שנת תיחור', question: { key: '', controlType: 'date' }, format: 'date', }),
    new ColumnModel({ label: 'מספר תיחור', question: { key: '', controlType: 'number' } }),
    new ColumnModel({ label: 'שם התיחור', question: { key: '', controlType: 'number' }, type: 'custom' }),
    new ColumnModel({ label: 'מרחב', question: { key: '', controlType: 'number' } }),
    new ColumnModel({ label: 'אזור', question: { key: '', controlType: 'number' } }),
    new ColumnModel({ label: 'סטטוס', question: { key: '', controlType: 'number' } }),
  ]
  ngOnInit(): void {
    this.data$ = this.contestService.getTabledata();
    this.setRowsState();
    this.columns$ = of(this.columns);
    this.dataSource = new TableDataSource<ContestTableModel>(
      []
    );
    const { control, question } = this.contestService.setSearchControl();
    this.control = control;
    this.question = question;
    this.onAutocomplete()
  }
  // method to handle multi filter options selected state
  private setSelectedFilters(): Observable<ColumnState<ContestTableModel>> {
    return this.mergeSelectedFilters().pipe(
      map((selectMap: FilterMap) => {
        // console.log('handle multi filter');

        const state: ColumnState<ContestTableModel> = {
          event: 'updateOptionsSelected',
          selectMap$: of(selectMap),
        };

        return state;
      }),
      startWith(null),
      skipWhile((selected) => selected === null)
    );
  }

  private mergeSelectedFilters() {
    return merge(
      this.tableFilterService.getFiltersAfterRemove([
        // 'plantSpecies',
        // 'seedSperm',
        // 'collectedBy',
        // 'status',
      ])
    );
  }

  public onAutocomplete() {
    this.control.valueChanges.pipe(map((value) => {
      console.log(value);
      this.collectContestTable.getTableDataFromDB(value);

    })).subscribe()
           this.collectContestTable.getTableDataFromDB(" ");

  }

  private setRowsState() {
    this.rowsState$ = new BehaviorSubject<RowsState<ContestTableModel>>({
      event: 'default',
    });
  }

  private pagination: PaginationInstance = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<ContestTableModel> = {
    pagination: this.pagination,
    filters: ['id', 'globalID'],
  };

  contestNameClicked(column) {
    this.contestService.rowThatChooseInTable = column
    this.route.navigate(['/collect-contest/stepper'])
    console.log(column);

  }
  sort(sortOption: any) {

    const { dir, column } = sortOption;
    const newDir = dir === '' ? 'asc' : dir === 'asc' ? 'desc' : 'asc';
    sortOption.dir = newDir;
    console.log(sortOption);
    console.log(newDir);

    this.dataSource.updateSortDir({ key: column.columnDef, dir: newDir });
    this.sortObj = sortOption;
    let data = []
    if (sortOption.dir == "asc")
      this.contestService.sortByAsc(sortOption);
    else if (sortOption.dir == "desc") {
      this.contestService.sortByDesc(sortOption);
    }

  }
  // private filterData(data) {
  //   this.dataSource.load(data);
  // }

  public getFiltersOfTable(filter: Observable<CollectContestModule>) {


  }
  public onFilterAutocomplete(filterOption: FilterOption<CollectContestModule>) { }





  public onSortChange(sortOption: SortOption<CollectContestModule>) {
    const { dir, column } = sortOption;
    const newDir = dir === '' ? 'asc' : dir === 'asc' ? 'desc' : 'asc';
    sortOption.dir = newDir;

    this.dataSource.updateSortDir({ key: column.columnDef, dir: newDir });
    this.sortObj = sortOption;
    let data = []
    if (sortOption.dir == "asc")
      data = this.contestService.sortByAsc(sortOption);
    else if (sortOption.dir == "desc") {
      data = this.contestService.sortByDesc(sortOption);
    }console.log(data);
    
    this.filterData(data);

  }

  
  private filterData(data) {

    this.dataSource.load(data);
    this.tableFilterService.filtersStateSubject
      .asObservable()
      .pipe(
        switchMap((filters) => {
          console.log(filters);

          return of(data);
        })
      )
      .subscribe((data) => this.dataSource.load(data));
  }
















  private getFilterOptions(): Observable<ColumnState<CollectContestModule>> {
    //
    return of({
    });
    // return forkJoin([
    //   this.dataListService.unitsList(),
    //   this.dataListService.smallContractStatusList().pipe(
    //     map((options) =>
    //       options.map((option) => {
    //         return {
    //           ...option,
    //           selected: false,
    //         };
    //       })
    //     )
    //   ),
    //   this.dataListService.documentCategoriesList(),
    // ]).pipe(
    //   map(([unitName, status, documentNum]) => {
    //     return {
    //       event: 'updateMulti',
    //       multiOptions$: of({ unitName, status, documentNum }),
    //     };
    //   })
    // );
  }

  // main method to handle columns filters options
  private setColumnsFiltersOptions(): Observable<
    ColumnState<CollectContestModule>
  > {
    return merge(this.getFilterOptions(), this.setSelectedFilters());
  }


}
