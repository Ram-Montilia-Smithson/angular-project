import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms'
import { dropDown } from 'src/app/Models/dropDown';
import { onatNetia } from 'src/app/Models/onatNetia';
import { sugTochnit } from 'src/app/Models/sugTochnit';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
@Component({
  selector: 'app-order-plants-complete-form',
  templateUrl: './order-plants-complete-form.component.html',
  styleUrls: ['./order-plants-complete-form.component.scss']
})
export class OrderPlantsCompleteFormComponent implements OnInit, OnChanges {

  firstRun = false;
  @Input() isOpend: boolean = false;
  @Output() toggleEdit: EventEmitter<any> = new EventEmitter;
  @Output() public updateTitle: EventEmitter<any> = new EventEmitter<any>();
  @Input() status: number;
  @Input() onatNetia: any;
  sharedData:any;
  seasonOptions:onatNetia[]=[];
  gardeningOptions:dropDown[]=[]
  planTypeOptions:sugTochnit[]=[]
  statusOptions:dropDown[]=[]
  numberOfOption:any;
  updateStatus() {

  }
  toggleEditHandler(): void {
    this.toggleEdit.emit();
  }
  public updateTitleObj(form: NgForm): void {
    this.updateTitle.emit(form.value);
  }

  // public seasonOptions: { text: string; isShmita: boolean; value: number }[] = [
  //   { text: 'תש"פ 2020 - 2021', isShmita: true, value: 1 },
  //   { text: 'תש"פ 2017 - 2018', isShmita: false, value: 2 },
  //   { text: 'תש"פ 2019 - 2021', isShmita: true, value: 13 },
  // ];

  // public gardeningOptions: { text: string; value: number }[] = [
  //   { text: 'גולני', value: 1 },
  //   { text: 'אשתאשול', value: 2 },
  //   { text: 'גילת', value: 3 },
  // ];

  // public planTypeOptions: { text: string; value: number }[] = [
  //   { text: 'תוכניות ייצור - מרעה דבורים מרחב צפון', value: 1 },
  //   { text: 'תוכניות ייצור - מרחב מרכז', value: 2 },
  //   { text: 'תוכניות ייצור - יער מישקי מרחב דרום', value: 3 },
  // ];

  // public statusOptions: { text: string; value: number }[] = [
  //   { text: 'בטיפול', value: 1 },
  //   { text: 'מאושר', value: 2 },
  // ];
  selectedStatus: any = {text : 'בטיפול' ,code:1};

  constructor(private addProductionProcessService: AddProductionProcessService,private orderPlantsCompleteService:OrderPlantsCompleteService) { }
   ngOnChanges(changes: SimpleChanges): void {
    if(changes.status != undefined && changes.status.currentValue != undefined){
      this.numberOfOption = changes.status.currentValue-1;
    }
   

  }
  ngOnInit() {
    return this.addProductionProcessService.GetAllListForTochniyotYitzur().subscribe(res => {
      this.selectedStatus=res.statusim[0].name;
      this.seasonOptions = res.onotNetia;
      this.gardeningOptions = res.mashtelot;
      this.planTypeOptions = res.sugeyTochnit;
      this.statusOptions = res.statusim
      this.addProductionProcessService.status=this.statusOptions;
      this.addProductionProcessService.onaotNetia=this.seasonOptions;
     this.numberOfOption=this.statusOptions.find(x=>x.name== this.addProductionProcessService.addTochnitYezur.status)
     if(this.numberOfOption==null)
     this.numberOfOption=this.statusOptions.find(x=>x.code==Number(this.addProductionProcessService.addTochnitYezur.status))
      this.selectedStatus =this.numberOfOption;
        })
  }
}
