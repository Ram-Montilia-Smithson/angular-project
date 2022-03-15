import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { treeTypes } from 'src/app/mock_data/bee-plan-complete-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { NewAddBeePlanTableService } from './new-add-bee-plan-table/new-add-bee-plan-table.service';
// import { NewAddBeePlanTableService } from './add-bee-plan-table/add-bee-plan-table.component';

@Component({
  selector: 'app-add-bee-plan',
  templateUrl: './add-bee-plan.component.html',
  styleUrls: ['./add-bee-plan.component.scss']
})
export class AddBeePlanComponent implements OnInit {

  isOpend = true
  treeTypes: { name: string; filterValue: string; count: number; urlSrc: string }[] = [
    {
      name: 'אשתאול',
      filterValue: 'ashtaol',
      count:520,
      urlSrc: 'assets/images/flower.svg',
    },
 
    {
      name: 'גולני',
      filterValue: 'golani',
      count:5350,
      urlSrc: 'assets/images/flower.svg',
    },
    {
      name: 'גילת',
      filterValue: 'gilat',
      count:220,
      urlSrc: 'assets/images/flower.svg',
    },
    {
      name: 'הכול',
      filterValue: 'all',
      count:12520,
      urlSrc: 'assets/images/spatial-trees.svg',
    },
  ];
  degel: boolean=true;
  flag: boolean;

  constructor(private newAddBeePlanTableService:NewAddBeePlanTableService,private orderPlantsService:OrderPlantsService
    ,private addBeePlanService:AddBeePlanService, private addProductionProcessService:AddProductionProcessService,private route:Router) { }
  ngOnInit(): void {
  }
  updateTreeTypes(treeTypes:any){
    this.treeTypes=treeTypes;
  }
  toggleEditHandler(): void {
    this.isOpend = !this.isOpend
  }
  bottomNavigaitonHandler(event:string){
    this.flag=false  
    this.degel = true
    console.log(this.newAddBeePlanTableService.arr);
    console.log(this.orderPlantsService.objectWithListOfOrderPlants);
    this.addBeePlanService.objectWithTheListOfAddBee.mineTzemach.forEach(element => {
    let object= this.newAddBeePlanTableService.arr.find(x=>x.id==element.id)
      element.ashtaol=object.ashtaol;
      element.golani=object.golani;
      element.gilat=object.gilat;
      element.kamut=object.kamut;
    });
    this.addBeePlanService.objectWithTheListOfAddBee.mineTzemach.forEach(x=>{
      if(x.golani + x.gilat + x.ashtaol !=x.kamut || x.golani<0 || x.gilat<0  || x.ashtaol<0)
      this.flag=true;
    })
   if(this.flag==false){
     return this.addBeePlanService.saveTochnitYitzurMireDvorim(this.addBeePlanService.objectWithTheListOfAddBee).subscribe(res=>{
       if(res[0]!=null)
       alert('השמירה בוצעה בהצלחה')
       this.route.navigate(['/forestry/add-bee-plan-complete'])
     })
     
   }
   else{
     alert("חובה להכניס את כל הנתונים!!!")
     return undefined
   }
   
   return undefined
 }
 
  newTableDataHandler(newTableData){
    
     
   }
}
