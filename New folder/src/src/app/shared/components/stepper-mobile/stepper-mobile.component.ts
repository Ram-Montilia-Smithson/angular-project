import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { options } from 'preact';
import { Observable, BehaviorSubject, map, switchMap } from 'rxjs';
import { CardStatusModel } from '../cards/card-status/card-status.model';
import { CardStepModel } from '../cards/card-step/card-step.model';
import { ListItem } from '../list-item/list-item.model';

@Component({
  selector: 'kkl-stepper-mobile',
  templateUrl: './stepper-mobile.component.html',
  styleUrls: ['./stepper-mobile.component.scss'],
})
export class StepperMobileComponent implements OnInit {
  @Input() public activeStepIndex: number;
  @Input() public steps$: Observable<CardStatusModel[]>;
  @Output() changeStep = new EventEmitter<CardStepModel>();

  public end:number;
  public index:number = 0;
  public mapStep: any;
  public stepMap$: Observable<{ [key: string]: CardStepModel }>;
  public activeStep$: Observable<ListItem<number>>;
  public end$: Observable<boolean>;
  public width$: Observable<number>;

  constructor() { }

  ngOnInit(): void {
    this.activeStep$ = this.setActiveStep$();
    this.stepMap$ = this.setStepsMap();

    this.steps$.subscribe((step) => {
      this.mapStep = step.map((s) =>{return s})
    })
    this.end = this.mapStep.length-1;
  }

  private setActiveStep$(): Observable<ListItem<number>> {
    return this.steps$.pipe(
      map((steps) => steps.findIndex((step: CardStepModel) => step.isActive)),
      map((index: number) => {
        const item: ListItem<number> = {
          value: index,
        };
        return item;
      })
    );
  }

  private setStepsMap() {
    return this.steps$.pipe(
      map((steps: CardStatusModel[]) => {
        const map = steps.reduce((acc, step) => {
          return {
            ...acc,
            [steps.indexOf(step)]: step,
          };
        }, {});
        return map;
      })
    );
  }


  public onNext(step: CardStepModel) {
    this.mapStep.map((s,i)=>{ if(s.path === step['path']) this.index=i+1})
    this.changeStep.emit(this.mapStep[this.index]);
  }

  public onPrev(step: CardStepModel) {
    this.mapStep.map((s,i)=>{ if(s.path === step['path']) this.index=i-1})
    this.changeStep.emit(this.mapStep[this.index]);
  }

  public selectStepper(step:any){
    this.changeStep.emit(step.value);
  }
}
