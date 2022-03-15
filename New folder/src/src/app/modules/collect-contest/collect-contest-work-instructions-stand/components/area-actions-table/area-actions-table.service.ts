import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { AREA_ACTIONS_TABLE_MOCK, CONTEST_TABLE_DATA } from "src/app/mock_data/collect-contest-data";
import { QuestionAutocompleteModel } from "src/app/shared/components/form/models/question-autocomplete";
import { FormService, Question } from "src/app/shared/components/form/services/form.service";
import { AreaActionsModel } from './area-actions-table.model';
@Injectable({
    providedIn: 'root'
  })
  export class AreaActionsTableService {
  
    private data = AREA_ACTIONS_TABLE_MOCK;
    private tableData$ = new BehaviorSubject<AreaActionsModel[]>(null);
  
    constructor(private formService: FormService) { 
      this.tableData$ = new BehaviorSubject<AreaActionsModel[]>(this.data);
    }
  
   
  
    getTabledata(): Observable<AreaActionsModel[]>{
      return this.tableData$.asObservable();
    }
  
    public get dataSubject() {
      return this.tableData$;
    }
  
    public emitData(data) {
      this.tableData$.next(data);
    }
  

  }