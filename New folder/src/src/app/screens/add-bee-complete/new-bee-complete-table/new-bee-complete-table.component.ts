import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { first, map, Observable, of } from 'rxjs';
import { NEW_BEE_COMPLETE_DATA } from 'src/app/mock_data/bee-plan-complete-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { ListService } from 'src/app/shared/components/list/list.service';
import { TableFilterService } from 'src/app/shared/components/table-filters/table-filter.service';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  ColumnState,
  RowsState,
  TableEvent,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { NewOrderPlantesTableAllService } from '../../order-plants-complete/new-order-plantes-complete-table/new-order-plantes-complete-table-all.service';
import { NewBeeCompleteTableModel } from './new-bee-complete-table.model';
import { NewBeeCompleteTableService } from './new-bee-complete-table.service';

@Component({
  selector: 'app-new-bee-complete-table',
  templateUrl: './new-bee-complete-table.component.html',
  styleUrls: ['./new-bee-complete-table.component.scss'],
  providers: [ListService, TableFilterService],
})
export class NewBeeCompleteTableComponent implements OnInit, OnDestroy {
  @Input() treeTypes;
  
  public showShortTable$: Observable<boolean> = of(false);
public  hasActions:boolean=true
public rowSlots={}
  public showShortTable: boolean = false;
  public dataFromServer$: Observable<NewBeeCompleteTableModel[]>;
  private formDataSource: FormDataSource;
  public dataSource: TableDataSource<NewBeeCompleteTableModel>;
  public events$: Observable<string>;
  public rowsState$: Observable<RowsState<NewBeeCompleteTableModel>>;
  public columnsState$: Observable<ColumnState<NewBeeCompleteTableModel>>;
  public autocompleteEvent$: Observable<boolean>;
  // public getAllFlag: boolean = false;
  // plantTypes: any;
  public columns: ColumnModel<NewBeeCompleteTableModel>[] = [
    new ColumnModel({
      label: 'צמח',
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
      },
    }),
    new ColumnModel({
      label: 'גולני',
      question: {
        key: 'golani',
        type: 'custom',
      },
    }),
    new ColumnModel({
      label: 'גילת',
      question: {
        key: 'gilat',
        type: 'custom',
      },
    }),
    new ColumnModel({
      label: 'כמות',
      question: {
        type: 'default', 
        disabled: true,
      },
    }),
  ];


  public data$: Observable<NewBeeCompleteTableModel[]>;
  public columns$: Observable<ColumnModel<NewBeeCompleteTableModel>[]>;

  public model: NewBeeCompleteTableModel = new NewBeeCompleteTableModel();

  private pagination: PaginationInstance = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<NewBeeCompleteTableModel> = {
    pagination: this.pagination,
    filters: ['id','misparTochnit'],
    editable: [],
  };
  allData: any;
  @Input() filtersArr: any[] = [];
  filteredData: any;
  listOfData: any;
  constructor(
    private NewOrderPlantesTableAllService: NewOrderPlantesTableAllService,
    private orderPlantsService: OrderPlantsService,
    private orderPlantsCompleteService: OrderPlantsCompleteService,
    private addBeePlanService: AddBeePlanService,
    private spatialProductionProgramService: SpatialProductionProgramService,
    private addProductionProccessService: AddProductionProcessService,
    private newBeeCompleteTableService: NewBeeCompleteTableService
  ) {}
  @Output() changeFilters = new EventEmitter();
  ngOnInit() {
    this.showShortTable$ =
      this.newBeeCompleteTableService.getShowFullTableObs();
    this.dataSource = new TableDataSource<NewBeeCompleteTableModel>();
    this.newBeeCompleteTableService.getShowFullTableObs().subscribe((value) => {
      console.log(value);
      this.updateFormColumns(value);
    });
    // this.NewOrderPlantesTableAllService.connect().subscribe((res) => {
    //   this.dataSource.load(res);
    // });
    this.newBeeCompleteTableService.getShowFullTableObs().subscribe((value) => {
      console.log(value);
      this.updateFormColumns(value);
    });
    // let   data =this.NewOrderPlantesTableAllService.initTable()
    //   this.dataSource.load(data.mineTzemach);
    this.formDataSource = new FormDataSource();

    this.data$ = this.initTable();
    this.data$.subscribe((res) => {
      console.log(res);
    });
    this.columns$ = this.dataSource.connectColumns(this.columns);
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.events$ = this.dataSource.getEvents$();
    this.newBeeCompleteTableService.getDataObs().subscribe(res => {
      console.log(res);
      this.dataSource.load(res)
    }
    )
    // this.autocompleteEvent$ = this.onFormAutocomplete();
    //})

  }


  ngOnDestroy() {}

  public removeAllFilters(): void {}

  // method which handle data$ with filters[]
  setData(): Observable<NewBeeCompleteTableModel[]> {
    this.dataSource.connectColumns(this.columns);
    return this.dataSource.connect();
  }
  initTable() {
     
    this.treeTypes.forEach(element => {
      element.count=0;
    });
    this.changeFilters.emit(this.treeTypes);
        this.addBeePlanService.getTochnitYitzurMireDvorim(
          this.addProductionProccessService.addTochnitYezur.id).subscribe(res => {
    
            this.dataSource.load(res.mineTzemach);
            this.addBeePlanService.getTochnitYitzurMireDvorim(
              this.addProductionProccessService.addTochnitYezur.id).subscribe(res => {
                console.log(res);
                this.listOfData=res;
               // this.allData = res;
                this.filteredData = res
                this.treeTypes[0].count = this.filteredData.ashtaol;
                this.treeTypes[1].count = this.filteredData.golani;
                this.treeTypes[2].count = this.filteredData.gilat;
                this.treeTypes[3].count = this.filteredData.total;
    
                this.changeFilters.emit(this.treeTypes);
                return this.dataSource.connect();
              },
            
              )
          },
          err=>{ this.dataSource.load([])})
         
        return this.dataSource.connect();
  }


  // method to change row state to edit
  public onEditState(row: RowModel<NewBeeCompleteTableModel>) {
    // TODO - server side data
    this.dataSource.edit({ row, options: { key: 'id' } });
  }
  // method to change row state to save
  public onSaveContact(
    row: RowModel<NewBeeCompleteTableModel>,
    event: TableEvent
  ) {
    console.log(event);
    
    this.dataSource
      .connect()
      .pipe(
        first(),
        map((res) => {
          if (event === 'edit') {
             ;
            let listOfData = [];
            this.dataSource
              .connect()
              .pipe(
                first(),
                map((res) => {
                  listOfData = res;
                })
              )
              .subscribe();

            this.editData(
              row,
              this.allData,
              listOfData
            );
          
  
            this.dataSource.save({ row, options: { key: 'id' } });
          }

          if (event === 'create') {
            // this.newSpatialTableDataService.addData(res, row, this.allData);
            this.dataSource.save({ row, options: { key: 'id' } });
            // this.dataSource.cancel();
          }
        })
      )
      .subscribe();
    console.log('edit/create');
  }
