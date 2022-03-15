import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { first, map, Observable } from 'rxjs';
import { NEW_ORDER_PLANTS_TABLE_DATA } from 'src/app/mock_data/farm-forest-mock-data';
import { orderPlants } from 'src/app/Models/orderPlants';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  ColumnState,
  RowsState,
  TableEvent,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { NewOrderPlantsTableModel } from './new-order-plants-table.model';
import { NewOrderPlantsTableService } from './new-order-plants-table.service';

@Component({
  selector: 'app-new-order-plants-table',
  templateUrl: './new-order-plants-table.component.html',
  styleUrls: ['./new-order-plants-table.component.scss'],
})
export class NewOrderPlantsTableComponent implements OnInit, OnDestroy {
  public showShortTable: boolean = false;
  public dataFromServer$: Observable<NewOrderPlantsTableModel[]>;
  private formDataSource: FormDataSource;
  public dataSource: TableDataSource<NewOrderPlantsTableModel>;
  public events$: Observable<string>;
  public rowsState$: Observable<RowsState<NewOrderPlantsTableModel>>;
  public columnsState$: Observable<ColumnState<NewOrderPlantsTableModel>>;
  public autocompleteEvent$: Observable<boolean>;
  public getAllFlag: boolean = false;
  plantTypes: any;
  arr = []
@Input() treeTypes;
@Output() changeFilter = new EventEmitter();
  public columns: ColumnModel<NewOrderPlantsTableModel>[] = [
    new ColumnModel({
      label: 'לקוח',
      question: {
        type: 'default',
        disabled: true,
      },
    }),
    new ColumnModel({
      label: 'טלפון',
      question: {
        type: 'default',
        disabled: true,
      },
    }),
    new ColumnModel({
      label: 'כתובת',
      question: {
        type: 'default',
        disabled: true,
      },
    }),
    new ColumnModel({
      label: 'דוא"ל',
      question: {
        type: 'default',
        disabled: true,
      },
    }),
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

  public data$: Observable<NewOrderPlantsTableModel[]>;
  public columns$: Observable<ColumnModel<NewOrderPlantsTableModel>[]>;

  public model: NewOrderPlantsTableModel = new NewOrderPlantsTableModel();

  private pagination: PaginationInstance = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<NewOrderPlantsTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };
  filteredData: any;
  ELEMENT_DATA: any;
  listOfData: any;
  constructor(private newOrderPlantsTableService: NewOrderPlantsTableService, private addProductionProcessService: AddProductionProcessService,
    private orderPlantsComplete: OrderPlantsCompleteService, private orderPlantsService: OrderPlantsService
  ) { }
  ngOnInit() {
     ;
    this.dataSource = new TableDataSource<NewOrderPlantsTableModel>();

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

  ngOnDestroy() { }

  public removeAllFilters(): void { }

  initTable() {
    this.orderPlantsComplete.getTochnitYitzurYaarMishki(this.addProductionProcessService.addTochnitYezur.id, 0).subscribe(res => {
      this.ELEMENT_DATA = res;
      console.log(res);
      
      this.orderPlantsService.objectWithListOfOrderPlants=new orderPlants()
      this.orderPlantsService.objectWithListOfOrderPlants= this.ELEMENT_DATA;

      console.log(res)
      this.treeTypes[0]["count"] = res.machtaniyim;
      this.treeTypes[1]["count"] = res.choreshTivi;
      this.treeTypes[2]["count"] = res.ekaliptus;
      this.treeTypes[3]["count"] = res.shitim;
      this.treeTypes[4]["count"] = res.atzeyNoy;
      this.treeTypes[5]["count"] = res.total;
    this.changeFilter.emit(this.treeTypes);
      this.dataSource.connectColumns(this.columns);
      this.dataSource.load(this.ELEMENT_DATA.mineTzemach);
      return this.dataSource.connect();
    })
    return this.dataSource.connect();
  }

  // method to change row state to edit
  public onEditState(row: RowModel<NewOrderPlantsTableModel>) {
    console.log(this.arr);

    // TODO - server side data
    this.dataSource.edit({ row, options: { key: 'id' } });
  }
  // method to change row state to save
  public onSaveContact(
    row: RowModel<NewOrderPlantsTableModel>,
    event: TableEvent
  ) {
    console.log(row);
  }

  public onCreateEvent() {
    this.dataSource.create({
      options: { item: new NewOrderPlantsTableModel() },
    });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<NewOrderPlantsTableModel>;
    event: string;
  }) {

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
      this.orderPlantsService.deleteMinHatzemach(options.row.item.id).subscribe(res => {
        try {
          if (res) {
          console.log(res)
             this.listOfData.splice(index, 1);
             this.dataSource.load(this.listOfData);
             this.orderPlantsService.objectWithListOfOrderPlants.mineTzemach=this.listOfData
             this.arr=[];
             this.newOrderPlantsTableService.arr=[]
            alert('מחיקה בוצעה בהצלחה')!!
            this.orderPlantsComplete.getTochnitYitzurYaarMishki(this.addProductionProcessService.addTochnitYezur.id, 0).subscribe(res => {
              this.treeTypes[0]["count"] = res.machtaniyim;
              this.treeTypes[1]["count"] = res.choreshTivi;
              this.treeTypes[2]["count"] = res.ekaliptus;
              this.treeTypes[3]["count"] = res.shitim;
              this.treeTypes[4]["count"] = res.atzeyNoy;
              this.treeTypes[5]["count"] = res.total;
              this.changeFilter.emit(this.treeTypes);

          }
            )
          if (res.errors != null) {
            if (res.errors.title != null) {
              alert(res.errors.title);
            }
            else {
              alert("תקלה במערכת, נא לנסות שנית")

            }
          }
        }
      }
        catch (e) {
        }
      },
        (error) => {
          if (error.error != null) {
            if (error.error.title != null) {
              alert(error.error.title);
            }
            else {
              alert("תקלה במערכת, נא לנסות שנית")

            }
          }                            //Error callback
        })
    }
  }

  // // TODO - server side delete + update rows

  public onCancelEvent(row: RowModel<NewOrderPlantsTableModel>, event: string) {
    console.log(event);

    if (event === 'edit') {
      this.dataSource.close({ row, options: { key: 'id' } });
    } else {
      this.dataSource.cancel();
    }
  }

  checkTotalSum(row: RowModel<NewOrderPlantsTableModel>, column, control) {
    //  
    // let sum: number = 0;
    // if (this.arr.findIndex(item => item.id === row.item.id) !== -1) {
    //   console.log(row.item.id);

    // } else {
    //   this.arr.push(row.item)
    // }
    // sum = Object.keys(row.form.formGroup.controls)
    //   .map((item) => {
    //     if (row.form.formGroup.controls[item].status !== 'DISABLED' || row.form.formGroup.controls[item].value !== "") {
    //       return row.form.formGroup.controls[item].value;
    //     } else {
    //       return 0;
    //     }
    //   })
    //   .reduce((acc, next) => {
    //     return Number(acc) + Number(next);
    //   });
    // console.log(sum);

    // if (Number(row.item.kamut) === sum) {
    //   console.log(sum);
    //   return false;
    // }
    // if (sum > 0 && Number(row.item.kamut) !== sum) {
    //   return true;
    // }
    // return false;
    let sum: number = 0;
    if (this.arr.findIndex(item => item.id === row.item.id) !== -1) {
      if(Number(row.form.formGroup.value["ashtaol"] )+Number( row.form.formGroup.value["golani"]) +Number(row.form.formGroup.value["gilat"])==row.item.kamut)
      row.item.ashtaol=Number(row.form.formGroup.value["ashtaol"]);
      row.item.golani=Number( row.form.formGroup.value["golani"]);
      row.item.gilat=Number( row.form.formGroup.value["gilat"]);
      row.item.kamut=row.item.kamut
     if( this.arr.find(x=>x.id==row.item.id)==null)
     this.arr.push(row.item)
     this.newOrderPlantsTableService.arr=[...this.arr]
     
     
    } else {
      this.arr.push(row.item)
      this.newOrderPlantsTableService.arr=[...this.arr]
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
      if (Number(row.form.formGroup.value.ashtaol) < 0) {
        return true;
      }
      if (Number(row.form.formGroup.value.golani) < 0) {
        return true;
      }
      if (Number(row.form.formGroup.value.gilat) < 0) {
        return true;
      }

    if (Number(row.item.kamut) === sum) {
      console.log(sum);
      return false;
    }
    if (sum > 0 && Number(row.item.kamut) !== sum) {
      return true;
    }
    return false;
  }
}
