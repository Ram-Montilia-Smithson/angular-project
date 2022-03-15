import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { objectToString } from 'src/app/Models/objectToString';
import { HttpService } from 'src/app/services/http.service';
import { CardStepModel } from 'src/app/shared/components/cards/card-step/card-step.model';
import { PageHeaderModel } from 'src/app/shared/components/page-header/page-header,model';

@Injectable({
  providedIn: 'root',
})
export class CollectSeedOrderService {
  details: any;

  constructor(private httpService:HttpService) {}



  //stepper section
  public steps: CardStepModel[] = [
    new CardStepModel({
      svgUrl: 'notes',
      label: 'פרטי האיסוף',
      path: 'details',  
      size: 2.8,
      spacer: true,
    }), 
    new CardStepModel({
      svgUrl: 'location_mpk',
      label: 'מיקום האיסוף',
      path: 'location',
      size: 2.8,
      spacer: true,
    }),
    new CardStepModel({
      svgUrl: 'ready_stcok_icon',
      label: 'ניהול מלאי', 
      path: 'inventory',
      size: 2.8,
      spacer: true,
    }),
  ];

  public getSteps(): CardStepModel[] {
    return [...this.steps];
  }
  getSeedsDetailes(globalId:objectToString){
  
      // let userName = localStorage.getItem('userName') || '';
      // const httpOptions = {
      //     params: new HttpParams().set("method", "getSeedsDetailes").set("globalId", globalId)
      // };
      return this.httpService.post("isufZraim/","GetSeedsCollect", globalId);
}
}
