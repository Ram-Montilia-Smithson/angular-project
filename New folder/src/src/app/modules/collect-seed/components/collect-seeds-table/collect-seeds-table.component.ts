// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Input, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { CollectSeedsService } from 'src/app/modules/collect-seed/components/collect-seeds-table/collect-seeds.service';
import {
  combineLatest,
  first,
  map,
  
  merge,
  Observable,
  of,
  skipWhile,
  startWith,
  switchMap,

} from 'rxjs';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';

import {
  TableOptions,
  RowsState,
  ColumnState,
} from 'src/app/shared/components/table/table.component';
import {
  FilterOption,
  SortOption,
} from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  FilterMap,
  TableFilterService,
} from 'src/app/shared/components/table-filters/table-filter.service';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { ListItem } from 'src/app/shared/components/list-item/list-item.model';
import { MatDialog } from '@angular/material/dialog';

import { CollectSeedsModel } from './collect-seeds.model';
import { ListService } from 'src/app/shared/components/list/list.service';
import { Question } from 'src/app/shared/components/form/services/form.service';
import { SelectOption } from 'src/app/shared/components/form/models/question-select.model';
import { RouterService } from 'src/app/shared/services/route.service';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { DialogAlertComponent } from 'src/app/shared/components/dialog-alert/dialog-alert.component';
import { HttpService } from 'src/app/services/http.service';
import { FreeText } from 'src/app/Models/FreeText';
import { COLLECT_SEEDS_TABLE_DATA } from 'src/app/mock_data/collect-seeds-data';

@Component({
  selector: 'app-collect-seeds-table',
  templateUrl: './collect-seeds-table.component.html',
  styleUrls: ['./collect-seeds-table.component.scss'],
  providers: [ListService, TableFilterService],
})
export class CollectSeedsTableComponent implements OnInit, OnDestroy {
  public question: Question;
  public options$: Observable<SelectOption[]>;
  public control: FormControl;
  private formDataSource: FormDataSource;
  public dataSource: TableDataSource<CollectSeedsModel>;
  private sortObj: SortOption<CollectSeedsModel>;
  public events$: Observable<string>;
  public rowsState$: Observable<RowsState<CollectSeedsModel>>;
  public columnsState$: Observable<ColumnState<CollectSeedsModel>>;
  public autocompleteEvent$: Observable<boolean>;
  public getAllFlag: boolean = false;


  index: number | string;
  toggle: boolean = false;
  number: number = 0
  listOfSite: any[] = [];

  public event: Observable<ListItem<any>>;



  public filtersObs$: Observable<ListItem<CollectSeedsModel>[]>

  public event$: Observable<string>;

  listOfhebNic: any[] = [];
  listOfCollector: any[] = [];
  listOfStatus: any[] = [];

  //importent
  filterLabels =
    {
      objectid: "",
      hebNic: [],
      site: [],
      collectorName: [],
      // from:[],
      seedsKg: "",
      status: [],
      lastPic: null,
      diaryDate: null,
    };


  ngAfterViewChecked() {
    if (this.seedService.listOfData.length > 0) {
      this.number = 0
      this.seedService.listOfData.forEach(x => {
        if (x.hebNic != null) {
          if (this.listOfhebNic.length == 0)
            this.listOfhebNic.push({ label: x.hebNic.trim(), value: ++this.number })
          else if (this.listOfhebNic.find(x1 => x1.label.trim() == x.hebNic.trim()) == null)
            this.listOfhebNic.push({ label: x.hebNic.trim(), value: ++this.number })
        }
        if (x.site != null) {
          if (this.listOfSite.length == 0)
            this.listOfSite.push({ label: x.site.trim(), value: ++this.number })
          else if (this.listOfSite.find(x1 => x1.label.trim() == x.site.trim()) == null)
            this.listOfSite.push({ label: x.site.trim(), value: ++this.number })
        }
        if (x.collectorName != null) {
          if (this.listOfCollector.length == 0)
            this.listOfCollector.push({ label: x.collectorName.trim(), value: ++this.number })
          else if (this.listOfCollector.find(x1 => x1.label.trim() == x.collectorName.trim()) == null)
            this.listOfCollector.push({ label: x.collectorName.trim(), value: ++this.number })
        }
        if (x.status.statusName != null) {
          if (this.listOfStatus.length == 0)
            this.listOfStatus.push({ label: x.status.statusName.trim(), value: ++this.number })
          else if (this.listOfStatus.find(x1 => x1.label.trim() == x.status.statusName.trim()) == null)
            this.listOfStatus.push({ label: x.status.statusName.trim(), value: ++this.number })
        }
      })
    }
  }


