import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { map, Observable, of, switchMap } from 'rxjs';
import { COLLECT_CONTAST_INSTRUCTIONS_TABLE } from 'src/app/mock_data/collect-contest-data';
import { SortOption } from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
// import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { ListService } from 'src/app/shared/components/list/list.service';
import { TableFilterService } from 'src/app/shared/components/table-filters/table-filter.service';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  ColumnState,
  Table,
  RowsState,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { StepperLayoutService } from 'src/app/shared/screens/stepper-layout/stepper-layout.service';
import { RouterService } from 'src/app/shared/services/route.service';
import { CollectContestWorkInstructionsStandModel } from './collect-contest-work-instructions-stand.model';
import { CollectContestWorkInstructionsStandService } from './collect-contest-work-instructions-stand.service';

@Component({
  selector: 'app-collect-contest-work-instructions-stand',
  templateUrl: './collect-contest-work-instructions-stand.component.html',
  styleUrls: ['./collect-contest-work-instructions-stand.component.scss'],
  providers: [
    { provide: TableFilterService, useClass: TableFilterService },
    ListService,
    TableFilterService,
  ],
})
export class CollectContestWorkInstructionsStandComponent
  implements OnInit, OnDestroy, Table<CollectContestWorkInstructionsStandModel>
{
  @Input() action: string;
  @Input() hasActions: boolean;
  @Input() selectable: boolean;
  // @Input() contactTable: ElementRef;
  // @Input() evaluationTable: ElementRef;

  public dataSource: TableDataSource<CollectContestWorkInstructionsStandModel> =
    new TableDataSource();

  public model: CollectContestWorkInstructionsStandModel =
    new CollectContestWorkInstructionsStandModel({});

  private formDataSource: FormDataSource;

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<
    RowsState<CollectContestWorkInstructionsStandModel>
  >;
  public columnsState$: Observable<
    ColumnState<CollectContestWorkInstructionsStandModel>
  >;
  public event$: Observable<string>;

  //table data
  public columns: ColumnModel<CollectContestWorkInstructionsStandModel>[] = [
    new ColumnModel({ label: 'מנה' ,columnFilterWidth:'min-content' }),
    new ColumnModel({ label: 'יער' ,columnFilterWidth:'min-content' }), 
    new ColumnModel({ label: 'עומד'  ,columnFilterWidth:'min-content'}),
    new ColumnModel({ label: 'שטח העומד (דונם)' ,columnFilterWidth:'min-content'}),
    new ColumnModel({ label: 'שטח לעבודה'  ,columnFilterWidth:'min-content'}),
    new ColumnModel({ label: 'הרכב מינים' ,columnFilterWidth:'min-content'}),
    new ColumnModel({ label: 'שנת נטיעה',columnFilterWidth:'min-content' }),
    new ColumnModel({ label: 'פעולות לעומד', type: 'custom', colspan: 1.5 }),
    new ColumnModel({ label: 'צפיפות ממוצעת'  ,columnFilterWidth:'min-content'}),
    new ColumnModel({ label: 'הערכת כמות לעץ'  ,columnFilterWidth:'min-content'}),
    new ColumnModel({ label: 'הנחיות מיוחדת לעומד', colspan: 2 ,columnFilterWidth:'min-content' }),
  ];

  public data$: Observable<CollectContestWorkInstructionsStandModel[]>;
  public columns$: Observable<
    ColumnModel<CollectContestWorkInstructionsStandModel>[]
  >;
  public showEndDrawer$: Observable<boolean>;
  private pagination: PaginationInstance = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 16,
  };

  // public plantingYear?: string;
  // public density?: string;
  // public treeEstimation?: string;
  // public speacialAreaComments?:
  public options: TableOptions<CollectContestWorkInstructionsStandModel> = {
    pagination: this.pagination,
    filters: [
      'id',
      'speacialAreaComments',
      'plantingYear',
      'density',
      'treeEstimation',
    ],
    selected: [],
    key: 'id',
  };

  public supplierLength$: Observable<boolean>;

  constructor(
    private stepperLayoutService: StepperLayoutService,
    // private CollectContestWorkInstructionsStandService: CollectContestWorkInstructionsStandService,
    private CollectContestWorkInstructionsStandService: CollectContestWorkInstructionsStandService,
    // private dialogService: DialogService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    // TODO - init supplier selected from server
    this.showEndDrawer$ = this.stepperLayoutService.getDisplayEndDrawerObs();

    this.CollectContestWorkInstructionsStandService.setDataSource(
      this.dataSource
    );
    this.data$ = this.setData();

    this.formDataSource = new FormDataSource();

    this.columns$ = this.toggleForm();

    this.rowsState$ = this.dataSource.getRowsState();
    // this.event$ = this.dataSource.getEvent$();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.activeColumnDef$ = this.setActiveColumnDef$();
    // this.supplierLength$ = this.setSupplierLength$();
  }

  ngOnDestroy(): void {
    // this.CollectContestWorkInstructionsStandService.emitSelectedSuppliers([]);
  }
  private toggleForm() {
    return this.showEndDrawer$.pipe(
      switchMap((res: boolean) => {
        if (!res) {
          this.options.filters = [
            'id',
            'speacialAreaComments',
            'plantingYear',
            'density',
            'treeEstimation',
          ];
          return this.dataSource.connectColumns([
            new ColumnModel({ label: 'מנה' ,columnFilterWidth:'min-content' }),
            new ColumnModel({ label: 'יער'  ,columnFilterWidth:'min-content'}),
            new ColumnModel({ label: 'עומד' ,columnFilterWidth:'min-content' }),
            new ColumnModel({ label: 'שטח העומד (דונם)'  ,columnFilterWidth:'min-content'}),
            new ColumnModel({ label: 'שטח לעבודה'  ,columnFilterWidth:'min-content'}),
            new ColumnModel({ label: 'הרכב מינים' ,columnFilterWidth:'min-content'}),
            new ColumnModel({
              label: 'פעולות לעומד',
              type: 'custom',
              colspan: 1.5,
            }),
          ]);
        } else {
          this.options.filters = ['id'];
          return this.dataSource.connectColumns(this.columns);
        }
      })
    );
  }
  private setData(): Observable<CollectContestWorkInstructionsStandModel[]> {
    const data$ = of(COLLECT_CONTAST_INSTRUCTIONS_TABLE).pipe(
      switchMap((data) => {
        this.dataSource.load(data);
        return this.dataSource.connect();
      })
    );
    return data$;
  }

  private setActiveColumnDef$(): Observable<string> {
    return this.rowsState$.pipe(
      map((state) => {
        if (state !== null && state.event === 'expand') {
          const { column, row, options } = state;
          const { panel } = options;
          return panel.expand ? column.columnDef : '';
        } else {
          return '';
        }
      })
    );
  }

  // TABLE EVENTS SECTION

  public onExpand(
    options: RowsState<CollectContestWorkInstructionsStandModel>
  ) {
    console.log('asd');

    this.dataSource.expand(options);
  }

  public onSortChange(
    sortOption: SortOption<CollectContestWorkInstructionsStandModel>
  ) {
    const { dir, column } = sortOption;
    const newDir = dir === '' ? 'asc' : dir === 'asc' ? 'desc' : 'asc';
    this.dataSource.updateSortDir({ key: column.columnDef, dir: newDir });
  }
}
