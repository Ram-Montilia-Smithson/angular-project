import { DatePipe } from '@angular/common';
import { VariableAst } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CollectSeedToDelete } from 'src/app/Models/CollectSeedToDelete';
import { FreeText } from 'src/app/Models/FreeText';
// import { COLLECT_SEEDS_TABLE_DATA } from 'src/app/mock_data/collect-seeds-data';
import { HttpService } from 'src/app/services/http.service';
import { QuestionAutocompleteModel } from 'src/app/shared/components/form/models/question-autocomplete';
import {
  FormService,
  Question,
} from 'src/app/shared/components/form/services/form.service';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { CollectSeedsModel } from './collect-seeds.model';

@Injectable({
  providedIn: 'root',
})
export class CollectSeedsService {
  private data = [];
  rowThatChooseTable: any;
  private tableData$ = new BehaviorSubject<CollectSeedsModel[]>(null);
  public dataSource: TableDataSource<CollectSeedsModel>;
  listOfData: any[] = [];
  // private data = COLLECT_SEEDS_TABLE_DATA;
  // private tableData$ = new BehaviorSubject<CollectSeedsModel[]>(null);
  // public dataSource: TableDataSource<CollectSeedsModel>;
  // private data: CollectSeedsModel[] = COLLECT_SEEDS_TABLE_DATA;
  private data$: BehaviorSubject<CollectSeedsModel[]>;
  freeText: any;


  constructor(private formService: FormService, private httpService: HttpService, private datePipe: DatePipe) {
     
    // this.dataSource = new TableDataSource<CollectSeedsModel>(this.data);
    this.tableData$ = new BehaviorSubject<CollectSeedsModel[]>(this.data);
    this.dataSource = new TableDataSource<CollectSeedsModel>(this.data);
    this.freeText = new FreeText();
    this.httpService.post('isufZraim/', 'GetSeedsCollects', this.freeText).subscribe(res => {

      this.data = res
      this.listOfData = res
      // this.dataSource = new TableDataSource<CollectSeedsModel>(this.data);
      this.dataSource.load(res);
      this.tableData$.next(res);
      this.data$.next(res)
    });
    this.data$ = new BehaviorSubject<CollectSeedsModel[]>(
      this.data
    );
  }

  public getDataWithFilters() {

    this.httpService.post('isufZraim/', 'GetSeedsCollects', this.freeText).subscribe(res => {
      return res

    });

  }

  public emitData(data: CollectSeedsModel[]): void {
    this.data$.next(data);
  }

  public getDataObs(): Observable<CollectSeedsModel[]> {
    return this.data$.asObservable();
  }
  // constructor(private formService: FormService) {
  //   this.tableData$ = new BehaviorSubject<CollectSeedsModel[]>(this.data);
  // }

  private searchObject: QuestionAutocompleteModel = {
    key: 'search',
    controlType: 'autocomplete',
    label: 'חיפוש חופשי  ',
    icon: 'search',
  };

  getTabledata(): Observable<CollectSeedsModel[]> {
    return this.tableData$.asObservable();
  }

  public get dataSubject() {
    return this.tableData$;
  }
  public AutoComplete(value: string) {
    this.freeText = new FreeText();
    this.freeText.freeText = value
    this.httpService.post('isufZraim/', 'GetSeedsCollects', this.freeText).subscribe(res => {
      return res;
      // this.dataSource.load(res);
      // this.tableData$.next(res);
      // this.data$.next(res)

    })

  }

  public enmitData(data) {
    this.tableData$.next(data);
  }

  public setSearchControl(): { control: FormControl; question: Question } {
    const question = this.formService.setQuestion(this.searchObject);
    const control = this.formService.getFieldControl(question);
    return { control, question };
  }
  filterByDate(dateToFilter, data) {
    var data2 = [];
    if (dateToFilter.type == "from") {
      data2 = data.filter(function (x) {
        return Date.parse(x[dateToFilter.column]) >= dateToFilter.date
      });
    }
    else if (dateToFilter.type == "to") {
      data2 = data.filter(function (x) {
        //substracting a day in milliseconds
        return Date.parse(x[dateToFilter.column]) - 86400000 <= dateToFilter.date
      });
    }
    return data2;
  }
  
