import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, OnInit, Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { retry } from 'rxjs/operators';
import { treeTypes } from 'src/app/mock_data/bee-plan-complete-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';

export interface Table {

  tzemach: string;
  kamut: number;
  golani: number;
  ashtaol: number;
  gilat: number;
  controllers: boolean;
}

// const ELEMENT_DATA: Table[] = [
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {

//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
// ];

@Component({
  selector: 'app-add-bee-plan-table',
  templateUrl: './add-bee-plan-table.component.html',
  styleUrls: ['./add-bee-plan-table.component.scss']
})
export class AddBeePlanTableComponent implements OnInit {
  ELEMENT_DATA: Table[] =[];
  public pagesCount = 0;
  public currentPage = 1;
  public pageSize = 9; 
  displayedColumns: string[] = [
 
    'plant',
    'totalCount',
    'golani',
    'ashtaol',
    'gilat',
    'controllers',
  ].reverse();
  treeTypes: {
    name: string; filterValue: string; count: number; urlSrc: string; 
  }[];
  constructor(private addBeePlanService:AddBeePlanService, private addProductionProcessService:AddProductionProcessService) {}
  dataToShow:any;
  degel:boolean=true;
  dataSource= new MatTableDataSource<Table>();
@Output()  updateTreeTypes :EventEmitter <any[]>= new EventEmitter()
  deleteItem(index,element) {
    return this.addBeePlanService.deleteMinHatzemach(element.id).subscribe(res=>{
      try{
    if(res){
      this.dataToShow.mineTzemach.splice(index, 1);
      this.dataSource = new MatTableDataSource<Table>(this.dataToShow.mineTzemach);
    }
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
  ngOnInit() {
return this.addBeePlanService.getTochnitYitzurMireDvorim(this.addProductionProcessService.addTochnitYezur.id).subscribe(res=>{ 
  this.ELEMENT_DATA=res;
  this.dataToShow = this.ELEMENT_DATA;
 this.treeTypes= treeTypes
    this.dataSource = new MatTableDataSource<Table>(this.dataToShow.mineTzemach);
    this.treeTypes[0]["count"] = res.ashtaol;
    this.treeTypes[1]["count"] = res.golani;
    this.treeTypes[2]["count"] = res.gilat;
    this.treeTypes[3]["count"] = res.total;
    this.updateTreeTypes.emit(this.treeTypes);
})
    }
    updateTableArray(pageNubmer) {
      
      this.currentPage = pageNubmer;
    if(this.dataSource.filteredData.length>0){
      this.dataSource = new MatTableDataSource<Table>(
       this.dataToShow.slice(
          (pageNubmer - 1) * this.pageSize,
          pageNubmer * this.pageSize
        )
      );
      this.pagesCount = this.ELEMENT_DATA.length / this.pageSize;
       }
       }

  checkTotalCount(event, index, name) {
     
    this.addBeePlanService.objectWithTheListOfAddBee=this.dataToShow;
    this.dataSource.filteredData[index][name] = event.target.value;
    const totalInputsValue =
      +this.dataSource.filteredData[index].ashtaol +
      +this.dataSource.filteredData[index].gilat +
      +this.dataSource.filteredData[index].golani;
    if (
      +totalInputsValue != +this.dataSource.filteredData[index].kamut &&
      totalInputsValue !== 0
    ) {
      return false;
    }
    return true;
  }
  checkStatus(index) {
    const totalInputsValue =
      +this.dataSource.filteredData[index].ashtaol +
      +this.dataSource.filteredData[index].gilat +
      +this.dataSource.filteredData[index].golani;
      
    if (
      +totalInputsValue != +this.dataSource.filteredData[index].kamut &&
      totalInputsValue !== 0
    ) {
      return true;
    } else { 
      return false;
    }
  }
}