  // public columns: ColumnModel<CollectSeedsModel>[] = []



  public onAutocomplete() {

    this.control.valueChanges.pipe(map((value) => {
       ; this.seedService.AutoComplete(value)
    })).subscribe();
  }




  @Input() public row: any = {};
  @Input() selectable: boolean;
  @Input() hasState: boolean = true;
  @Input() hasAction: boolean = true;
  @Input() hasFooter: boolean = false;
  public mode$: Observable<string>;
  public add$: Observable<boolean>;
  public edit$: Observable<boolean>;
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }


  public columns: ColumnModel<CollectSeedsModel>[] = [
    new ColumnModel({
      columnDef:'objectid',
      label: 'קוד איסוף',
      question: { key: '', controlType: 'number', type: 'custom' },// type: 'custom'
    }),
    new ColumnModel({
      columnDef:'hebNic',

      label: 'מין הצמח', question: { key: '' },
      filterQuestion: {
        multi: true,
        key: '',
        options: this.listOfhebNic
      },
    }),
    new ColumnModel({
      columnDef:'site',

      label: 'מקור זרע', question: { key: '' },
      filterQuestion: {
        multi: true,
        key: '',
        options: this.listOfSite
      },
    }),
    new ColumnModel({
      columnDef:'collectorName',

      label: 'נאסף ע"י', question: { key: '' },
      filterQuestion: {
        multi: true,
        key: '',
        options: this.listOfCollector
      },
    }),
    new ColumnModel({
      columnDef:'diaryDate',

      label: 'תאריך איסוף',
      question: { key: 'date', disabled: true, controlType: 'date' },
      type: 'custom',
      format: 'date'

    }),
    new ColumnModel({
      columnDef:'lastPic',

      label: 'תאריך כניסה',
      question: { key: 'date', disabled: true },
      type: 'custom',
      format: 'date'
    }),
    new ColumnModel({
      columnDef:'seedsKg',
      label: 'משקל זרעים', question: { key: '', disabled: true } }),
    new ColumnModel({
      columnDef:'status',


      label: 'סטטוס',
      center: true,
      type: 'custom',
      filterQuestion: {
        multi: true,
        key: '',
        options: this.listOfStatus
      },
    }),
  ];
  public model: CollectSeedsModel = new CollectSeedsModel();
  public columns$: Observable<ColumnModel<CollectSeedsModel>[]>;

  // public columns: ColumnModel<CollectSeedsModel>[];
  public data$: Observable<CollectSeedsModel[]>;

  private pagination: PaginationInstance = {
    itemsPerPage: 5,
    currentPage: 1,
  };

  public options: TableOptions<CollectSeedsModel> = {
    pagination: this.pagination,
    filters: ['id', 'siteID', 'siteSize', 'treeID', 'treeIDText', 'comments', 'creationDate',
      'creator', 'editDate', 'editor', 'familyHeb', 'filesAttachments', 'globalID_2', 'kmhr',
      'lat', 'latinNam', 'long', 'picSeason', 'waze', 'year'
    ]
  };
  constructor(
    private seedService: CollectSeedsService,
    private tableFilterService: TableFilterService<CollectSeedsModel>,
    private routerService: RouterService,
    private route: Router,
    private dialog: MatDialog,
    private httpService: HttpService
  ) { }



  ngOnInit(): void {
    const { control, question } = this.seedService.setSearchControl();
    this.control = control;
    this.question = question;
    this.dataSource = new TableDataSource<CollectSeedsModel>(
      []
      );
      this.formDataSource = new FormDataSource();
      this.dataSource = new TableDataSource<CollectSeedsModel>();
      
      
      this.data$ = this.setDataWithFilters();
      
      this.columns$ = this.setColumns$();
      
      this.rowsState$ = this.dataSource.getRowsState();
      
      this.columnsState$ = this.dataSource.getColumnsState();
      
      this.events$ = this.dataSource.getEvents$();
      
      this.autocompleteEvent$ = this.onFormAutocomplete();
      
      
      //the event to remove all sinun
      this.filtersObs$ = this.tableFilterService.filtersStateSubject.asObservable()
      this.filtersObs$.subscribe(res => {
        if (res.length == 0) {
        this.filterLabels.status = []
        this.filterLabels.collectorName = []
        this.filterLabels.diaryDate = null
        this.filterLabels.hebNic = []
        this.filterLabels.lastPic = null
        this.filterLabels.objectid = ''
        this.filterLabels.seedsKg = ''
        this.filterLabels.site = []
        this.seedService.filterData(this.filterLabels);
      }
    })
    
    
    this.event = this.tableFilterService.getTableFilterRemovedAsObs()
    this.event.subscribe(res => {
      
      if (res != null) {
        if (Array.isArray(this.filterLabels[res.key])) {
          var filterArray = this.filterLabels[res.key]
          filterArray.splice(filterArray.indexOf(res.label), 1)
        }
        else if (res.key == "lastPic" || res.key == "diaryDate") {
          this.filterLabels[res.key] = null;
        }
        else {
          this.filterLabels[res.key] = "";
        }
        this.seedService.filterData(this.filterLabels);
      }
      
    })
    
    
  }
  
  filterTableObs() {
    return this.tableFilterService.filtersStateSubject.asObservable().pipe(switchMap((res) => {
    

      console.log(res)
      return res

    }))
  }

  public onEditState(row: RowModel<CollectSeedsModel>) {
    const link = "https://experience.arcgis.com/experience/19dca33e29e145338ec8ce66c269afc4?data_id=dataSource_1-17c7d3d5afb-layer-6%3A";
    const url = `${link + row.item.objectid + "&locale=he"}`
    window.open(url);
  }

  public onDeleteState(row: RowModel<CollectSeedsModel>) {
    let data=[]
    this.dataSource
    .connect()
    .pipe(
      first(),
      map((res) => {
        data = res;
      })
    )
    .subscribe();

  let index = data.findIndex((x) => x.objectid == row["row"].item.objectid);
 this.seedService.DeleteSeedsCollect({globalID:row["row"].item.globalID_2,objectID:row["row"].item.objectid}).subscribe(res=>{
  try{
    if(res==null)
    {
      data.splice(+index,1)
      this.dataSource.load(data)
      this.dataSource.delete({ row, options: { key: 'objectid' } });

    }
  }
  catch(e){
   alert(e);
 }

}
,
err => {  ; alert(err.error);}


)

  }
  public onAddFile(file: File) {
   
  }

  datesEvent(type: string, date: Date) { }



  // method which handle data$ with filters[]
  private setDataWithFilters(): Observable<CollectSeedsModel[]> {
    const freeText = new FreeText()
    let dataFromServer:CollectSeedsModel[]=[]
    const data$ = this.httpService.post('isufZraim/', 'GetSeedsCollects', freeText).pipe(
      switchMap((data) => {
        dataFromServer=data
        this.dataSource.load(data);

        return this.dataSource.connect();
      })
    )
    const filterCallback = (filters: ListItem<CollectSeedsModel>[]) => {
      return of(dataFromServer);
    };

    return this.tableFilterService.filterFormServer(data$, filterCallback);
  }

  private mergeSelectedFilters() {
    return merge(
      this.tableFilterService.getFiltersAfterRemove([
        'plantSpecies',
        'seedSperm',
        'collectedBy',
        'status',
      ])
    );
  }

  // method to handle multi filter options selected state
  private setSelectedFilters(): Observable<ColumnState<CollectSeedsModel>> {
    return this.mergeSelectedFilters().pipe(
      map((selectMap: FilterMap) => {
        // console.log('handle multi filter');

        const state: ColumnState<CollectSeedsModel> = {
          event: 'updateOptionsSelected',
          selectMap$: of(selectMap),
        };

        return state;
      }),
      startWith(null),
      skipWhile((selected) => selected === null)
    );
  }

  // method to get all filters options from server
  private getFilterOptions(): Observable<ColumnState<CollectSeedsModel>> {
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
    ColumnState<CollectSeedsModel>
  > {
    return merge(this.getFilterOptions(), this.setSelectedFilters());
  }

  // main method to set columns$
  private setColumns$() {
    return combineLatest([
      this.dataSource.connectColumns(this.columns),
      this.setColumnsFiltersOptions(),
    ]).pipe(
      map(([columns, tableFilters]) => {


        if (tableFilters) {
          const { event, multiOptions$, selectMap$ } = tableFilters;

          switch (event) {
            case 'updateMulti':
              this.dataSource.updateOptions({
                type: 'filter',
                multiOptions$,
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

  onFilter(filterOptions: any) {


    this.filterLabels[filterOptions.column.columnDef] = filterOptions.label;
    let data = this.seedService.filterData(this.filterLabels);
    this.filterData(data);
    let edit = true;
    return edit;
 
  }


  rangeDateChange(data) {
    this.filterLabels[data.column] = { date: data.date, type: data.type, column: data.column }
    let data1 = this.seedService.filterData(this.filterLabels);
    this.filterData(data1);
  }

  onOptionSelect($event) {

    $event.subscribe(res => console.log(res)
    )
  }
  freeSeach($event: any) {

  }
  checkboxfilter($event) {

    // let arr = this.seedService.listOfData;
    let column = $event.column;
    let labels = $event.labels;
    this.filterLabels[column] = labels;

    let data = this.seedService.filterData(this.filterLabels);
    this.filterData(data);
    let edit = true;
    return edit;
  }

  public onAddState() { }

  // main method to handle autocomplete event
  private onFormAutocomplete() {

    return this.formDataSource
      .getFormStateWithFilterEvents(['autocomplete'])

      .pipe(
        switchMap((filterEvent: FilterOption<CollectSeedsModel>) => {

          const {
            value,
            column: { filterQuestion, columnDef },
          } = filterEvent;

          return of(false);
        })
      );
  }

  public onFilterAutocomplete(filterOption: FilterOption<CollectSeedsModel>) {

    this.formDataSource.getActions().autocomplete(filterOption);
  }

  public getFiltersOfTable(filter: FilterOption<CollectSeedsModel>) {
  }

  public onExpand(options: RowsState<CollectSeedsModel>) {
    this.dataSource.expand(options);
  }

  public disableRow(options): void {

    if (options.row.expanded == true) {
      this.onExpand(options);
    }
    options.row.disabled = !options.row.disabled;
  }

  public excelClick(): void {
  }

  public onAddContact(row: RowModel<CollectSeedsModel>) { }
  public onClose() {
  }
  public clickOnAction(action: string): void {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      data: {
        title: 'ביטול/מחיקת הליך',
        message:
          '? לא ניתן להחזיר לפעילות התקשרות שבוטלה או נמחקה. האם ברצונך לבטל את ההתקשרות',
        buttonText: {
          ok: 'כן',
          cancel: 'לא',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('המשתמש בחר באישור');
      }
    });
  }

  inputChangedFunc($event) {

  }

  show(row) {
console.log(row);

    this.seedService.rowThatChooseTable = row.item
    this.route.navigate(['/collect-seeds/order']);
  }
  public onSortChange(sortOption: SortOption<CollectSeedsModel>) {
    const { dir, column } = sortOption;
    const newDir = dir === '' ? 'asc' : dir === 'asc' ? 'desc' : 'asc';
    sortOption.dir = newDir;

    this.dataSource.updateSortDir({ key: column.columnDef, dir: newDir });
    this.sortObj = sortOption;
    let data = []
    if (sortOption.dir == "asc")
      data = this.seedService.sortByAsc(sortOption);
    else if (sortOption.dir == "desc") {
      data = this.seedService.sortByDesc(sortOption);
    }
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
}
