import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductionProcessHeaderService } from './add-production-process-header.service';
import { ProductionProcessHeaderModel } from './production-process-header.model';

@Component({
  selector: 'app-add-production-process-header',
  templateUrl: './add-production-process-header.component.html',
  styleUrls: ['./add-production-process-header.component.scss']
})
export class AddProductionProcessHeaderComponent implements OnInit {
@Output() toggleEditEmitter: EventEmitter<any>=new EventEmitter()
@Output() downloadEmitter: EventEmitter<any>=new EventEmitter()
@Input() formOpen:boolean=false;
public headerItems$ : Observable<ProductionProcessHeaderModel[]>
public comment$:Observable<string>
  constructor(private addProductionProcessHeaderService:AddProductionProcessHeaderService) { }

  ngOnInit(): void {
    this.comment$=this.addProductionProcessHeaderService.getComment()
    this.headerItems$=this.addProductionProcessHeaderService.getAddSpatialHeaderItems()
  }

  toggleEdit(){
    this.toggleEditEmitter.emit()
  }

  downloadExcel(){
this.downloadEmitter.emit()    
  }
}
 