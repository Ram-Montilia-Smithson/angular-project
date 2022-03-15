import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, OnInit, Component, ViewChild, Output,EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { retry } from 'rxjs/operators';
import { treeTypes } from 'src/app/mock_data/bee-plan-complete-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';


export interface Table {
  customer: string;
  phone: string;
  adress: string;
  email: string;
  plant: string;
  kamut: number;
  golani: number;
  ashtaol: number;
  gilat: number;
  controllers: boolean;
}

//
// = [
//   {
//     customer: '1בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: '2בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: '3בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: '4בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: '5בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: '6בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: '7בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: 'בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: 'בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
//   {
//     customer: 'בלום אורנה',
//     phone: ' 054-7025546',
//     adress: 'יסוד המעלה 58 דונם',
//     email: 'yoni@hotmail.com',
//     plant: 'אקליפטוס הקור',
//     totalCount: 15500,
//     golani: 0,
//     ashtaol: 0,
//     gilat: 0,
//     controllers: true,
//   },
// ];

@Component({
  selector: 'app-order-plants-table',
  templateUrl: './order-plants-table.component.html',
  styleUrls: ['./order-plants-table.component.scss'],
})
export class OrderPlantsTableComponent implements OnInit {
   treeTypes1: { name: string; filterValue: string; count: number; urlSrc: string }[] = [
    {
      name: 'מחטניים',
      filterValue: 'coniferous',
      count: 520,
      urlSrc: 'assets/images/spatial-christmas-tree.svg',
    },
    {
      name: 'חורש טבעי',
      filterValue: 'grove',
      count: 33,
      urlSrc: 'assets/images/spatial-tree.svg',
    },
    {
      name: 'אקליפטוס',
      filterValue: 'eucalyptus',
      count: 5350,
      urlSrc: 'assets/images/spatial-eucalyptus.svg',
    },
    {
      name: 'שיטים',
      filterValue: 'acacia',
      count: 220,
      urlSrc: 'assets/images/spatial-tree-black-silhouette-shape.svg',
    },
    {
      name: 'עצי ושיחי נוי',
      filterValue: 'ornamentalTree',
      count: 1230,
      urlSrc: 'assets/images/spatial-shape.svg',
    },
    {
      name: 'הכול',
      filterValue: 'all',
      count: 12520,
      urlSrc: 'assets/images/spatial-trees.svg',
    },
  ];
  displayedColumns: string[] = [
    'customer',
    'phone',
    'adress',
    'email',
    'plant',
    'totalCount',
    'ashtaol',
    'golani',
    'gilat',
    'controllers',
  ].reverse();
  ELEMENT_DATA: Table[]=[];
  dataToShow:any;
  lakoach:any;
  treeTypes:any[]=[];
  @Output() filterUpdate:EventEmitter<any[]>= new EventEmitter();
 dataSource = new MatTableDataSource<Table>();
  constructor(private addBeePlanService:AddBeePlanService, private addProductionProcessService:AddProductionProcessService,private orderPlantsService:OrderPlantsService,private orderPlantsComplete:OrderPlantsCompleteService) {}
  deleteItem(index,element) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
      console.log('delete');
      
             }
             else {
               alert("תקלה במערכת, נא לנסות שנית")
   
             }
    return this.orderPlantsService.deleteMinHatzemach(element.id).subscribe(res=>{
      try{
    if(res){
    this.dataToShow.mineTzemach.splice(index, 1);
    this.dataSource = new MatTableDataSource<Table>(this.dataToShow.mineTzemach);
    alert('מחיקה בוצעה בהצלחה')!!
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
    return this.orderPlantsComplete.getTochnitYitzurYaarMishki(this.addProductionProcessService.addTochnitYezur.id,0).subscribe(res=>{
      this.ELEMENT_DATA=res;
      this.dataToShow = this.ELEMENT_DATA;
      this.dataSource = new MatTableDataSource<Table>(this.dataToShow.mineTzemach);
      this.treeTypes=this.treeTypes1;
      this.treeTypes[0]["count"] = res.machtaniyim;
      this.treeTypes[1]["count"] = res.choreshTivi;
      this.treeTypes[2]["count"] = res.ekaliptus;
      this.treeTypes[3]["count"] = res.shitim;
      this.treeTypes[4]["count"] = res.atzeyNoy;
      this.treeTypes[5]["count"] = res.total;
      this.filterUpdate.emit(this.treeTypes);
    })
  }
  checkTotalCount(event, index, name) {
    this.orderPlantsService.objectWithListOfOrderPlants.mineTzemach= this.ELEMENT_DATA;
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
