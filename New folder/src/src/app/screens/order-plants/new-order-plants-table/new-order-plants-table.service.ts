import { DatePipe } from '@angular/common';
import { VariableAst } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CollectSeedToDelete } from 'src/app/Models/CollectSeedToDelete';
import { FreeText } from 'src/app/Models/FreeText';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';

// import { COLLECT_SEEDS_TABLE_DATA } from 'src/app/mock_data/collect-seeds-data';
import { HttpService } from 'src/app/services/http.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { QuestionAutocompleteModel } from 'src/app/shared/components/form/models/question-autocomplete';
import {
  FormService,
  Question,
} from 'src/app/shared/components/form/services/form.service';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { NewOrderPlantsTableModel } from './new-order-plants-table.model';

@Injectable({
  providedIn: 'root',
})
export class NewOrderPlantsTableService {
  private data = [];

  public arr=[]
  private showFullTabele$:BehaviorSubject<boolean>
  private tableData$ = new BehaviorSubject<NewOrderPlantsTableModel[]>(
    null
    );
    public dataSource: TableDataSource<NewOrderPlantsTableModel>;
    private data$: BehaviorSubject<NewOrderPlantsTableModel[]>;
    
    constructor(
      ) {
 this.showFullTabele$=new BehaviorSubject<boolean>(false)
    this.tableData$ = new BehaviorSubject<NewOrderPlantsTableModel[]>(
      this.data
    );
    this.dataSource = new TableDataSource<NewOrderPlantsTableModel>(
      this.data
    );
    this.data$ = new BehaviorSubject<NewOrderPlantsTableModel[]>(
      this.data
    );
    this.dataSource.load(this.data);
    this.tableData$.next(this.data);
    this.data$.next(this.data);
  }
 
 
  public emitShowFullTable(value: boolean): void {
    this.showFullTabele$.next(value);
  }

  public getShowFullTableObs(): Observable<boolean> {
    return this.showFullTabele$.asObservable();
  }

  public emitData(data: NewOrderPlantsTableModel[]): void {
    this.data$.next(data);
  }

  public getDataObs(): Observable<NewOrderPlantsTableModel[]> {
    return this.data$.asObservable();
  }

  getTabledata(): Observable<NewOrderPlantsTableModel[]> {
    return this.tableData$.asObservable();
  }

  public get dataSubject() {
    return this.tableData$;
  }


  public enmitData(data) {
    this.tableData$.next(data);
  }


}

