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
import { NewOrderCompleteTableAllModel } from './new-order-plantes-complete-table-all.model';

@Injectable({
  providedIn: 'root',
})
export class NewOrderPlantesTableAllService {
  private data = [];
  rowThatChooseTable: any;
  private tableData$ = new BehaviorSubject<NewOrderCompleteTableAllModel[]>(
    null
  );
  public dataSource: TableDataSource<NewOrderCompleteTableAllModel>;
  listOfData: any[] = [];
  private data$: BehaviorSubject<NewOrderCompleteTableAllModel[]>;
  freeText: any;
  plantTypes: any;

  constructor(
    private formService: FormService,
    private httpService: HttpService,
    private datePipe: DatePipe,
    private orderPlantsCompleteService:OrderPlantsCompleteService,
    private AddProductionProcessService:AddProductionProcessService
    ,private orderPlantsService:OrderPlantsService,
    private addBeePlan:AddBeePlanService
  ) {
    this.tableData$ = new BehaviorSubject<NewOrderCompleteTableAllModel[]>(
      this.data
    );
    this.dataSource = new TableDataSource<NewOrderCompleteTableAllModel>(
      this.data
    );
    this.data$ = new BehaviorSubject<NewOrderCompleteTableAllModel[]>(
      this.data
    );
    this.dataSource.load(this.data);
    this.tableData$.next(this.data);
    this.data$.next(this.data);
  }
 

  // try {
  //   if(this.isFirstTable)
  //   if(this.anotherRegularTableFormArray==null)
  //   this.anotherRegularTableFormArray=this.regularTableFormArray;
  //   this.regularTableFormArray=this.anotherRegularTableFormArray
   
    //   this.treeTypes = treeTypes;
    // this.addBeePlanService.degelOfOrderPlanComplete=true;
    // this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot=false;
    // this.addBeePlanService.degelofAddBeeComplete=false;
    //   this.OrderPlantsCompleteService.treeTypes=this.treeTypes;
      // this.treeTypes[0]["count"] = res.machtaniyim;
      // this.treeTypes[1]["count"] = res.choreshTivi;
      // this.treeTypes[2]["count"] = res.ekaliptus;
      // this.treeTypes[3]["count"] = res.shitim;
      // this.treeTypes[4]["count"] = res.atzeyNoy;
      // this.treeTypes[5]["count"] = res.total;
      // this.regularTableDataArray = this.arraySorting(res.mineTzemach);
      // //thos for kamut
      // this.regularTableDataArray = this.arrayDeleteKamut(this.regularTableDataArray);
      // this.regularTableDataArray = this.arrayKodMinHatzemach(this.regularTableDataArray);

      // this.regularTableDataArray = this.arrayDeleteMisparTochnit(this.regularTableDataArray);
      // this.handleTableArr(false);
      // this.status = res.status;
      // this.onatNetia = res.onatNetia;
      // this.child.updateStatus();
//     },
//     err=>{alert("אין נתונים להצגה")}
//     )
// }
  public getDataWithFilters() {
    return [];
  }

  public emitData(data: NewOrderCompleteTableAllModel[]): void {
    this.data$.next(data);
  }

  public getDataObs(): Observable<NewOrderCompleteTableAllModel[]> {
    return this.data$.asObservable();
  }
  // constructor(private formService: FormService) {
  //   this.tableData$ = new BehaviorSubject<NewOrderCompleteTableAllModel[]>(this.data);
  // }

  private searchObject: QuestionAutocompleteModel = {
    key: 'search',
    controlType: 'autocomplete',
    label: 'חיפוש חופשי  ',
    icon: 'search',
  };

  getTabledata(): Observable<NewOrderCompleteTableAllModel[]> {
    return this.tableData$.asObservable();
  }

  public get dataSubject() {
    return this.tableData$;
  }

