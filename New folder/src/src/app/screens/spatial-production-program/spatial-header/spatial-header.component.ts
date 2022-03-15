import { Component, OnInit,EventEmitter,Output, Input, SimpleChanges } from '@angular/core';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import  * as FileSaver from '@progress/kendo-file-saver';

@Component({
  selector: 'app-spatial-header',
  templateUrl: './spatial-header.component.html',
  styleUrls: ['./spatial-header.component.scss']
})
export class SpatialHeaderComponent implements OnInit {
@Output() toggleEdit:EventEmitter<any>=new EventEmitter;
@Input() titleObj:{plantingSeason:string,status:string, mashtela:string,comment:string};
@Input() isOpend:boolean;
hearot: string;
  objectToPush: any;
  listForTableForSpatialProductionProgram: any[]=[];

constructor(private addProductionProcessService:AddProductionProcessService, private spatialProductionProgramService:SpatialProductionProgramService) { }


  ngOnInit(): void {
    this.titleObj={plantingSeason:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.onatNetia:null, mashtela:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.mashtela:null,status:this.addProductionProcessService.addTochnitYezur.status,comment:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.hearot:null};

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.isOpend.firstChange!=false){
      this.titleObj={plantingSeason:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.onatNetia:null, mashtela:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.mashtela:null,status:this.addProductionProcessService.addTochnitYezur.status,comment:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.hearot:null};
    }
  }
  toggleEditHandler():void{
    this.toggleEdit.emit();
  }
  exportExcel() {
     
    this.listForTableForSpatialProductionProgram=[]
    if(this.spatialProductionProgramService.listForTableForSpatialProductionProgram.length>0){
      this.spatialProductionProgramService.listForTableForSpatialProductionProgram.forEach(x=>{
        this.objectToPush=new Object()
          this.objectToPush["צמח"]=x["minHatzemach"];
          this.objectToPush["כמות"]=x["kamut"];
          this.objectToPush["אזור"]=x["ezor"];
          this.objectToPush["כלי קיבול"]=x["kibul"];
          this.objectToPush["ריבוי"]=x["ribuy"];
          this.objectToPush["מקור"]=x["makor"];
          this.objectToPush["הערות"]=x["hearot"];
          this.objectToPush["קוד משפחה"]=x["kodMishpacha"];
          this.objectToPush['תאור משפחה']=x["teurMishpacha"];
          this.listForTableForSpatialProductionProgram.push(this.objectToPush);
        })
       import("xlsx").then(xlsx => {
           const worksheet = xlsx.utils.json_to_sheet(this.listForTableForSpatialProductionProgram);
           const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
           const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
           this.saveAsExcelFile(excelBuffer, "SpatialProductionProgram");
       });
     }
   }
   saveAsExcelFile(buffer: any, fileName: string): void {
     let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
     let EXCEL_EXTENSION = '.xlsx';
     const data: Blob = new Blob([buffer], {
         type: EXCEL_TYPE
     });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
   }
}
