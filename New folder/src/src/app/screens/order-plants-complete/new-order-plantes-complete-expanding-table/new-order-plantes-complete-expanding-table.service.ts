import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeAll, tap } from 'rxjs/operators';
import { FormOption } from 'src/app/shared/components/form/models/form-data-source.model';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { NewOrderPlantesCompleteExpandingTableModel } from './new-order-plantes-complete-expanding-table.model';



@Injectable({
  providedIn: 'root',
})
export class NewOrderPlantesCompleteExpandingTableService {
  private dataSource: TableDataSource<NewOrderPlantesCompleteExpandingTableModel>;
  showFullTable$:BehaviorSubject<boolean>

  constructor() {
    this.showFullTable$=new BehaviorSubject<boolean>(true)
  }

  public setDataSource(dataSource: TableDataSource<NewOrderPlantesCompleteExpandingTableModel>) {
    this.dataSource = dataSource;
  }
  public getDataSource() {
    return this.dataSource;
  }


  public load(data:boolean): void {
    this.showFullTable$.next(data);
  }

  public connect(): Observable<boolean> {
    return this.showFullTable$.asObservable();
  }

}