  public AutoComplete(value: string) {
    this.freeText = new FreeText();
    this.freeText.freeText = value;
    this.httpService
      .post('isufZraim/', 'GetSeedsCollects', this.freeText)
      .subscribe((res) => {
        return res;
      });
  }

public editData(row:any,allData,data:any[]){
    const newTotal= +row.form.formGroup.value.ashtaol + +row.form.formGroup.value.golani + +row.form.formGroup.value.gilat
    let index=data.findIndex(x=>x.id==row.item.id);
    if( +row.form.formGroup.value.ashtaol <0 ||+row.form.formGroup.value.golani <0||+row.form.formGroup.value.gilat<0 )
    return alert("לא ניתן להכניס כמויות מתחת לאפס");

    if(+newTotal != +row.item.kamut){
      return alert("יש לוודא שכמות העצים החדשה שווה לכמות העצים הכללית")
    }
     
     if (this.addBeePlan.degelOfOrderPlanComplete == true) {
      let objectOfMinHatzemach = Object.assign({
        address: row.item.address ? row.item.address : " ",
        ashtaol:Number( row.form.formGroup.value.ashtaol),
        email: row.item.email ?row.item.email : " ",
        gilat: Number(row.form.formGroup.value.gilat) ,
        golani:Number(row.form.formGroup.value.golani ),
        lakoach:  row.item.lakoach ?  row.item.lakoach : " ",
        kodminHatzemach: row.item.kodMinHatzemach ? row.item.kodMinHatzemach : 0,
        // kodminHatzemach:allData.tzmachim.find(x=>x.name== row.item.minHatzemach).code,
        minHatzemach:row.item.minHatzemach,// this.form.value.minHatzemach,
        phone: row.item.phone ?  row.item.phone : " ",
        kamut: Number(row.form.formGroup.value.ashtaol) + Number(row.form.formGroup.value.golani) + Number(row.form.formGroup.value.gilat),
        id: row.item.id,
      })
      return this.orderPlantsService.saveMinHatzemachYaarMishki(objectOfMinHatzemach).subscribe(res => {
        try{
        if (res) {
        //  data[index]={...objectOfMinHatzemach}
          data[index].ashtaol= objectOfMinHatzemach.ashtaol
          data[index].golani= objectOfMinHatzemach .golani
          data[index].gilat=  objectOfMinHatzemach.gilat
          data[index].total=data[index].kamut
          data[index].misparTochnit=this.AddProductionProcessService.addTochnitYezur.id
         this.dataSource.load(data);
  
        }
      }
        catch(e){

        }
        })
      }
//           this.form.value.minHatzemach=objectOfMinHatzemach.minHatzemach
//           this.form.value.total = objectOfMinHatzemach.kamut;
//           this.tableDataArray[this.editRow] = {
//             ...this.form.value,
//             controllers: true,
//           };
          
//           this.tableDataToShow = this.tableDataArray
//             .map((el) => Object.assign({}, el))
//             .slice(
//               this.currentPage * this.itemsPerPage,
//               this.currentPage * this.itemsPerPage + 8
//             );
            
//             this.form.reset();
//             this.editRow = -1;
//         }
      
//       if(res.errors != null ){
//         if(res.errors.title != null){
//           alert(res.errors.title);

//         }
//         else{
//           alert("תקלה במערכת, נא לנסות שנית")
        
//         }
//       }
//     }
//     catch(e){
//     }
//   },
//   (error) => { 
//     if(error.error != null ){
//       if(error.error.title != null){
//         alert(error.error.title);
//       }
//       else{
//         alert("תקלה במערכת, נא לנסות שנית")
      
//       }
//     }                            //Error callback
  
  
//   }) 
//     }
    else if (this.addBeePlan.degelOfOrderPlanCompleteByMashtelot == true) {
      let objectOfMinHatzemachByMashtelot = Object.assign({
        tzemach: row.item.minHatzemach,
        ashtaol:Number( row.form.formGroup.value.ashtaol),
        golani:Number(row.form.formGroup.value.golani),
        gilat: Number( row.form.formGroup.value.gilat),
        kamut: Number(row.form.formGroup.value.ashtaol) + Number( row.form.formGroup.value.golani) + Number(row.form.formGroup.value.gilat),
        id: row.item.id
      })
      return this.orderPlantsCompleteService.saveMinHatzemachMashtelaYaarMishki(objectOfMinHatzemachByMashtelot).subscribe(res => {
        
        try{
        if (res) {
          data[index].ashtaol= objectOfMinHatzemachByMashtelot.ashtaol
          data[index].golani= objectOfMinHatzemachByMashtelot .golani
          data[index].gilat=  objectOfMinHatzemachByMashtelot.gilat
          data[index].total=data[index].kamut
          data[index].misparTochnit=this.AddProductionProcessService.addTochnitYezur.id
         this.dataSource.load(data);
        }
        //  let objectOfMinHatzemach = Object.assign({ashtaolFirst:   row[index] .ashtaol, ashtaolNow:objectOfMinHatzemachByMashtelot. ashtaol,golaniFirst:[this.editRow] .golani,golaniNow:objectOfMinHatzemachByMashtelot.golani,gilatFirst:this.tableDataArray[this.editRow] .gilat,gilatNow:objectOfMinHatzemachByMashtelot.gilat,kamutFirst:this.tableDataArray[this.editRow] .kamut,kamutNow:objectOfMinHatzemachByMashtelot.kamut})

        //   this.form.value.kamut = objectOfMinHatzemachByMashtelot.kamut;
        //   data[index] = Object.assign({
        //     kamut: objectOfMinHatzemachByMashtelot.kamut,
        //     ashtaol: objectOfMinHatzemachByMashtelot.ashtaol,
        //     gilat: objectOfMinHatzemachByMashtelot.gilat,
        //     golani: objectOfMinHatzemachByMashtelot.golani,
        //     tzemach: this.tableDataArray[this.editRow].tzemach,
        //     controllers: this.ifNeedDelelte,
        //   })

        //   this.tableDataToShow = this.tableDataArray
        //     .map((el) => Object.assign({}, el))
        //     .slice(
        //       this.currentPage * this.itemsPerPage,
        //       this.currentPage * this.itemsPerPage + 8
        //     );
        //   this.form.reset();
        //   this.updateFilteredMishtalot.emit(objectOfMinHatzemach);
        // }
       if(res.errors != null ){
        if(res.errors.title != null){
          alert(res.errors.title);
        }
        else{
          alert("תקלה במערכת, נא לנסות שנית")
        
        }
       }
    }
    catch(e){
    }
  },
  (error) => { 
    if(error.error != null ){
      if(error.error.title != null){
        alert(error.error.title);
      }
      else{
        alert("תקלה במערכת, נא לנסות שנית")
      
      }
    }                            //Error callback
  
  
  }) 
}
//     else if (this.addBeePlan.degelofAddBeeComplete == true) {
//       let objectOfMinHatzemachAddbeePlan = Object.assign({
//         tzemach: null,
//         ashtaol: this.form.value.ashtaol,
//         golani: this.form.value.golani,
//         gilat: this.form.value.gilat,
//         kamut: Number(this.form.value.ashtaol) + Number(this.form.value.golani) + Number(this.form.value.gilat),
//         id: this.IdOfRow
//       })
//       this.addBeePlan.saveMinHatzemachMashtelaYaarMishki(objectOfMinHatzemachAddbeePlan).subscribe(res => {
//        try{
//         if (res) {

//           // this.form.value.kamut = objectOfMinHatzemachAddbeePlan.kamut;
//           let ObjectToUpdate= Object.assign({ashtaolFirst:   this.tableDataArray[this.editRow] .ashtaol, ashtaolNow:objectOfMinHatzemachAddbeePlan. ashtaol,golaniFirst:this.tableDataArray[this.editRow] .golani,golaniNow:objectOfMinHatzemachAddbeePlan.golani,gilatFirst:this.tableDataArray[this.editRow] .gilat,gilatNow:objectOfMinHatzemachAddbeePlan.gilat,kamutFirst:this.tableDataArray[this.editRow] .kamut,kamutNow:objectOfMinHatzemachAddbeePlan.kamut})
//           this.tableDataArray[this.editRow] = Object.assign({
//             tzemach: this.tableDataArray[this.editRow].tzemach,
//             ashtaol: this.form.value.ashtaol,
//             golani: this.form.value.golani,
//             gilat: this.form.value.gilat,
//             kamut:Number(this.form.value.ashtaol) + Number(this.form.value.golani) + Number(this.form.value.gilat),
//             controllers: true,
//           })
//           this.tableDataToShow = this.tableDataArray
//             .map((el) => Object.assign({}, el))
//             .slice(
//               this.currentPage * this.itemsPerPage,
//               this.currentPage * this.itemsPerPage + 8
//             );
//           this.form.reset();
//           this.updateFiltered.emit(ObjectToUpdate);

        
//             }
//           if(res.errors != null ){
//             if(res.errors.title != null){
//               alert(res.errors.title);
//             }
//             else{
//               alert("תקלה במערכת, נא לנסות שנית")
            
//             }
//           }
//         }
//         catch(e){
//         }
//       },
//       (error) => { 
//         if(error.error != null ){
//           if(error.error.title != null){
//             alert(error.error.title);
//           }
//           else{
//             alert("תקלה במערכת, נא לנסות שנית")
          
//           }
//         }                            //Error callback
      
      
//       }) 
    // }
//     return undefined

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
    if (
      sort.column.columnDef == 'objectid' ||
      sort.column.columnDef == 'seedsKg'
    ) {
      this.data = this.data.sort((a1, a2) => {
        return (
          Number(a1[sort.column.columnDef]) - Number(a2[sort.column.columnDef])
        );
      });
    } else {
      this.data = this.data.sort((a, b) => {
        return a[sort.column.columnDef] > b[sort.column.columnDef]
          ? 1
          : a[sort.column.columnDef] < b[sort.column.columnDef]
          ? -1
          : 0;
      });
    }
    // this.dataSource.load(this.data);
    // this.tableData$.next(this.data);
    // this.data$.next(this.data)
    return this.data;
  }

  filterByDate(dateToFilter, data) {
    console.log('filter by date');
    return [];
  }
  sortByDesc(sort: any) {
    console.log('sort');

    return [];
  }
  filterData(filterData: any) {
    console.log('fikter');
    return [];
  }
  DeleteSeedsCollect(rowToDelete: CollectSeedToDelete) {
    console.log('delete');
    return [];
  }



  changeTableToSingleTree(){
    
  }
}
