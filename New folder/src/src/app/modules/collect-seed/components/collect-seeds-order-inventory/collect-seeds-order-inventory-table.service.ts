import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
// import { COLLECT_SEEDS_TABLE_DATA, TABLE_MOCK_DATA_INVENTORY } from 'src/app/mock_data/collect-seeds-data';
import { QuestionAutocompleteModel } from 'src/app/shared/components/form/models/question-autocomplete';
import {
  FormService,
  Question,
} from 'src/app/shared/components/form/services/form.service';
import { CollectSeedsOrderInventoryTableModel } from './collect-seeds-order-inventory-table.model';

@Injectable({
  providedIn: 'root',
})
export class CollectSeedsOrderInventoryTableService {
  private data = [];
  private tableData$ = new BehaviorSubject<CollectSeedsOrderInventoryTableModel[]>(null);

  constructor(private formService: FormService) {
    this.tableData$ = new BehaviorSubject<CollectSeedsOrderInventoryTableModel[]>(this.data);
  }

  getTabledata(): Observable<CollectSeedsOrderInventoryTableModel[]> {
    return this.tableData$.asObservable();
  }

  public get dataSubject() {
    return this.tableData$;
  }

  public enmitData(data) {
    this.tableData$.next(data);
  }

 
}
