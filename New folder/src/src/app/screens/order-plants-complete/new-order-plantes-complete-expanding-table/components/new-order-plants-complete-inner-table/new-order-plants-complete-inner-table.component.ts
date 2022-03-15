import { Component, Input, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import {
  RowsState,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { NewOrderPlantsCompleteService } from '../../../order-plants-complete.service';
import { NewOrderPlantesCompleteExpandingTableService } from '../../new-order-plantes-complete-expanding-table.service';
import { NewOrderPlantsCompleteInnerTableModel } from './new-order-plants-complete-inner-table.model';
import { NewOrderPlantsCompleteInnerTableService } from './new-order-plants-complete-inner-table.service';

@Component({
  selector: 'app-new-order-plants-complete-inner-table',
  templateUrl: './new-order-plants-complete-inner-table.component.html',
  styleUrls: ['./new-order-plants-complete-inner-table.component.scss'],
})
export class NewOrderPlantsCompleteInnerTableComponent implements OnInit {
  @Input() showFullTable: boolean = true;
  showFullTable$:Observable<boolean>
  public data$: Observable<NewOrderPlantsCompleteInnerTableModel[]>;
  public rowsState$: BehaviorSubject<
    RowsState<NewOrderPlantsCompleteInnerTableModel>
  >;
  public model: NewOrderPlantsCompleteInnerTableModel =
    new NewOrderPlantsCompleteInnerTableModel();
  public columns$: Observable<
    ColumnModel<NewOrderPlantsCompleteInnerTableModel>[]
  >;
  @Input() id;
  data: any[]=[];
  constructor(
    private newOrderPlantsCompleteInnerTableService: NewOrderPlantsCompleteInnerTableService,
    private newOrderPlantesCompleteExpandingTableService: NewOrderPlantesCompleteExpandingTableService,
    private newOrderPlantsCompleteService:NewOrderPlantsCompleteService,
    private OrderPlantsCompleteService: OrderPlantsCompleteService,
    private AddProductionProcessService: AddProductionProcessService,
    private spatialProductionProgramService: SpatialProductionProgramService,

    private addBeePlanService: AddBeePlanService
  ) {}

  public columns: ColumnModel<NewOrderPlantsCompleteInnerTableModel>[] = [
    new ColumnModel({ label: 'משתלה' }),
    new ColumnModel({ label: 'כמות' }),
    new ColumnModel({ label: 'לקוח' }),
    new ColumnModel({ label: 'טלפון' }),
    new ColumnModel({ label: 'כתובת' }),
    new ColumnModel({ label: 'דוא"ל' }),
  ];

  ngOnInit(): void {
    this.TzmachimByMashtelot({misparTochnit: this.AddProductionProcessService.addTochnitYezur.id ,id:this.id.item.id})
    this.data$ = this.newOrderPlantsCompleteInnerTableService.getTabledata();
    this.data$.subscribe((data) => console.log(data));
this.newOrderPlantesCompleteExpandingTableService.connect().subscribe(value=>{
  this.setRowsState();
  if (!this.showFullTable) {
    this.columns$ = of(this.columns);
    this.options = { pagination: this.pagination, filters: ['id'] };
  }else{
    
    this.columns$ = of(this.columns.splice(0,1));
    this.options = { pagination: this.pagination, filters: ['id','mashtela'] };
  }
})
 
  }
  TzmachimByMashtelot(id) {
    try {
       
      this.OrderPlantsCompleteService.getTzmachimByMashtelot(
        id.misparTochnit,
        id.id
      ).subscribe((res) => {
        // let address: ""
        /// email: ""
        // gilat: 400
        // golani: 100
        // id: 6563
        /// kamut: 600
        // kodMinHatzemach: 2
        /// lakoach: ""
        // minHatzemach: "אקליפטוס טורלי"
        /// phone: "666"
        // total: 600
        if (this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot) {
          this.data = [];
          res.forEach((element) => {
            let object = Object.assign({
              kamut: element.kamut,
              lakoach: element.lakoach,
              phone: element.phone,
              address: element.address,
              email: element.email,
              mashtela:element.mashtela
            });
            this.data.push(object);
          });
          this.newOrderPlantsCompleteInnerTableService.enmitData(this.data)

        } else if (this.addBeePlanService.degelOfOrderPlanComplete) {
          this.data = [];
          res.forEach((element) => {
            let object = Object.assign({
              kamut: element.kamut,
              lakoach: element.lakoach,
              phone: element.phone,
              address: element.address,
              email: element.email,
            });
            this.data.push(object);
          });
          this.newOrderPlantsCompleteInnerTableService.enmitData(this.data)

        }
      });
      // let expdandableTableTablesObj=this.arraySorting(res.mineTzemach);//deleteId
      // expdandableTableTablesObj=this.arrayDeleteMisparTochnit(expdandableTableTablesObj);
      // expdandableTableTablesObj=this.arrayKodMinHatzemach(expdandableTableTablesObj);
      // expdandableTableTablesObj=this.arrayAshtaol(expdandableTableTablesObj);
      // expdandableTableTablesObj=this.arrayGilat(expdandableTableTablesObj);
      // expdandableTableTablesObj=this.arrayGolani(expdandableTableTablesObj);
      // expdandableTableTablesObj=this.arrayTotal(expdandableTableTablesObj);
      // expdandableTableTablesObj=this.arrayMinHatzemach(expdandableTableTablesObj);
      //  this.expdandableTableTablesObj.data = expdandableTableTablesObj;
      // })
    } catch (e) {
      console.error(e);
    }
  }

  private setRowsState() {
    this.rowsState$ = new BehaviorSubject<
      RowsState<NewOrderPlantsCompleteInnerTableModel>
    >({
      event: 'default',
    });
  }

  private pagination: PaginationInstance = {
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<NewOrderPlantsCompleteInnerTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };
}
