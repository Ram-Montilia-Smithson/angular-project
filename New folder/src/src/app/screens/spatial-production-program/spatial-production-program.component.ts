import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { minHatzemachMerchavi } from 'src/app/Models/minHatzemachMerchavi';

@Component({
  selector: 'app-spatial-production-program',
  templateUrl: './spatial-production-program.component.html',
  styleUrls: ['./spatial-production-program.component.scss'],
})
export class SpatialProductionProgramComponent implements OnInit {
  public isOpend = true;
  public titleObj: object;


  constructor(private activeRoute: ActivatedRoute,private cdRef:ChangeDetectorRef, private spatialProductionProgramService:SpatialProductionProgramService, private addProductionProcessService:AddProductionProcessService) {} 

  ngOnInit(): void {
    //const id = this.activeRoute.snapshot.params['id'];
    const id = 56;

  }

  toggleEditHandler(): void {
    this.isOpend = !this.isOpend;
  }

  titleObjHandler(event: any) {
    let   status=this.addProductionProcessService.status.find(x=>x.code==Number(event.status)).name;
    this.titleObj={mashtela:this.addProductionProcessService.addTochnitYezur.mashtela,plantingSeason:this.addProductionProcessService.addTochnitYezur.onatNetia,status:status,comment:event.comment}
    let onatNetia= this.addProductionProcessService.onaotNetia.find(x=>x.name==this.addProductionProcessService.addTochnitYezur.onatNetia);
 let objectToSave=  Object.assign({id:this.addProductionProcessService.addTochnitYezur.id,onatNetia:onatNetia.code,status:event.status,hearot:event.comment})  
 return this.spatialProductionProgramService.editTochnit(objectToSave).subscribe(res=>{
   if(res){
     this.addProductionProcessService.addTochnitYezur.status=objectToSave.status;
     this.addProductionProcessService.addTochnitYezur.hearot=objectToSave.hearot;
   }
 })
  }
}

