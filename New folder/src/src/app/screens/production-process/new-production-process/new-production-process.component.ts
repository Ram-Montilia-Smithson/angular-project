import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { map, Observable } from 'rxjs';
import { NEW_PRODUCTION_PROCEES_TABLE_DATA1 } from 'src/app/mock_data/production-process';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  ColumnState,
  RowsState,
  Table,
  TableEvent,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { NewProductionProcessTableModel } from './new-production-process.model';
import { NewProductionProcessTableService } from './new-production-process.service';

@Component({
  selector: 'app-new-production-process',
  templateUrl: './new-production-process.component.html',
  styleUrls: ['./new-production-process.component.scss'],
})
export class NewProductionProcessComponent
  implements OnInit, Table<NewProductionProcessTableModel>
{
  public dataSource: TableDataSource<NewProductionProcessTableModel>;
  //table data
  public data$: Observable<NewProductionProcessTableModel[]>;
  public columns$: Observable<ColumnModel<NewProductionProcessTableModel>[]>;
  public rowsState$: Observable<RowsState<NewProductionProcessTableModel>>;

  public columnsState$: Observable<ColumnState<NewProductionProcessTableModel>>;

  public model: NewProductionProcessTableModel =
    new NewProductionProcessTableModel();

  private pagination: PaginationInstance = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 10,
  };

  public events$: Observable<TableEvent>;

  constructor(
    private addProductionProcessService:AddProductionProcessService,
    private newProductionProcessTableService: NewProductionProcessTableService,
    private AddProductionProcess: AddProductionProcessService,
    private route: Router
  ) {}

  public columns: ColumnModel<NewProductionProcessTableModel>[] = [
    new ColumnModel({
      label: 'מין הצמח',
    }),
    new ColumnModel({
      label: 'עונה',
    }),
    new ColumnModel({
      label: 'משתלה',
    }),
    new ColumnModel({
      label: 'סטטוס',
    }),
    new ColumnModel({
      label: 'תאריך אחרון לעדכון',
    }),
  ];
  public options: TableOptions<NewProductionProcessTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };

  ngOnInit(): void {
    if(sessionStorage.getItem('page')!=undefined &&sessionStorage.getItem('page')!=null  ){
      let num=Number(sessionStorage.getItem('page'));
   num= Math.floor(num);
      this.pagination.currentPage=num;
    }
    this.dataSource = new TableDataSource<NewProductionProcessTableModel>();
    this.data$ = this.setData();
    this.columns$ = this.dataSource.connectColumns(this.columns);
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.events$ = this.dataSource.getEvents$();
    this.newProductionProcessTableService.emitNewData(
      NEW_PRODUCTION_PROCEES_TABLE_DATA1
    );
  }

  public setData() {
    return this.newProductionProcessTableService.dataAsObs();
  }

  rowClicked(row){
   this.onEditState(row)
    
  }

  public onEditState(row: RowModel<NewProductionProcessTableModel>) {
   let index= this.addProductionProcessService.listForTablesprocessForm.findIndex(x=>x.id==row.item.id);
   console.log(index);
   console.log(this.pagination.currentPage+ (index/this.pagination.itemsPerPage));
   sessionStorage.setItem("page",String(1+ (index/this.pagination.itemsPerPage)))
    this.AddProductionProcess.TochnitYetzurMerchav = [];
    this.AddProductionProcess.TochnitYetzurMerchav.id = row.item.id;
    this.AddProductionProcess.TochnitYetzurMerchav.mashtela = row.item.mashtela;
    this.AddProductionProcess.TochnitYetzurMerchav.modifiedDate =
      row.item.modifiedDate;
    this.AddProductionProcess.TochnitYetzurMerchav.onatNetia =
      row.item.onatNetia;
    this.AddProductionProcess.TochnitYetzurMerchav.status = row.item.status;
    this.AddProductionProcess.TochnitYetzurMerchav.sugTochnit =
      row.item.sugTochnit;
    if (row.item.sugTochnit == 'מרחבית') {
      this.AddProductionProcess.addTochnitYezur = row.item;

      this.route.navigate(['/forestry/spatial-production-program']);
    }
    if (row.item.sugTochnit == 'יער משקי') {
      this.AddProductionProcess.addTochnitYezur = row.item;

      this.route.navigate(['/forestry/order-plants-complete']);
    }
    if (row.item.sugTochnit == 'מרעה דבורים') {
      this.AddProductionProcess.addTochnitYezur = row.item;

      this.route.navigate(['/forestry/add-bee-plan-complete']);
    }
  }

  public onDeleteState(options: {
    row: RowModel<NewProductionProcessTableModel>;
    event: string;
  }) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
      return this.AddProductionProcess.deleteTochnitYetzur(
        options.row.item.id
      ).subscribe((res) => {
        if (res) {
       const index=  this.addProductionProcessService.listForTablesprocessForm.findIndex((x) => x.id == options.row.item.id)
      const newData= this.addProductionProcessService.listForTablesprocessForm.filter(item=>item.id !== options.row.item.id);
      console.log(newData);
      console.log(res);
      this.addProductionProcessService.listForTablesprocessForm=newData
this.newProductionProcessTableService.emitNewData(newData);
 
        }
      });
    } else {
      // this.newProductionProcessTableService.emitNewData([]);
      return [];
    }
  }
}
// let index = data.findIndex((x) => x.id == options.row.item.id);
// data.splice(index, 1);
// this.newProductionProcessTableService.emitNewData(data);