editData(row:any,allData:any,listOfData:any){
 for( let i=0;i<listOfData.length;i++){
   listOfData[i].id=this.listOfData.mineTzemach[i].id
 }
  const newTotal= +row.form.formGroup.value.ashtaol + +row.form.formGroup.value.golani + +row.form.formGroup.value.gilat
  console.log(newTotal); 
  if( +row.form.formGroup.value.ashtaol <0 ||+row.form.formGroup.value.golani <0||+row.form.formGroup.value.gilat<0 )
  return alert("לא ניתן להכניס כמויות מתחת לאפס"); 
  if(+newTotal != +row.item.kamut){
    return alert("יש לוודא שכמות העצים החדשה שווה לכמות העצים הכללית")
  }
  let index= listOfData.findIndex(x=>x.id==row.item.id)
  this.addBeePlanService.degelofAddBeeComplete=true
  this.addBeePlanService.degelOfOrderPlanComplete=false
  this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot=false

//  (this.addBeePlanService.degelofAddBeeComplete == true) {
    let objectOfMinHatzemachAddbeePlan = Object.assign({
      tzemach: row.item.tzemach,
      ashtaol: row.form.formGroup.value.ashtaol,
      golani: row.form.formGroup.value.golani,
      gilat: row.form.formGroup.value.gilat,
      kamut: Number(row.form.formGroup.value.ashtaol) + Number(row.form.formGroup.value.golani) + Number(row.form.formGroup.value.gilat),
      id:row.item.id
    })
    this.addBeePlanService.saveMinHatzemachMashtelaYaarMishki(objectOfMinHatzemachAddbeePlan).subscribe(res => {
     try{
      if (res) {
 
listOfData[index].ashtaol=objectOfMinHatzemachAddbeePlan.ashtaol
listOfData[index].golani=objectOfMinHatzemachAddbeePlan.golani
listOfData[index].gilat=objectOfMinHatzemachAddbeePlan.gilat
this.addBeePlanService.listOfAddBeePlan=listOfData
this.dataSource.load(listOfData);
this.addBeePlanService.getTochnitYitzurMireDvorim(this.addProductionProccessService.addTochnitYezur.id).subscribe(res => {
  //this.allData = res;
  this.treeTypes[0].count = res.ashtaol;
  this.treeTypes[1].count = res.golani;
  this.treeTypes[2].count = res.gilat;
  this.treeTypes[3].count = res.total;

  this.changeFilters.emit(this.treeTypes);
 })
 
      
          }
        if(res.errors != null ){
          if(res.errors.title != null){
            alert(res.errors.title);
          }
          else{
            alert("תקלה במערכת, נא לנסות שנית")
          
          }
        }
      }
      catch(e){
      }
    },
    (error) => { 
      if(error.error != null ){
        if(error.error.title != null){
          alert(error.error.title);
        }
        else{
          alert("תקלה במערכת, נא לנסות שנית")
        
        }
      }                            //Error callback
    
    
    }) 
}

  public onCreateEvent() {
    this.dataSource.create({
      options: { item: new NewBeeCompleteTableModel() },
    });
  }

  // method to delete contact from server
  public onDeleteState(options: {
  
    row: RowModel<NewBeeCompleteTableModel>;
    event: string;
  }) {
     if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
       ;
      const { event, row } = options;
      let data = [];
      this.dataSource
        .connect()
        .pipe(
          first(),
          map((res) => {
            data = res;
          })
        )
        .subscribe();
        for( let i=0;i<data.length;i++){
          data[i].id=this.listOfData.mineTzemach[i].id
        }
      let index = data.findIndex((x) => x.id ==row.item.id);
      return this.orderPlantsService.deleteMinHatzemach(row.item.id).subscribe(res => {
           // //  
           try {
            if (res) {
              // //  
              data.splice(+index, 1);
              this.listOfData.mineTzemach.splice(+index,1)
              this.addBeePlanService.listOfAddBeePlan = data;
              this.dataSource.load(data);
              if (data.length == 0) {
                this.treeTypes[0].count = 0;
                this.treeTypes[1].count = 0;
                this.treeTypes[2].count = 0;
                this.treeTypes[3].count = 0;
                this.changeFilters.emit(this.treeTypes);
  
              }
              else {
                this.addBeePlanService.getTochnitYitzurMireDvorim(this.addProductionProccessService.addTochnitYezur.id).subscribe(res => {
                 // this.allData = res;
                  this.filteredData = res
                  this.treeTypes[0].count = res.ashtaol;
                  this.treeTypes[1].count = res.golani;
                  this.treeTypes[2].count = res.gilat;
                  this.treeTypes[3].count = res.total;
  
                  this.changeFilters.emit(this.treeTypes);
  
                })
  
              }
            }
          }
          catch (e) {
          }
        })
      }
      return [];
    }
  // // TODO - server side delete + update rows
  public onCancelEvent(row: RowModel<NewBeeCompleteTableModel>, event: string) {
    console.log(event);

    if (event === 'edit') {
      this.dataSource.close({ row, options: { key: 'id' } });
    } else {
      this.dataSource.cancel();
    }
  }
  castArrey(data: any[]) {
    let listOfData: any[] = [];
    data.forEach((x) => {
      listOfData.push({ label: x.name, value: x.code });
    });
    return listOfData;
  }

  checkTotalSum(row: RowModel<NewBeeCompleteTableModel>, column, control) {
    let sum = 0
    sum = Object.keys(row.form.formGroup.controls)
    .map((item) => {
      if (row.form.formGroup.controls[item].status !== 'DISABLED') {
        return row.form.formGroup.controls[item].value;
      } else {
        return 0;
      }
    })
    .reduce((acc, next) => {
      return Number(acc) + Number(next);
    });


    if (Number(row.form.formGroup.value.ashtaol) < 0) {
      return true;
    }
    if (Number(row.form.formGroup.value.golani) < 0) {
      return true;
    }
    if (Number(row.form.formGroup.value.gilat) < 0) {
      return true;
    }
    if (sum > 0 && Number(row.item.kamut) !== sum) {
      return true;
    }
    if (Number(row.item.kamut) === sum) {
      return false;
    }
    return false;
  }

  gardeningInput(row, type: string) {
    console.log(row);
  }

  updateFormColumns(showValue: boolean) {
    this.showShortTable = showValue;
    // if (showValue) {
      // this.options.filters = ['id', 'golani', 'gilat', 'ashtaol','misparTochnit','actions'];
     ;

    this.showShortTable = showValue;
    console.log(this.showShortTable);

    if (this.showShortTable) {
      // this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot = false;
      // this.addBeePlanService.degelOfOrderPlanComplete = true;
      // this.addBeePlanService.degelofAddBeeComplete = false;
      //this.
      this.options.filters = ['id', 'golani', 'gilat', 'ashtaol','misparTochnit'];
      this.columns$ = this.dataSource.connectColumns([
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
      ]);
      this.hasActions=false
      this.rowSlots={}
    } else {
      this.options.filters = ['id','misparTochnit'];
      this.columns$ = this.dataSource.connectColumns(this.columns);
      this.hasActions=true
   
  
    }
  // }

}
}
