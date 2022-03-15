import { Component, OnInit,EventEmitter,Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import  * as FileSaver from '@progress/kendo-file-saver';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { treeTypes } from 'src/app/mock_data/order-plantes-complete-data';
import { secondTreeTypes } from 'src/app/mock_data/order-plantes-complete-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';

@Component({
  selector: 'app-order-plants-complete-header',
  templateUrl: './order-plants-complete-header.component.html',
  styleUrls: ['./order-plants-complete-header.component.scss']
})
export class OrderPlantsCompleteHeaderComponent implements OnInit, OnChanges {

  @Output() toggleEdit:EventEmitter<any>=new EventEmitter;
  @Input() titleObj:{plantingSeason:string,status:string};
  @Input() isOpend:boolean;
  @Input() title:any;
  listofTableOrderPlantsComplete:any[]=[]
  objectToPush: any;
  listofTableOrderPlantsCompleteBByMashtelot: any[]=[];
  listofTableAddBeePlan: any[]=[];
  code: any;
  constructor(private addProductionProcessService:AddProductionProcessService, private spatialProductionProgramService:SpatialProductionProgramService,private orderPlantsCompletetService:OrderPlantsCompleteService,private addBeePlanService:AddBeePlanService) { }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes.isOpend.firstChange!=false){
        
      this.titleObj={plantingSeason:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.onatNetia:null,status:this.addProductionProcessService.addTochnitYezur.status};
      }
    }
    ngOnInit(): void {
      this.titleObj={plantingSeason:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.onatNetia:null,status:this.addProductionProcessService.addTochnitYezur.status};
    }
    toggleEditHandler():void{
      this.toggleEdit.emit();
    }
    exportExcel() {
      debugger
      this.listofTableOrderPlantsComplete=[];
      this.listofTableOrderPlantsCompleteBByMashtelot=[]
      this.listofTableAddBeePlan=[]
      if(this.addBeePlanService.degelOfOrderPlanComplete==true)
      {
         if(this.orderPlantsCompletetService.listofTableOrderPlantsComplete.length>0){
          this.orderPlantsCompletetService.listofTableOrderPlantsComplete.forEach(x=>{
          this.objectToPush=new Object()
            this.objectToPush["לקוח"]=x["lakoach"];
            this.objectToPush["טלפון"]=x["phone"];
            this.objectToPush["כתובת"]=x["address"];
            this.objectToPush["אימייל"]=x["email"];
            this.objectToPush["צמח"]=x["minHatzemach"];
            console.log(this.orderPlantsCompletetService.plants); 
            this.objectToPush["קוד צמח"]=this.orderPlantsCompletetService.plants.find(x1=>x1.name==x["minHatzemach"]).code
            this.objectToPush["אשתאול"]=x["ashtaol"];
            this.objectToPush["גולני"]=x["golani"];
            this.objectToPush["גילת"]=x["gilat"];
            this.objectToPush['סה"כ']=x["total"];
            this.listofTableOrderPlantsComplete.push(this.objectToPush);
          })
         import("xlsx").then(xlsx => {
             const worksheet = xlsx.utils.json_to_sheet(this.listofTableOrderPlantsComplete);
             const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
             const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
             this.saveAsExcelFile(excelBuffer, "orderplantscomplete");
         });
        }
       }    
    else if(this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot==true)
      {
           if(this.orderPlantsCompletetService.listofTableOrderPlantsComplete.length>0){
            this.orderPlantsCompletetService.listofTableOrderPlantsComplete.forEach(x=>{
            this.objectToPush=new Object()
            this.objectToPush["צמח"]=x["tzemach"];
             this.objectToPush["קוד צמח"]=this.orderPlantsCompletetService.plants.find(x2=>x2.name==x["tzemach"]).code
            this.objectToPush["אשתאול"]=x["ashtaol"];
            this.objectToPush["גולני"]=x["golani"];
            this.objectToPush["גילת"]=x["gilat"];
            this.objectToPush['סה"כ']=x["kamut"];

            this.listofTableOrderPlantsCompleteBByMashtelot.push(this.objectToPush);
          })
         
         import("xlsx").then(xlsx => {
             const worksheet = xlsx.utils.json_to_sheet(this.listofTableOrderPlantsCompleteBByMashtelot);
             const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
             const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
             this.saveAsExcelFile(excelBuffer, "orderplantscomplete");
         });
        }
      }
else if(this.addBeePlanService.degelofAddBeeComplete==true){
      if(this.addBeePlanService.listOfAddBeePlan.length>0){
        this.addBeePlanService.listOfAddBeePlan.forEach(x=>{
        this.objectToPush=new Object()
        this.objectToPush["צמח"]=x["tzemach"];
        this.objectToPush["אשתאול"]=x["ashtaol"];
        this.objectToPush["גולני"]=x["golani"];
        this.objectToPush["גילת"]=x["gilat"];
        this.objectToPush['סה"כ']=x["kamut"];
        this.listofTableAddBeePlan.push(this.objectToPush);
      })
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listofTableAddBeePlan);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "addBeePlan");
    });
     }
      }
    }   
     saveAsExcelFile(buffer: any, fileName: string): void {
       let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
       let EXCEL_EXTENSION = '.xlsx';
       const data: Blob = new Blob([buffer], {
           type: EXCEL_TYPE
       });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
     }
    
}
