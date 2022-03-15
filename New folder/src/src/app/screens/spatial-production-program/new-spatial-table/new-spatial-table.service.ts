import { DatePipe } from '@angular/common';
import { VariableAst } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CollectSeedToDelete } from 'src/app/Models/CollectSeedToDelete';
import { FreeText } from 'src/app/Models/FreeText';
import { minHatzemachMerchavi } from 'src/app/Models/minHatzemachMerchavi';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';

// import { COLLECT_SEEDS_TABLE_DATA } from 'src/app/mock_data/collect-seeds-data';
import { HttpService } from 'src/app/services/http.service';
import { QuestionAutocompleteModel } from 'src/app/shared/components/form/models/question-autocomplete';
import {
  FormService,
  Question,
} from 'src/app/shared/components/form/services/form.service';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';

@Injectable({
  providedIn: 'root',
})
export class NewSpatialTableService {

  private data = [];
  rowThatChooseTable: any;
  private tableData$ = new BehaviorSubject<minHatzemachMerchavi[]>(null);
  public dataSource: TableDataSource<minHatzemachMerchavi>;
  listOfData: any[] = [];
  private data$: BehaviorSubject<minHatzemachMerchavi[]>;
  freeText: any;
  


  constructor(private spatialProductionProgramService: SpatialProductionProgramService ,private formService: FormService, private httpService: HttpService, private datePipe: DatePipe) {

    // this.dataSource = new TableDataSource<minHatzemachMerchavi>(this.data);
    this.tableData$ = new BehaviorSubject<minHatzemachMerchavi[]>(this.data);
    this.dataSource = new TableDataSource<minHatzemachMerchavi>(this.data);
    this.data$ = new BehaviorSubject<minHatzemachMerchavi[]>(
      this.data
    );
     
    this.dataSource.load(this.data);
    this.tableData$.next(this.data);
    this.data$.next(this.data)

  }

  public getDataWithFilters() {

    return []

  }

  public emitData(data: minHatzemachMerchavi[]): void {
    this.data$.next(data);
  }

  public getDataObs(): Observable<minHatzemachMerchavi[]> {
    return this.data$.asObservable();
  }
  // constructor(private formService: FormService) {
  //   this.tableData$ = new BehaviorSubject<minHatzemachMerchavi[]>(this.data);
  // }

  private searchObject: QuestionAutocompleteModel = {
    key: 'search',
    controlType: 'autocomplete',
    label: 'חיפוש חופשי  ',
    icon: 'search',
  };

  getTabledata(): Observable<minHatzemachMerchavi[]> {
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


  filterByDate(dateToFilter, data) {
    console.log('filter by date');
    return []

  }
  sortByDesc(sort: any) {
    console.log('sort');

    return []


  }
  DeleteSeedsCollect(rowToDelete: CollectSeedToDelete) {
    console.log('delete');
    return []

  }
  filterData(filterData: any) {
     
    this.data = this.spatialProductionProgramService.listForTableForSpatialProductionProgram;
    var data2 = []
    if (filterData.id != "" || filterData.minHatzemach != "" || filterData.kamut != ""
      || filterData.ezor != "" || filterData.kibul != "" || filterData.ribuy != ""
      || filterData.makor != "" || filterData.hearot != "") {
      if (filterData.id != "") {
        data2 = data2.concat(this.data.filter(x => x.id.toString() != "" && (x.id.toString() == filterData.id) || x.id.toString().includes(filterData.id)))
        this.data = data2;
        data2 = []
      }
      if (filterData.minHatzemach != "") {
        data2 = data2.concat(this.data.filter(x => x.minHatzemach != null && x.minHatzemach.toString() != "" && (x.minHatzemach.toString() == filterData.minHatzemach) || x.minHatzemach.toString().includes(filterData.minHatzemach)))
        this.data = data2;
        data2 = []
      }
      if (filterData.kamut != "") {
        data2 = data2.concat(this.data.filter(x => x.kamut != null && x.kamut.toString() != "" && (x.kamut.toString() == filterData.kamut) || x.kamut.toString().includes(filterData.kamut)))
        this.data = data2;
        data2 = []
      }
      if (filterData.ezor != "") {
        data2 = data2.concat(this.data.filter(x => x.ezor != null && x.ezor.toString() != "" && (x.ezor.toString() == filterData.ezor) || x.ezor.toString().includes(filterData.ezor)))
        this.data = data2;
        data2 = []
      }
      if (filterData.kibul != "") {
        data2 = data2.concat(this.data.filter(x => x.kibul != null && x.kibul.toString() != "" && (x.kibul.toString() == filterData.kibul) || x.kibul.toString().includes(filterData.kibul)))
        this.data = data2;
        data2 = []
      }
      if (filterData.ribuy != "") {
        data2 = data2.concat(this.data.filter(x => x.ribuy != null && x.ribuy.toString() != "" && (x.ribuy.toString() == filterData.ribuy) || x.ribuy.toString().includes(filterData.ribuy)))
        this.data = data2;
        data2 = []
      }
      if (filterData.makor != "") {
        data2 = data2.concat(this.data.filter(x => x.makor != null && x.makor.toString() != "" && (x.makor.toString() == filterData.makor) || x.makor.toString().includes(filterData.makor)))
        this.data = data2;
        data2 = []
      }
      if (filterData.hearot != "") {
        data2 = data2.concat(this.data.filter(x => x.hearot != null && x.hearot.toString() != "" && (x.hearot.toString() == filterData.hearot) || x.hearot.toString().includes(filterData.hearot)))
        this.data = data2;
        data2 = []
      }
    }
    else {//no filters
      this.data = this.data
    }
    return this.data;
  }

}


