import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { combineLatest, first, map, Observable } from 'rxjs';
// import { NEW_ORDER_PLANTES_COMPLETE_ALL } from 'src/app/mock_data/farm-forest-mock-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { QuestionNumberModel } from 'src/app/shared/components/form/models/question-number.model';
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
import { NewOrderPlantsCompleteService } from '../order-plants-complete.service';
import { NewOrderCompleteTableAllModel } from './new-order-plantes-complete-table-all.model';
import { NewOrderPlantesTableAllService } from './new-order-plantes-complete-table-all.service';

@Component({
  selector: 'app-new-order-plantes-complete-table',
  templateUrl: './new-order-plantes-complete-table.component.html',
  styleUrls: ['./new-order-plantes-complete-table.component.scss'],
  providers: [ListService, TableFilterService],
})
export class NewOrderPlantesCompleteTableComponent
  implements OnInit, OnDestroy
{
  public showShortTable: boolean = false;

  public showShortTable$: Observable<boolean>;
  public dataFromServer$: Observable<NewOrderCompleteTableAllModel[]>;
  private formDataSource: FormDataSource;
  public dataSource: TableDataSource<NewOrderCompleteTableAllModel>;
  public events$: Observable<string>;
  public rowsState$: Observable<RowsState<NewOrderCompleteTableAllModel>>;
  public columnsState$: Observable<ColumnState<NewOrderCompleteTableAllModel>>;
  public autocompleteEvent$: Observable<boolean>;
  public getAllFlag: boolean = false;
  plantTypes: any;

  public columns: ColumnModel<NewOrderCompleteTableAllModel>[] = [
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

        label: 'אשתאול',
        validations: [this.totalValidate],
      },
    }),
    new ColumnModel({
      label: 'גולני',
      question: {
        key: 'golani',
        type: 'custom',

        label: 'גולני',
        validations: [this.totalValidate],
      },
    }),
    new ColumnModel({
      label: 'גילת',
      question: {
        key: 'gilat',
        type: 'custom',

        label: 'גילת',
        validations: [this.totalValidate],
      },
    }),
  ];

  public data$: Observable<NewOrderCompleteTableAllModel[]>;
  public columns$: Observable<ColumnModel<NewOrderCompleteTableAllModel>[]>;

  public model: NewOrderCompleteTableAllModel =
    new NewOrderCompleteTableAllModel();

  private pagination: PaginationInstance = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<NewOrderCompleteTableAllModel> = {
    pagination: this.pagination,
    filters: ['id','misparTochnit','kodMinHatzemach',,''],
  };
  allData: any;
  @Input() filtersArr: any[] = [];
  filteredData: any;
  constructor(
    private newOrderPlantsCompleteService: NewOrderPlantsCompleteService,
    private NewOrderPlantesTableAllService: NewOrderPlantesTableAllService,
    private tableFilterService: TableFilterService<NewOrderCompleteTableAllModel>,
    private dialog: MatDialog,
    private orderPlantsService: OrderPlantsService,
    private orderPlantsCompleteService: OrderPlantsCompleteService,
    private router: Router,
    private addBeePlan: AddBeePlanService,
    private spatialProductionProgramService: SpatialProductionProgramService,
    private addProductionProccessService: AddProductionProcessService,
    private addBeePlanService: AddBeePlanService
  ) {}
  @Output() changeFilters = new EventEmitter();

  ngOnInit() {

    this.dataSource = new TableDataSource<NewOrderCompleteTableAllModel>();

    this.formDataSource = new FormDataSource();
    this.data$ = this.initTable();
    this.data$.subscribe((res) => {});
    this.columns$ = this.setColumns$();
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.events$ = this.dataSource.getEvents$();
  }

  ngOnDestroy() {}

  private setColumns$() {
    return combineLatest([
      this.dataSource.connectColumns(this.columns),
      this.newOrderPlantsCompleteService.showShortTableAsObs(),
    ]).pipe(
      map(([columns, value]) => {
        
        columns = this.updateFormColumns(value);
        return columns;
      })
    );
  }

  public removeAllFilters(): void {}

 
  initTable() {
    // if(this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot!=true){
    this.orderPlantsCompleteService.getTochnitYitzurYaarMishki(this.addProductionProccessService.addTochnitYezur.id, 0).subscribe(res => {
     
      this.dataSource.load(res.mineTzemach);
      this.spatialProductionProgramService.getSpatialProductionProgram(this.addProductionProccessService.addTochnitYezur.id).subscribe(result => {
        this.plantTypes = result.tzmachim;
        this.orderPlantsCompleteService.plants=this.plantTypes
      this.allData=result;
      // this.addBeePlanService.degelOfOrderPlanComplete = true;
      // this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot = false;
      // this.addBeePlanService.degelofAddBeeComplete = false;
      this.orderPlantsCompleteService.listofTableOrderPlantsComplete = res.mineTzemach;
      if(this.addBeePlanService.degelOfOrderPlanComplete == true)
        {
      this.orderPlantsCompleteService.getTochnitYitzurYaarMishki(this.addProductionProccessService.addTochnitYezur.id, 0).subscribe(res => {
         
        //this.allData = res;
        this.filteredData=res
        this.filtersArr[0].count = this.filteredData.machtaniyim;
        this.filtersArr[1].count = this.filteredData.choreshTivi;
        this.filtersArr[2].count = this.filteredData.ekaliptus;
        this.filtersArr[3].count = this.filteredData.shitim;
        this.filtersArr[4].count = this.filteredData.atzeyNoy;
        this.filtersArr[5].count = this.filteredData.total
        
        this.changeFilters.emit(this.filtersArr);
       })
      }
    })
  
  })
   // }
    // else if(this.addBeePlanService.degelOfOrderPlanComplete==true)
    // {
    //  // this.tochnitYitzurYaarMishkiByMishtalot(this.addProductionProccessService.addTochnitYezur.id)

    // }
    return this.dataSource.connect();
}
tochnitYitzurYaarMishkiByMishtalot(misparTochnit) {
  try {
    // if (this.isFirstTable) {
    //   this.anotherRegularTableFormArray = this.regularTableFormArray;
    //   this.regularTableFormArray = [...regularFormSecondTable];
    // }
    this.orderPlantsCompleteService.getTochnitYitzurMishkiMashtelot(
      misparTochnit,
      0
    ).subscribe(
      (res) => {
        // this.treeTypes = secondTreeTypes;
        // this.addBeePlanService.degelOfOrderPlanComplete = false;
        // this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot = true;
        // this.addBeePlanService.degelofAddBeeComplete = false;
        // this.orderPlantsCompleteService.treeTypes = se;
        this.orderPlantsCompleteService.listofTableOrderPlantsComplete =
          res.mineTzemach;
        // this.treeTypes[0]['count'] = res.ashtaol;
        // this.treeTypes[1]['count'] = res.golani;
        // this.treeTypes[2]['count'] = res.gilat;
        // this.treeTypes[3]['count'] = res.total;
        this.filtersArr[0].count = this.filteredData.machtaniyim;
        this.filtersArr[1].count = this.filteredData.choreshTivi;
        this.filtersArr[2].count = this.filteredData.ekaliptus;
        this.filtersArr[3].count = this.filteredData.shitim;
        this.changeFilters.emit(this.filtersArr);
      })
    }
     
        // this.regularTableDataArray = this.arraySorting(res.mineTzemach);
        //thos for kamut
        //this.regularTableDataArray = this.arrayDeleteKamut(this.regularTableDataArray);
        // this.regularTableDataArray = this.arrayDeleteMisparTochnit(
          // this.regularTableDataArray
        // );
       // this.handleTableArr(true);
        // this.status /= res.status;
        // this.onatNetia = res.onatNetia;
        // this.child.updateStatus();
  
  catch (e) {
    console.error(e);
  }
  return  this.dataSource.connect();

}

  // method to change row state to edit
  public onEditState(row: RowModel<NewOrderCompleteTableAllModel>) {
    // TODO - server side data
    this.dataSource.edit({ row, options: { key: 'id' } });
  }
  // method to change row state to save
  public onSaveContact(
    row: RowModel<NewOrderCompleteTableAllModel>,
    event: TableEvent
  ) {
    this.dataSource
      .connect()
      .pipe(
        first(),
        map((res) => {
          if (event === 'edit') {
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

            this.NewOrderPlantesTableAllService.editData(
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
  }

  public onCreateEvent() {
    this.dataSource.create({
      options: { item: new NewOrderCompleteTableAllModel() },
    });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<NewOrderCompleteTableAllModel>;
    event: string;
  }) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
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

      let index = data.findIndex((x) => x.id == row.item.id);
      let objectOfMinHatzemach = Object.assign({
        ashtaolFirst: data[index].ashtaol,
        ashtaolNow: 0,
        golaniFirst: data[index].golani,
        golaniNow: 0,
        gilatFirst: data[index].gilat,
        gilatNow: 0,
        kamutFirst: data[index].kamut,
        kamutNow: 0,
      });
      return this.orderPlantsService
        .deleteMinHatzemach(row.item.id)
        .subscribe((res) => {
          try {
            if (res) {
              data.splice(+index, 1);
              this.dataSource.load(data);
              this.orderPlantsCompleteService.listofTableOrderPlantsComplete =
                data;
              this.orderPlantsCompleteService
                .getTochnitYitzurYaarMishki(
                  this.addProductionProccessService.addTochnitYezur.id,
                  0
                )
                .subscribe((res) => {
                  //this.allData = res;
                  this.filteredData = res;
                  this.filtersArr[0].count = this.filteredData.machtaniyim;
                  this.filtersArr[1].count = this.filteredData.choreshTivi;
                  this.filtersArr[2].count = this.filteredData.ekaliptus;
                  this.filtersArr[3].count = this.filteredData.shitim;
                  this.filtersArr[4].count = this.filteredData.atzeyNoy;
                  this.filtersArr[5].count = this.filteredData.total;

                  this.changeFilters.emit(this.filtersArr);
                });
              // this.initFiltersFirst(res);
              //   this.tableDataToShow = this.tableDataArray
              //     .map((el) => Object.assign({}, el))
              //     .slice(
              //       this.currentPage * this.itemsPerPage,
              //       this.currentPage * this.itemsPerPage + 8
              //     );
              // }
              // if(this.addBeePlan.degelofAddBeeComplete)
              //   this.updateFiltered.emit(objectOfMinHatzemach)
              //   else if(this.addBeePlan.degelOfOrderPlanCompleteByMashtelot)
              //   this.updateFilteredMishtalot.emit(objectOfMinHatzemach)
              if (res.errors != null) {
                if (res.errors.title != null) {
                  alert(res.errors.title);
                } else {
                  alert('תקלה במערכת, נא לנסות שנית');
                }
              }
            }
          } catch (e) {}
          (error) => {
            if (error.error != null) {
              if (error.error.title != null) {
                alert(error.error.title);
              } else {
                alert('תקלה במערכת, נא לנסות שנית');
              }
            }
          };
        });
    }
    return [];
  }
  // // TODO - server side delete + update rows
  // //TODO - this.supplierContactService.dataSource.load(

  public onCancelEvent(
    row: RowModel<NewOrderCompleteTableAllModel>,
    event: string
  ) {
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
  checkTotalSum(row: RowModel<NewOrderCompleteTableAllModel>, column, control) {

  let sum: number = 0;
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

  totalValidate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = 'as';
      return forbidden ? { forbiddenName: 'asd' } : null;
    };
  }

  gardeningInput(row, type: string) {
  }

  // newShowShortTableValue() {
  //   return this.newOrderPlantsCompleteService.showShortTableAsObs().pipe(
  //     map((res) => {
  //       this.updateFormColumns(res); 
  //       return res;
  //     })
  //   );
  // }

  emitShowShortTable(value) {
    if(value==true){
      this.addBeePlan.degelOfOrderPlanCompleteByMashtelot = false;
      this.addBeePlan.degelOfOrderPlanComplete = true;
      this.addBeePlan.degelofAddBeeComplete = false;

    }
    else{
      this.addBeePlan.degelOfOrderPlanCompleteByMashtelot = true;
      this.addBeePlan.degelOfOrderPlanComplete = false;
      this.addBeePlan.degelofAddBeeComplete = false;

    }
    if(value){
  this.newOrderPlantsCompleteService.emitfilterValue('all');
}else{
  this.newOrderPlantsCompleteService.emitfilterValue('as');

}
    this.newOrderPlantsCompleteService.emitShowShortTable(value);
    this.newOrderPlantsCompleteService.emitShowPrsonTale(value);
  }

  updateFormColumns(showValue: boolean) {
    this.showShortTable = !showValue;

if (!showValue) { 
  
  // this.addBeePlan.degelOfOrderPlanCompleteByMashtelot = false;
  // this.addBeePlan.degelOfOrderPlanComplete = true;
  // this.addBeePlan.degelofAddBeeComplete = false;

 


      this.options.filters = ['id', 'lakoach', 'phone', 'address', 'email','total','misparTochnit','kodMinHatzemach'];
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
    } else {

       
    // this.addBeePlan.degelOfOrderPlanCompleteByMashtelot = false;
    // this.addBeePlan.degelOfOrderPlanComplete = true;
    // this.addBeePlan.degelofAddBeeComplete = false;

      this.options.filters = ['id','total','misparTochnit','kodMinHatzemach',];

      return this.columns
    }
  }
}
