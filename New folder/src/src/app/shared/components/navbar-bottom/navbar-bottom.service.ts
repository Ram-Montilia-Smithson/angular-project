import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarBottomService {
  private nextStep: Subject<void>;

  constructor() {
    this.nextStep = new Subject<void>();
  }

  public emitNextStep() {
    this.nextStep.next();
  }
  public getNextStepObs() {
    return this.nextStep.asObservable();
  }
}
