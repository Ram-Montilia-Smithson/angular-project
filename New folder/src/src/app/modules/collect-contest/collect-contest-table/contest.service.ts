import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { CONTEST_TABLE_DATA } from "src/app/mock_data/collect-contest-data";
import { queryParm } from 'src/app/Models/queryParm ';
import { HttpService } from 'src/app/services/http.service';
import { QuestionAutocompleteModel } from "src/app/shared/components/form/models/question-autocomplete";
import { FormService, Question } from "src/app/shared/components/form/services/form.service";
import { ContestTableModel } from "./collect-contest.model";

@Injectable({
  providedIn: 'root'
})
export class ContestService {
public header:any;
  private data = CONTEST_TABLE_DATA;
  private tableData$ = new BehaviorSubject<ContestTableModel[]>(null);
  freeText: queryParm;
  public rowThatChooseInTable: any
  constructor(private formService: FormService, private httpService: HttpService) {

    this.tableData$ = new BehaviorSubject<ContestTableModel[]>(this.data);

  }
  private searchObject: QuestionAutocompleteModel = {
    key: 'search',
    controlType: 'autocomplete',
    label: 'חיפוש חופשי  ',
    icon: 'search',
  };

  getTabledata(): Observable<ContestTableModel[]> {
    debugger
    return this.tableData$.asObservable();
  }
  getTableDataFromDB(freeText) {
debugger
    this.freeText = new queryParm();
    this.freeText.queryParm=freeText
    return this.httpService.post('isufZraim/', 'GetSubTendersList', this.freeText).subscribe(x => {
      let listOfCollectContest = []
      x.forEach(element => {
        let object = {
          globalID:element.globalID,
          tenderID: element.tenderID,
          subTenderYear: element.subTenderYear,
          subTenderID: element.subTenderID,
          subTenderName: element.subTenderName,
          stDistrictName: element.stDistrictName,
          stRegionName: element.stRegionName,
          status: element.stStageStatus.stStageStatus,
        }
        listOfCollectContest.push(object);
      });
      this.data=listOfCollectContest
      this.tableData$.next(listOfCollectContest);
    },

    )
  }
public GetSubTenderDetail(objectID:string){
  let object=  {globalID:objectID };
  debugger
 return  this.httpService.post('isufZraim/','GetSubTenderDetail', object);
}
  public get dataSubject() {
    return this.tableData$;
  }

  public enmitData(data) {
    this.tableData$.next(data);
  }

  public setSearchControl(): { control: FormControl; question: Question } {
    const question = this.formService.setQuestion(this.searchObject);
    const control = this.formService.getFieldControl(question);
    return { control, question };
  }
  // sortByAsc(sort: any) {
  //   if (sort.column.columnDef == "subTenderYear" || sort.column.columnDef == "subTenderID") {
  //     this.data = this.data.sort((a1, a2) => {
  //       return Number(a1[sort.column.columnDef]) - Number(a2[sort.column.columnDef])
  //     })
  //   }
  //   else {
  //     this.data = this.data.sort((a, b) => { return a[sort.column.columnDef] > b[sort.column.columnDef] ? 1 : a[sort.column.columnDef] < b[sort.column.columnDef] ? -1 : 0 });
  //   }
  //   this.tableData$.next(this.data);

  // }
  // sortByDesc(sort: any) {
  //   if (sort.column.columnDef == "contestYear" || sort.column.columnDef == "contestNumber") {
  //     this.data = this.data.sort((a1, a2) => {
  //       return Number(a2[sort.column.columnDef]) - Number(a1[sort.column.columnDef])
  //     })
  //   }
  //   else {
  //     this.data = this.data.sort((a, b) => (a[sort.column.columnDef] > b[sort.column.columnDef] ? -1 : a[sort.column.columnDef] < b[sort.column.columnDef] ? 1 : 0));
  //   }
  //   // this.dataSource.load(this.data);
  //   this.tableData$.next(this.data);
  //   // this.data$.next(this.data)

  // }


  sortByAsc(sort: any) {
     
    if (sort.column.columnDef == "subTenderYear" || sort.column.columnDef == "subTenderID") {
      this.data = this.data.sort((a1, a2) => {
        return Number(a1[sort.column.columnDef]) - Number(a2[sort.column.columnDef])
      })
    }
    else {
      this.data = this.data.sort((a, b) => { return a[sort.column.columnDef] > b[sort.column.columnDef] ? 1 : a[sort.column.columnDef] < b[sort.column.columnDef] ? -1 : 0 });
    }
    // this.dataSource.load(this.data);
    // this.tableData$.next(this.data);
    // this.data$.next(this.data)
    return this.data
  }


  sortByDesc(sort: any) {
    if (sort.column.columnDef == "contestYear" || sort.column.columnDef == "contestNumber") {
      this.data = this.data.sort((a1, a2) => {
        return Number(a2[sort.column.columnDef]) - Number(a1[sort.column.columnDef])
      })
    }
    else {
      this.data = this.data.sort((a, b) => (a[sort.column.columnDef] > b[sort.column.columnDef] ? -1 : a[sort.column.columnDef] < b[sort.column.columnDef] ? 1 : 0));
    }

    // this.dataSource.load(this.data);
    // this.tableData$.next(this.data);
    // this.data$.next(this.data)
    return this.data

  }
}