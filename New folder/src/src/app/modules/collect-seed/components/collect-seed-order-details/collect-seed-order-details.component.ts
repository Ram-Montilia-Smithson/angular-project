import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DETAILS_MOCK, COLLECT_SEEDS_HEADER, AMOUNT_SEEDS_MOCK } from 'src/app/mock_data/collect-seeds-data';
import { objectToString } from 'src/app/Models/objectToString';
import { PageHeaderModel } from 'src/app/shared/components/page-header/page-header,model';
import { CollectSeedOrderService } from '../collect-seed-order/collect-seed-order.sevice';
import { CollectSeedsService } from '../collect-seeds-table/collect-seeds.service';
import { CollectSeedOrderDetailsModel } from './collect-seed-order-details.model';
import { CollectSeedsOrderDetailsAmount0Model } from './collect-seeds-order-details-amount.model';

@Component({
  selector: 'app-collect-seed-order-details',
  templateUrl: './collect-seed-order-details.component.html',
  styleUrls: ['./collect-seed-order-details.component.scss']
})
export class CollectSeedOrderDetailsComponent implements OnInit {


  public details: any;
  public amount: CollectSeedsOrderDetailsAmount0Model;
  public headlines:{key:string,value:string}[]=[]
  public seedsHeadlines:{key:string,value:string}[]=[] 
public   globalId:objectToString


  constructor(private collectSeedOrderService:CollectSeedOrderService,private seedsService:CollectSeedsService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.seedsHeadlines = [
      { key: 'fruitsKg', value: 'משקל פירות (ק"ג)' },
      { key: 'seedsKg', value: 'משקל זרעים נטו (ק"ג)' },
      { key: 'bagsNum', value: 'מספר שקים' },
    ];
    this.headlines=[
       {key:'hebNic',value:'מין הצמח'},
       {key:'site',value:'מקור הזרע'},
       {key:'collectorName',value:'שם האוסף'},
       {key:'lastPic',value:'תאריך איסוף'},
       {key:'diaryEditorName',value:'שם הרושם'},
       {key:'diaryDate',value:'תאריך כניסה'},
       {key:'positionSourceType',value:'רישום האיסוף'},
       {key:'comments',value:'הערות לאיסוף'},
  ]
   
  this.globalId= new objectToString();
  this.globalId.globalId=this.seedsService.rowThatChooseTable.globalID_2;
  this.collectSeedOrderService.getSeedsDetailes(this.globalId).subscribe(res=>{
     
    this.collectSeedOrderService.details=res;
    this.details=this.collectSeedOrderService.details
    this.amount = AMOUNT_SEEDS_MOCK;
});
  // this.details=this.seedsService.rowThatChooseTable;
  
 
  // this.details=this.seedsService.rowThatChooseTable;
  // //  this.collectSeedOrderService.getSeedsDetailes().subscribe(res=>{
  // //    this.details=res;
  // //    this.collectSeedOrderService.details=res;
  //    this.amount = AMOUNT_SEEDS_MOCK;
  // });
  
  }

}
