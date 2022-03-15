import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, combineLatest, map, Observable, of, Subject, switchMap } from 'rxjs';
import { NEW_ORDER_PLANTES_COMPLETE_EXPANDABLE_TABLE } from 'src/app/mock_data/farm-forest-mock-data';
import { SortOption } from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  ColumnState,
  RowsState,
  Table,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { RouterService } from 'src/app/shared/services/route.service';
import { NewOrderPlantsCompleteService } from '../order-plants-complete.service';
import { NewOrderPlantesCompleteExpandingTableModel } from './new-order-plantes-complete-expanding-table.model';
import { NewOrderPlantesCompleteExpandingTableService } from './new-order-plantes-complete-expanding-table.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
@Component({
  selector: 'app-new-order-plantes-complete-expanding-table',
  templateUrl: './new-order-plantes-complete-expanding-table.component.html',
  styleUrls: ['./new-order-plantes-complete-expanding-table.component.scss'],
})
export class NewOrderPlantesCompleteExpandingTableComponent
  implements OnInit, Table<NewOrderPlantesCompleteExpandingTableModel>
{

  @Input() kodMishpacha: any;
  @Input() selectable: boolean;
  // @Input() contactTable: ElementRef;
  // @Input() evaluationTable: ElementRef;
  public showShortTable: boolean = false;

  public showShortTable$: Observable<boolean>;
  public dataSource: TableDataSource<NewOrderPlantesCompleteExpandingTableModel> =
    new TableDataSource();
  @Output() TzmachimByMashtelotChild = new EventEmitter();
  public model: NewOrderPlantesCompleteExpandingTableModel =
    new NewOrderPlantesCompleteExpandingTableModel();

  private formDataSource: FormDataSource;

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<
    RowsState<NewOrderPlantesCompleteExpandingTableModel>
  >;
  public columnsState$: Observable<
    ColumnState<NewOrderPlantesCompleteExpandingTableModel>
  >;
  public event$: Observable<string>;

  //table data
  public columns: ColumnModel<NewOrderPlantesCompleteExpandingTableModel>[] = [
    new ColumnModel({ label: 'צמח' }),
    new ColumnModel({
      label: 'אשתאול',
      question: {
        key: 'ashtaol',
        type: 'custom',
        label: 'אשתאול',
      },
    }),
    new ColumnModel({
      label: 'גולני',
      question: {
        key: 'golani',
        type: 'custom',
        label: 'גולני',
      },
    }),
    new ColumnModel({
      label: 'גילת',
      question: {
        key: 'gilat',
        type: 'custom',
        label: 'גילת',
      },
    }),
    new ColumnModel({ label: 'כמות' }),
  ];

  public data$: Observable<NewOrderPlantesCompleteExpandingTableModel[]>;
  public columns$: Observable<
    ColumnModel<NewOrderPlantesCompleteExpandingTableModel>[]
  >;
  private pagination: PaginationInstance = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 16,
  };

  // public plantingYear?: string;
  // public density?: string;
  // public treeEstimation?: string;
  // public speacialAreaComments?:
  public options: TableOptions<NewOrderPlantesCompleteExpandingTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
    selected: [],
    key: 'id',
  };

  public supplierLength$: Observable<boolean>;
  expandableTableDataArray: any;


  constructor(
    private addBeePlan: AddBeePlanService,
    private newOrderPlantsCompleteService: NewOrderPlantsCompleteService, private OrderPlantsCompleteService: OrderPlantsCompleteService,
    private addProductionProccessService: AddProductionProcessService,
    private newOrderPlantesCompleteExpandingTableService: NewOrderPlantesCompleteExpandingTableService,
    // private dialogService: DialogService,
    private routerService: RouterService,
    private orderplantsCompleteService: OrderPlantsCompleteService
  ) { }
  @Input() changing: Subject<boolean>;
  ngOnInit(): void {
    // TODO - init supplier selected from server
    this.changing.subscribe(v => { 
  
  if(this.addBeePlan.degelOfOrderPlanComplete==true)
     this.TzmachimLeMishpacha(this.addProductionProccessService.addTochnitYezur.id,this.orderplantsCompleteService.idOfMishpacha)
  else if(this.addBeePlan.degelOfOrderPlanCompleteByMashtelot==true)
      this.tochnitYitzurYaarMishkiByMishtalot(this.addProductionProccessService.addTochnitYezur.id);
    }
    );
    this.newOrderPlantesCompleteExpandingTableService.setDataSource(
      this.dataSource
    );
    this.data$ = this.setData();
    this.formDataSource = new FormDataSource();
    this.columns$ = this.setColumns$()
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.activeColumnDef$ = this.setActiveColumnDef$();

    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.activeColumnDef$ = this.setActiveColumnDef$();
    
  if(this.addBeePlan.degelOfOrderPlanComplete==true)
  this.TzmachimLeMishpacha(this.addProductionProccessService.addTochnitYezur.id,this.orderplantsCompleteService.idOfMishpacha)
else if(this.addBeePlan.degelOfOrderPlanCompleteByMashtelot==true)
   this.tochnitYitzurYaarMishkiByMishtalot(this.addProductionProccessService.addTochnitYezur.id);

    // this.supplierLength$ = this.setSupplierLength$();
    //  this.TzmachimLeMishpacha(this.addProductionProccessService.addTochnitYezur.id,this.orderplantsCompleteService.idOfMishpacha)
  }
  private setColumns$() {
    return (combineLatest([this.dataSource.connectColumns(this.columns),
      this.newOrderPlantsCompleteService.showShortTableAsObs()]).pipe(
      map(([columns,value]) => {
      columns=this.updateFormColumns(value)
        return columns;
      })
    ));
  }
  ngAfterViewChacked(){
     

  }
  ngOnDestroy(): void {
  }
  TzmachimLeMishpacha(misparTochnit, kodMishpacha) {
  
    try {
      this.OrderPlantsCompleteService.getTzmachimLeMishpacha(misparTochnit, kodMishpacha).subscribe(res => {
        res.forEach(element => {
          element.ashtaol=element.eshtaol;
          element.minHatzemach=element.tzemach
          delete element.tzemach
          delete element.eshtaol
          
        });
        this.expandableTableDataArray = res;
      this.OrderPlantsCompleteService.expandableTableDataArray=res
     //  this.OrderPlantsCompleteService.listofTableOrderPlantsComplete=res;

        this.dataSource.load(this.expandableTableDataArray);
      })
    }
    catch (e) {
      console.error(e);
    }
  }
  private setData(): Observable<NewOrderPlantesCompleteExpandingTableModel[]> {
     
    //  this.TzmachimByMashtelotChild.emit();
    let expandableTableDataArray = this.orderplantsCompleteService.expandableTableDataArray
    const data$ = of(expandableTableDataArray).pipe(

      switchMap((data) => {
        this.dataSource.load(data);
        return this.dataSource.connect();
      })
    );
    return data$;
  }
 tochnitYitzurYaarMishkiByMishtalot(misparTochnit) {
    try {
      this.OrderPlantsCompleteService.getTochnitYitzurMishkiMashtelot(misparTochnit,0).subscribe(res => {
        // this.treeTypes = secondTreeTypes;
        this.addBeePlan.degelOfOrderPlanComplete=false;
        this.addBeePlan.degelOfOrderPlanCompleteByMashtelot=true;
        this.addBeePlan.degelofAddBeeComplete=false;
        // this.OrderPlantsCompleteService.treeTypes=this.treeTypes;
      //  this.OrderPlantsCompleteService.listofTableOrderPlantsComplete=res.mineTzemach
        res.mineTzemach.forEach(element => {
          element.minHatzemach=element.tzemach
          element.total=element.kamut;
          delete element.kamut
          delete element.tzemach
          delete element.eshtaol
          
        });
        this.expandableTableDataArray = res.mineTzemach;
      this.OrderPlantsCompleteService.expandableTableDataArray=res.mineTzemach
       //this.OrderPlantsCompleteService.listofTableOrderPlantsComplete=res.mineTzemach;

        this.dataSource.load(this.expandableTableDataArray);
        // this.treeTypes[0]["count"] = res.ashtaol;
        // this.treeTypes[1]["count"] = res.golani;
        // this.treeTypes[2]["count"] = res.gilat;
        // this.treeTypes[3]["count"] = res.total;
        // this.regularTableDataArray = this.arraySorting(res.mineTzemach);
        //thos for kamut
       //this.regularTableDataArray = this.arrayDeleteKamut(this.regularTableDataArray);
        // this.regularTableDataArray = this.arrayDeleteMisparTochnit(this.regularTableDataArray);
        // this.handleTableArr(true);
        // this.status = res.status;
        // this.onatNetia = res.onatNetia;
        // this.child.updateStatus();
      },
      err=>{alert("אין נתונים להצגה");this.dataSource.load([])}
      )
    }
    catch (e) {
      console.error(e);
    }
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
    options: RowsState<NewOrderPlantesCompleteExpandingTableModel>
  ) {
    
    this.dataSource.expand(options);
  }

  public onSortChange(
    sortOption: SortOption<NewOrderPlantesCompleteExpandingTableModel>
  ) {
    const { dir, column } = sortOption;
    const newDir = dir === '' ? 'asc' : dir === 'asc' ? 'desc' : 'asc';
    this.dataSource.updateSortDir({ key: column.columnDef, dir: newDir });
  }
  emitShowShortTable(value) {
    
    if(value){
      this.newOrderPlantsCompleteService.emitfilterValue('all');
    }
    else{
      this.newOrderPlantsCompleteService.emitfilterValue('as');
    
    }
    this.newOrderPlantsCompleteService.emitShowShortTable(value)
  }


  updateFormColumns(showValue: boolean) {
    this.showShortTable = !showValue

if (!this.showShortTable) {

      // this.addBeePlan.degelOfOrderPlanCompleteByMashtelot = false;
      // this.addBeePlan.degelOfOrderPlanComplete = true;
      // this.addBeePlan.degelofAddBeeComplete = false;
      this.options.filters = ['id', 'lakoach', 'phone', 'address', 'email'];

      return [
        new ColumnModel({
          label: 'צמח',
          question: {
            type: 'default',
            disabled: true,
          },
        }),
        new ColumnModel({
          label: 'כמות',
          question: {
            type: 'default',
            disabled: true,
          },
        }),
        new ColumnModel({
          label: 'אשתאול',
          question: {
            key: 'ashtaol',
            type: 'custom',

            label: 'אשתאול',
            validations: [],
          },
        }),
        new ColumnModel({
          label: 'גולני',
          question: {
            key: 'golani',
            type: 'custom',

            label: 'גולני',
            validations: [],
          },
        }),
        new ColumnModel({
          label: 'גילת',
          question: {
            key: 'gilat',
            type: 'custom',

            label: 'גילת',
            validations: [],
          },
        }),
      ]
    } else {
      // this.addBeePlan.degelOfOrderPlanCompleteByMashtelot = true;
      // this.addBeePlan.degelOfOrderPlanComplete = false;
      // this.addBeePlan.degelofAddBeeComplete = false;

      this.options.filters = ['id'];
      return this.columns
    }
  }

  checkTotalSum(
    row: RowModel<NewOrderPlantesCompleteExpandingTableModel>,
    column,
    control
  ) {
    let sum: number = 0;
    sum = Object.keys(row.form.formGroup.controls)
      .map((item) => {
        return row.form.formGroup.controls[item].value;
      })
      .reduce((acc, next) => {
        return Number(acc) + Number(next);
      });

    if (Number(row.item.total) === sum) {
      return false;
    }
    if (sum > 0 && Number(row.item.total) !== sum) {
      return true;
    }
    return false;
  }


}
