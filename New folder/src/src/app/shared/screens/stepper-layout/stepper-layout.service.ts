import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CardStepModel } from '../../components/cards/card-step/card-step.model';

@Injectable({
  providedIn: 'root',
})
export class StepperLayoutService {
  private stepPrefixSubject: Subject<string>;
  private stepperSubject: BehaviorSubject<CardStepModel[]>;
  private showDrawer: BehaviorSubject<boolean>;
  private showEndDrawer: BehaviorSubject<boolean>;
  private drawerSize: BehaviorSubject<number>;

  private changeStep: Subject<CardStepModel>;

  constructor() {
    this.showDrawer = new BehaviorSubject<boolean>(false);
    this.drawerSize = new BehaviorSubject<number>(1);
    this.showEndDrawer = new BehaviorSubject<boolean>(false);
    this.changeStep = new Subject<CardStepModel>();
    this.stepPrefixSubject = new Subject<string>();
  }

  public setSteps(steps: CardStepModel[]): void {
    this.stepperSubject = new BehaviorSubject<CardStepModel[]>(steps);
  }

  public getStepsObs(): Observable<CardStepModel[]> {
    return this.stepperSubject.asObservable();
  }
  public emitSteps(steps: CardStepModel[]): void {
    this.stepperSubject.next(steps);
  }

  public getStepPrefixObs(): Observable<string> {
    return this.stepPrefixSubject.asObservable();
  }
  public emitStepPrefix(prefix: string): void {
    this.stepPrefixSubject.next(prefix);
  }

  public emitDisplayDrawer(value: boolean): void {
    this.showDrawer.next(value);
  }

  public getDisplayDrawerObs(): Observable<boolean> {
    return this.showDrawer.asObservable();
  }

  public getDisplayEndDrawerObs(): Observable<boolean> {
    return this.showEndDrawer.asObservable();
  }

  public emitDisplayEndDrawer(value:boolean):void{
    this.showEndDrawer.next(value)
  }

  public emitDrawerSizeChanged(value:number) {
    this.drawerSize.next(value);
  }

  public getDrawerSizeChanged(): Observable<number> {
    
    return this.drawerSize.asObservable();
  }

  public emitChangeStep(step?: CardStepModel) {
    this.changeStep.next(step);
  }
  public getChangeStepObs(): Observable<CardStepModel> {
    return this.changeStep.asObservable();
  }
}
