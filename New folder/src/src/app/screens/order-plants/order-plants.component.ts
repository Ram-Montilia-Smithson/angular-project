import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { OrderPlantsTableComponent } from './order-plants-table/order-plants-table.component';
import { NewOrderPlantsTableService } from './new-order-plants-table/new-order-plants-table.service';
@Component({
  selector: 'app-order-plants',
  templateUrl: './order-plants.component.html',
  styleUrls: ['./order-plants.component.scss']
})
export class OrderPlantsComponent implements OnInit {
  isOpend = true
   treeTypes: { name: string; filterValue: string; count: number; urlSrc: string }[] = [
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
  degel: boolean = true;
  flag: boolean;
  constructor(
    private newOrderPlantsTableService:NewOrderPlantsTableService,
    private orderPlantsService: OrderPlantsService,private route:Router,private addProductionProcessService: AddProductionProcessService) { }  ngOnInit() {
  }
  updateTreeTypes(treeTypes:any){
    this.treeTypes=treeTypes;

  }
  toggleEditHandler(): void {
    this.isOpend = !this.isOpend
  }
  bottomNavigaitonHandler(event: string) {
    this.flag=false
    this.degel = true
    console.log(this.newOrderPlantsTableService.arr);
    console.log(this.orderPlantsService.objectWithListOfOrderPlants.mineTzemach);
    // this.orderPlantsService.objectWithListOfOrderPlants.forEach(element => {
    // let object=  this.newOrderPlantsTableService.arr.find(x=>x.id==element.id)
    //   element.ashtaol=object.ashtaol;
    //   element.golani=object.golani;
    //   element.gilat=object.gilat;
    //   element.kamut=object.kamut;
    // });;
    this.orderPlantsService.objectWithListOfOrderPlants.mineTzemach.forEach(x=>{
      if(x.golani + x.gilat + x.ashtaol !=x.kamut || x.golani<0 || x.gilat<0  || x.ashtaol<0)
      this.flag=true;
    })
   
    if(this.flag==false){
    // if(this.orderPlantsService.objectWithListOfOrderPlants==null)
    // alert("חובה למלא את כל הנתונים!")
    // if (this.orderPlantsService.objectWithListOfOrderPlants.mineTzemach == null)
    //   this.degel = false;
    // else {
    //   this.orderPlantsService.objectWithListOfOrderPlants.mineTzemach.forEach(x => {
    //     if (Number(x.gilat) + Number(x.golani) + Number(x.ashtaol) != x.kamut) {
    //       this.degel = false;
    //     }
    //   })
    // }
    //  if (this.degel) {
      return this.orderPlantsService.saveTochnitYitzurYaarMishki(this.orderPlantsService.objectWithListOfOrderPlants).subscribe(res => {
        if (res!=null){
          alert('השמירה בוצעה בהצלחה')
          this.addProductionProcessService.addTochnitYezur.id=res[0].id;
this.addProductionProcessService.addTochnitYezur.onatNetia=res[0].onatNetia;
this.addProductionProcessService.addTochnitYezur.status=res[0].status;
this.route.navigate(['/forestry/order-plants-complete']);
        }
      })
   }
     else {
       alert("חובה להכניס את כל הנתונים תקינים");
     }
     return undefined
 // }
  return undefined;
}
  newTableDataHandler(newTableData) {}
  changeFilter(eve:any){
    this.treeTypes=eve;
  }
}
