import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { first, map, Observable } from 'rxjs';
import { NEW_ADD_BEE_COMPLETE_DATA } from 'src/app/mock_data/bee-plan-complete-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { ColumnState, RowsState, TableEvent, TableOptions } from 'src/app/shared/components/table/table.component';
import { NewOrderPlantsTableService } from '../../order-plants/new-order-plants-table/new-order-plants-table.service';
import { NewAddBeePlanTableModel } from './new-add-bee-plan-table.model';
import { NewAddBeePlanTableService } from './new-add-bee-plan-table.service';

@Component({
  selector: 'app-new-add-bee-plan-table',
  templateUrl: './new-add-bee-plan-table.component.html',
  styleUrls: ['./new-add-bee-plan-table.component.scss']
})
export class NewAddBeePlanTableComponent implements OnInit, OnDestroy {
@Input() prop:boolean=false
  public showShortTable: boolean = false;
  public dataFromServer$: Observable<NewAddBeePlanTableModel[]>;
  private formDataSource: FormDataSource;
  public dataSource: TableDataSource<NewAddBeePlanTableModel>;
  public events$: Observable<string>;
  public rowsState$: Observable<RowsState<NewAddBeePlanTableModel>>;
  public columnsState$: Observable<ColumnState<NewAddBeePlanTableModel>>;
  public autocompleteEvent$: Observable<boolean>;
  public getAllFlag: boolean = false;
  plantTypes: any;
@Output() updateTreeTypes = new EventEmitter()
  public columns: ColumnModel<NewAddBeePlanTableModel>[] = [
  
    new ColumnModel({
      label: 'צמח',
      columnDef: 'tzemach',
      question: {
        key: 'tzemach',
        disabled: true,
      },
    }),

    new ColumnModel({
      label: 'כמות',
      columnDef: 'kamut',
      question: {
        key: 'kamut',
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
  ];


  public data$: Observable<NewAddBeePlanTableModel[]>;
  public columns$: Observable<ColumnModel<NewAddBeePlanTableModel>[]>;

  public model: NewAddBeePlanTableModel = new NewAddBeePlanTableModel();

  private pagination: PaginationInstance = {
    itemsPerPage: 25,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<NewAddBeePlanTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };
  filteredData: any;
  ELEMENT_DATA: any;
 @Input() treeTypes: any;
  listOfData: any[]=[];
  arr: any[]=[];
  constructor(private newAddBeePlanTableService: NewAddBeePlanTableService,private addBeePlanService:AddBeePlanService,private addProductionProcessService:AddProductionProcessService,private orderPlantsCompletetService:OrderPlantsCompleteService) {}
  ngOnInit() {
     ;
    this.dataSource = new TableDataSource<NewAddBeePlanTableModel>();

    this.formDataSource = new FormDataSource();
    this.data$ = this.initTable();
    this.data$.subscribe((res) => {
      console.log(res);
    });
    this.columns$ = this.dataSource.connectColumns(this.columns);
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.events$ = this.dataSource.getEvents$();
    this.dataSource.form()

  }

  ngOnDestroy() {}

  public removeAllFilters(): void {}

  initTable() {
     this.addBeePlanService.getTochnitYitzurMireDvorim(this.addProductionProcessService.addTochnitYezur.id).subscribe(res=>{ 
      this.ELEMENT_DATA=res;
      console.log(res);
      this.addBeePlanService.objectWithTheListOfAddBee=res

        this.treeTypes[0]["count"] = res.ashtaol;
        this.treeTypes[1]["count"] = res.golani;
        this.treeTypes[2]["count"] = res.gilat;
        this.treeTypes[3]["count"] = res.total;
        this.addBeePlanService.listOfAddBeePlan=this.ELEMENT_DATA.mineTzemach
        this.updateTreeTypes.emit(this.treeTypes);
        this.dataSource.connectColumns(this.columns);
        this.dataSource.load(this.ELEMENT_DATA.mineTzemach);
        return this.dataSource.connect();
    })
    return this.dataSource.connect();


  }

  // method to change row state to edit
  public onEditState(row: RowModel<NewAddBeePlanTableModel>) {
    // TODO - server side data
    this.dataSource.edit({ row, options: { key: 'id' } });
  }
  // method to change row state to save
  public onSaveContact(
    row: RowModel<NewAddBeePlanTableModel>,
    event: TableEvent
  ) {
    console.log(row);
  }

  public onCreateEvent() {
    this.dataSource.create({
      options: { item: new NewAddBeePlanTableModel() },
    });
  }

  // method to delete contact from server
   public onDeleteState(options: {
    row: RowModel<NewAddBeePlanTableModel>;
    event: string;
  }) {
    // if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
      
    //   this.dataSource
    //   .connect()
    //   .pipe(
    //     first(),
    //     map((res) => {
    //       this.listOfData = res;
    //     })
    //   )
    //   let index = this.listOfData.findIndex(x => x.id == options.row.item.id)
    //   this.addBeePlanService.deleteMinHatzemach(options.row.item.id).subscribe(res => {
    //     try {
    //       if (res) {
    //         this.listOfData.splice(+index, 1);
    //         this.dataSource.load(this.listOfData)
    //         this.arr=[];
    //         this.newAddBeePlanTableService.arr=[]

    //         if(this.listOfData.length==0){
    //           this.treeTypes[0]["count"] =0;
    //           this.treeTypes[1]["count"] = 0;
    //           this.treeTypes[2]["count"] = 0;
    //           this.treeTypes[3]["count"] = 0;
    //           this.addBeePlanService.listOfAddBeePlan = []
    //           this.updateTreeTypes.emit(this.treeTypes);
    //         }
    //        else{ this.addBeePlanService.getTochnitYitzurMireDvorim(this.addProductionProcessService.addTochnitYezur.id).subscribe(res => {
    //           this.ELEMENT_DATA = res;
    //           console.log(res);
    //           this.addBeePlanService.objectWithTheListOfAddBee = res;
    //           this.treeTypes[0]["count"] = res.ashtaol;
    //           this.treeTypes[1]["count"] = res.golani;
    //           this.treeTypes[2]["count"] = res.gilat;
    //           this.treeTypes[3]["count"] = res.total;
    //           this.addBeePlanService.listOfAddBeePlan = this.ELEMENT_DATA.mineTzemach
    //           this.updateTreeTypes.emit(this.treeTypes);
    //         })
    //       }
    //       }
    //       if (res.errors != null) {
    //         if (res.errors.title != null) {
    //           alert(res.errors.title);
    //         }
    //         else {
    //           alert("תקלה במערכת, נא לנסות שנית")

    //         }
    //       }
    //     }

    //     catch (e) {
    //     }
    //     (error) => {
    //       if (error.error != null) {
    //         if (error.error.title != null) {
    //           alert(error.error.title);
    //         }
    //         else {
    //           alert("תקלה במערכת, נא לנסות שנית")

    //         }
    //       }
    //     }                          //Error callback
    //   })

    // }
    if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
      
      this.dataSource
      .connect()
      .pipe(
        first(),
        map((res) => {
          this.listOfData = res;
        })
      )
      .subscribe();
      let index=this.listOfData.findIndex(x=>x.id==options.row.item.id)
       this.addBeePlanService.deleteMinHatzemach(options.row.item.id).subscribe(res=>{
        try{
      if(res){
        this.listOfData.splice(+index,1);
        this.dataSource.load(this.listOfData)
        this.arr=[];
        this.newAddBeePlanTableService.arr=[]
        this.addBeePlanService.objectWithTheListOfAddBee.mineTzemach=this.listOfData
        if(this.listOfData.length==0){
                    this.treeTypes[0]["count"] =0;
                    this.treeTypes[1]["count"] = 0;
                    this.treeTypes[2]["count"] = 0;
                    this.treeTypes[3]["count"] = 0;
                    this.addBeePlanService.listOfAddBeePlan = []
                    this.updateTreeTypes.emit(this.treeTypes);
                  }
                 else{ this.addBeePlanService.getTochnitYitzurMireDvorim(this.addProductionProcessService.addTochnitYezur.id).subscribe(res => {
                    this.ELEMENT_DATA = res;
                    console.log(res);
                    this.addBeePlanService.objectWithTheListOfAddBee = res;
                    this.treeTypes[0]["count"] = res.ashtaol;
                    this.treeTypes[1]["count"] = res.golani;
                    this.treeTypes[2]["count"] = res.gilat;
                    this.treeTypes[3]["count"] = res.total;
                    this.addBeePlanService.listOfAddBeePlan = this.ELEMENT_DATA.mineTzemach
                    this.updateTreeTypes.emit(this.treeTypes);
                  })
                }
      }
      if (res.errors != null) {
              if (res.errors.title != null) {
                alert(res.errors.title);
              }
              else {
                alert("תקלה במערכת, נא לנסות שנית")
      
              }
            }
      }

    catch (e) {
         }
         (error) => {
          if (error.error != null) {
            if (error.error.title != null) {
              alert(error.error.title);
            }
            else {
              alert("תקלה במערכת, נא לנסות שנית")
    
            }
          } 
                                  }                          //Error callback
    })
  }
  }
  checkTotalSum(row: RowModel<NewAddBeePlanTableModel>, column, control) {
    let sum: number = 0;
    if (this.arr.findIndex(item => item.id === row.item.id) !== -1) {
      if (Number(row.form.formGroup.value["ashtaol"]) + Number(row.form.formGroup.value["golani"]) + Number(row.form.formGroup.value["gilat"]) == Number(row.item.kamut) ) {
        row.item.ashtaol = Number(row.form.formGroup.value["ashtaol"]);
        row.item.golani = Number(row.form.formGroup.value["golani"]);
        row.item.gilat = Number(row.form.formGroup.value["gilat"]);
        row.item.kamut = row.item.kamut
        if (this.arr.find(x => x.id == row.item.id) == null)
          this.arr.push(row.item)
        this.newAddBeePlanTableService.arr = [...this.arr]
      }
    } else {
      this.arr.push(row.item)
      this.newAddBeePlanTableService.arr = [...this.arr]
    }
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

    if (Number(row.item.ashtaol) <0) {
      return true;
    }
    if (Number(row.item.golani) <0) {
      return true;
    }
    if (Number(row.item.gilat) <0) {
      return true;
    }
    if (sum > 0 && Number(row.item.kamut) !== sum) {
      return true;
    }
    if (Number(row.item.kamut) === sum) {
      console.log(sum);
      return false;
    }
    return false
  
  }
}