  sortByAsc(sort: any) {
     
    if (sort.column.columnDef == "objectid" || sort.column.columnDef == "seedsKg") {
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
    if (sort.column.columnDef == "objectid" || sort.column.columnDef == "seedsKg") {
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
  filterData(filterData: any) {
     
    this.data = this.listOfData;
    var data2 = []
    if (filterData.objectid != "" || filterData.hebNic.length != 0 || filterData.site.length != 0
      || filterData.collectorName.length != 0 || filterData.seedsKg != "" || filterData.status.length != 0
      || filterData.lastPic != null) {
      if (filterData.hebNic.length != 0) {
        for (let i = 0; i < filterData.hebNic.length; i++) {
          data2 = data2.concat(this.data.filter(x => x.hebNic != null && x.hebNic != "" && (x.hebNic == filterData.hebNic[i]))) //|| x.hebNic.includes(filterData.hebNic[i])
        }
        this.data = data2;
        data2 = []
      }
      if (filterData.site.length != 0) {
        for (let i = 0; i < filterData.site.length; i++) {
          data2 = data2.concat(this.data.filter(x => x.site != null && x.site != "" && (x.site == filterData.site[i]))) //|| x.site.includes(filterData.hebNic[i])
        }
        this.data = data2;
        data2 = []
      }
      if (filterData.collectorName.length != 0) {
        for (let i = 0; i < filterData.collectorName.length; i++) {
          data2 = data2.concat(this.data.filter(x => x.collectorName != null && x.collectorName != "" && (x.collectorName == filterData.collectorName[i]))) //|| x.collector.includes(filterData.hebNic[i])
        }
        this.data = data2;
        data2 = []
      }
      if (filterData.status.length != 0) {
        for (let i = 0; i < filterData.status.length; i++) {
          data2 = data2.concat(this.data.filter(x => x.status.statusName != null && x.status.statusName != "" && (x.status.statusName == filterData.status[i]))) //|| x.status.includes(filterData.hebNic[i])
        }
        this.data = data2;
        data2 = []
      }
      if (filterData.objectid != "") {
        data2 = data2.concat(this.data.filter(x => x.objectid.toString() != "" && (x.objectid.toString() == filterData.objectid) || x.objectid.toString().includes(filterData.objectid)))
        this.data = data2;
        data2 = []
      }
      if (filterData.seedsKg != "") {
        data2 = data2.concat(this.data.filter(x => x.seedsKg != null && x.seedsKg.toString() != "" && (x.seedsKg.toString() == filterData.seedsKg) || x.seedsKg.toString().includes(filterData.seedsKg)))
        this.data = data2;
        data2 = []
      }
      if (filterData.lastPic != null) {
        data2 = this.filterByDate(filterData.lastPic, this.data)
        this.data = data2;
        data2 = []
      }
      if (filterData.diaryDate != null) {
        data2 = this.filterByDate(filterData.diaryDate, this.data)
        this.data = data2;
        data2 = []
      }
    }
    else {//no filters
      this.data = this.data
    }
    // else if (filterData.column.columnDef == "objectid" || filterData.column.columnDef == "seedsKg")
    //   this.data = this.data.filter(x => x[filterData.column.columnDef] != "" && (x[filterData.column.columnDef] == Number(filterData.value) || x[filterData.column.columnDef].toString().includes(filterData.value)))
    // else {
    //   this.data = this.data.filter(x => x[filterData.column.columnDef] != "" && (x[filterData.column.columnDef] == filterData.value || x[filterData.column.columnDef].includes(filterData.value)))
    // }
    return this.data;
    // this.dataSource.load(this.data);
    // this.tableData$.next(this.data);
    
  }
  DeleteSeedsCollect(rowToDelete:CollectSeedToDelete){
     
   return this.httpService.post('isufZraim/','DeleteSeedsCollect',rowToDelete)
 
  }
}

