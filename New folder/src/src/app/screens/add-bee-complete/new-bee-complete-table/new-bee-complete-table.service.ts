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
import { NewBeeCompleteTableModel } from './new-bee-complete-table.model';

@Injectable({
  providedIn: 'root',
})
export class NewBeeCompleteTableService {
  private data = [];
  private showFullTabele$:BehaviorSubject<boolean>
  private currentFillter$:BehaviorSubject<string>

  private tableData$ = new BehaviorSubject<NewBeeCompleteTableModel[]>(
    null
    );
    public dataSource: TableDataSource<NewBeeCompleteTableModel>;
    private data$: BehaviorSubject<NewBeeCompleteTableModel[]>;
    
    constructor(
      ) {
 this.showFullTabele$=new BehaviorSubject<boolean>(false)
 
    this.tableData$ = new BehaviorSubject<NewBeeCompleteTableModel[]>(
      this.data
    );
    this.currentFillter$=new BehaviorSubject<string>('all')

    this.dataSource = new TableDataSource<NewBeeCompleteTableModel>(
      this.data
    );
    this.data$ = new BehaviorSubject<NewBeeCompleteTableModel[]>(
      this.data
    );
    this.dataSource.load(this.data);
    this.tableData$.next(this.data);
    this.data$.next(this.data);
  }
 
  public emitCurrentFillter(value: boolean): void {
    this.showFullTabele$.next(value);
  }

  public getCurrentFillterObs(): Observable<boolean> {
    return this.showFullTabele$.asObservable();
  }
 
  public emitShowFullTable(value: boolean): void {
    this.showFullTabele$.next(value);
  }

  public getShowFullTableObs(): Observable<boolean> {
    return this.showFullTabele$.asObservable();
  }

  public emitData(data: NewBeeCompleteTableModel[]): void {
    this.data$.next(data);
    //this.dataSource.load(this.data)

  }

  public getDataObs(): Observable<NewBeeCompleteTableModel[]> {
    return this.data$.asObservable();
  }

  getTabledata(): Observable<NewBeeCompleteTableModel[]> {
    return this.tableData$.asObservable();
  }

  public get dataSubject() {
    return this.tableData$;
  }


// public editData(row:any,allData,data:any[]){
//     const newTotal= +row.form.formGroup.value.ashtaol + +row.form.formGroup.value.golani + +row.form.formGroup.value.gilat
//     console.log(newTotal);
//     let index=data.findIndex(x=>x.id==row.item.id);
    
//     if(+newTotal != +row.item.kamut){
//       return alert("יש לוודא שכמות העצים החדשה שווה לכמות העצים הכללית")
//     }
    
//      if (this.addBeePlan.degelOfOrderPlanComplete == true) {
//       let objectOfMinHatzemach = Object.assign({
//         address: row.item.address ? row.item.address : " ",
//         ashtaol:Number( row.form.formGroup.value.ashtaol),
//         email: row.item.email ?row.item.email : " ",
//         gilat: Number(row.form.formGroup.value.gilat) ,
//         golani:Number(row.form.formGroup.value.golani ),
//         lakoach:  row.item.lakoach ?  row.item.lakoach : " ",
//         kodminHatzemach:allData.tzmachim.find(x=>x.name== row.item.minHatzemach).code,
//         minHatzemach:row.item.minHatzemach,// this.form.value.minHatzemach,
//         phone: row.item.phone ?  row.item.phone : " ",
//         kamut: Number(row.form.formGroup.value.ashtaol) + Number(row.form.formGroup.value.golani) + Number(row.form.formGroup.value.gilat),
//         id: row.item.id,
//       })
//       return this.orderPlantsService.saveMinHatzemachYaarMishki(objectOfMinHatzemach).subscribe(res => {
//         try{
//         if (res) {
//         //  data[index]={...objectOfMinHatzemach}
//           data[index].ashtaol= objectOfMinHatzemach.ashtaol
//           data[index].golani= objectOfMinHatzemach .golani
//           data[index].gilat=  objectOfMinHatzemach.gilat
//           data[index].total=data[index].kamut
//           data[index].misparTochnit=this.AddProductionProcessService.addTochnitYezur.id
//           console.log(data);
//          this.dataSource.load(data);
  
//         }
//       }
//         catch(e){

//         }
//         })
//       }
//     else if (this.addBeePlan.degelOfOrderPlanCompleteByMashtelot == true) {
//       let objectOfMinHatzemachByMashtelot = Object.assign({
//         tzemach: row.iten.minHatzemach,
//         ashtaol:Number( row.form.formGroup.value.ashtaol),
//         golani:Number(row.form.formGroup.value.golani),
//         gilat: Number( row.form.formGroup.value.gilat),
//         kamut: Number(row.form.formGroup.value.ashtaol) + Number( row.form.formGroup.value.golani) + Number(row.form.formGroup.value.gilat),
//         id: row.item.id
//       })
//       return this.orderPlantsCompleteService.saveMinHatzemachMashtelaYaarMishki(objectOfMinHatzemachByMashtelot).subscribe(res => {
        
//         try{
//         if (res) {
//            
//         }
     
//        if(res.errors != null ){
//         if(res.errors.title != null){
//           alert(res.errors.title);
//         }
//         else{
//           alert("תקלה במערכת, נא לנסות שנית")
        
//         }
//        }
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
//     }                    
  
  
//   }) 
// }

// }
  public enmitData(data) {
    this.tableData$.next(data);
  }

//   public setSearchControl(): { control: FormControl; question: Question } {
//     const question = this.formService.setQuestion(this.searchObject);
//     const control = this.formService.getFieldControl(question);
//     return { control, question };
//   }
//   sortByAsc(sort: any) {
//     if (
//       sort.column.columnDef == 'objectid' ||
//       sort.column.columnDef == 'seedsKg'
//     ) {
//       this.data = this.data.sort((a1, a2) => {
//         return (
//           Number(a1[sort.column.columnDef]) - Number(a2[sort.column.columnDef])
//         );
//       });
//     } else {
//       this.data = this.data.sort((a, b) => {
//         return a[sort.column.columnDef] > b[sort.column.columnDef]
//           ? 1
//           : a[sort.column.columnDef] < b[sort.column.columnDef]
//           ? -1
//           : 0;
//       });
//     }
    
//     return this.data;
//   }

//   filterByDate(dateToFilter, data) {
//     console.log('filter by date');
//     return [];
//   }
//   sortByDesc(sort: any) {
//     console.log('sort');

//     return [];
//   }
//   filterData(filterData: any) {
//     console.log('fikter');
//     return [];
//   }
//   DeleteSeedsCollect(rowToDelete: CollectSeedToDelete) {
//     console.log('delete');
//     return [];
//   }



//   changeTableToSingleTree(){
    
//   }
}
