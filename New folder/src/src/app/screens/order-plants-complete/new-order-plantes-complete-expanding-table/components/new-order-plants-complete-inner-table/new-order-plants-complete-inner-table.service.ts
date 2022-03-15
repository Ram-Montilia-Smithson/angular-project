import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { NEW_ORDER_PLANTS_COMPLETE_INNER_TABLE } from 'src/app/mock_data/order-plantes-complete-data';
// import { COLLECT_SEEDS_TABLE_DATA, TABLE_MOCK_DATA_INVENTORY } from 'src/app/mock_data/collect-seeds-data';
import { QuestionAutocompleteModel } from 'src/app/shared/components/form/models/question-autocomplete';
import {
  FormService,
  Question,
} from 'src/app/shared/components/form/services/form.service';
import { NewOrderPlantsCompleteInnerTableModel } from './new-order-plants-complete-inner-table.model';

@Injectable({
  providedIn: 'root',
})
export class NewOrderPlantsCompleteInnerTableService {
  private data = [];
  private tableData$ = new BehaviorSubject<NewOrderPlantsCompleteInnerTableModel[]>(null);

  constructor(private formService: FormService) {
    this.tableData$ = new BehaviorSubject<NewOrderPlantsCompleteInnerTableModel[]>(this.data);
  }

  getTabledata(): Observable<NewOrderPlantsCompleteInnerTableModel[]> {
    return this.tableData$.asObservable();
  }

  public get dataSubject() {
    return this.tableData$;
  }

  public enmitData(data) {
    this.tableData$.next(data);
  }

 
}
