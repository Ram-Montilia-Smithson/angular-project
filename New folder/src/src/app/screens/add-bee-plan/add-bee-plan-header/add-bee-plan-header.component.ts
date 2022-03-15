import { Component, Input, OnInit } from '@angular/core';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';

@Component({
  selector: 'app-add-bee-plan-header',
  templateUrl: './add-bee-plan-header.component.html',
  styleUrls: ['./add-bee-plan-header.component.scss']
})
export class AddBeePlanHeaderComponent implements OnInit {

  @Input() titleObj:{plantingSeason:string,status:string};
  
  constructor(private addProductionProcessService:AddProductionProcessService, private spatialProductionProgramService:SpatialProductionProgramService) { }

  
    ngOnInit(): void {
      this.titleObj={plantingSeason:this.addProductionProcessService.addTochnitYezur?this.addProductionProcessService.addTochnitYezur.onatNetia:null,status:this.addProductionProcessService.addTochnitYezur.status};

    }
}
