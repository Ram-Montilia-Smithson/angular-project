import { Component, OnInit, Input, ViewChild, Output , EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';

@Component({
  selector: 'app-spatial-form',
  templateUrl: './spatial-form.component.html',
  styleUrls: ['./spatial-form.component.scss']
})
export class SpatialFormComponent implements OnInit {
  @Input() isOpend: boolean = false;
  @Output() toggleEdit:EventEmitter<any>=new EventEmitter;
  @Output() public updateTitle : EventEmitter<any> = new EventEmitter<any>();
  // public seasonOptions;
  // public gardeningOptions;
  // public planTypeOptions;
  // public statusOptions;
  numberOfOption:any;
  command: any;
  toggleEditHandler():void{
    this.toggleEdit.emit();
  }
  public updateTitleObj(form: NgForm):void {
    this.updateTitle.emit(form.value);
  }

  public seasonOptions: { text: string; isShmita: boolean; value: number }[] = [
    { text: 'תש"פ 2020 - 2021', isShmita: true, value: 1 },
    { text: 'תש"פ 2017 - 2018', isShmita: false, value: 2 },
    { text: 'תש"פ 2019 - 2021', isShmita: true, value: 13 },
  ];

  public gardeningOptions: { text: string; value: number }[] = [
    { text: 'גולני', value: 1 },
    { text: 'אשתאשול', value: 2 },
    { text: 'גילת', value: 3 },
  ];

  public planTypeOptions: { text: string; value: number }[] = [
    { text: 'תוכניות ייצור - מרעה דבורים מרחב צפון', value: 1 },
    { text: 'תוכניות ייצור - מרחב מרכז', value: 2 },
    { text: 'תוכניות ייצור - יער מישקי מרחב דרום', value: 3 },
  ];

  public statusOptions: { name: string; code: number }[] = [
    { name: 'בטיפול', code: 1 },
    { name: 'מאושר', code: 2 },
  ];
  selectedStatus: any = {text : 'בטיפול' ,code:1};


  constructor(private cdRef:ChangeDetectorRef,private addProductionProcessService:AddProductionProcessService, private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.status != undefined && changes.status.currentValue != undefined){
      this.numberOfOption = changes.status.currentValue-1;
    }
  }

  ngOnInit() {
return this.addProductionProcessService.GetAllListForTochniyotYitzur().subscribe(res=>{
  this.seasonOptions = res.onotNetia;
  this.gardeningOptions = res.mashtelot;
  this.planTypeOptions = res.sugeyTochnit;
  this.statusOptions = res.statusim;
  this.addProductionProcessService.status=this.statusOptions
  this.addProductionProcessService.onaotNetia=this.seasonOptions
  this.command=this.addProductionProcessService.addTochnitYezur.hearot;
  this.numberOfOption=this.statusOptions.find(x=>x.name== this.addProductionProcessService.addTochnitYezur.status)
  if(this.numberOfOption==null)
  this.numberOfOption=this.statusOptions.find(x=>x.code==Number(this.addProductionProcessService.addTochnitYezur.status))
   this.selectedStatus =this.numberOfOption;
})
  }

}
