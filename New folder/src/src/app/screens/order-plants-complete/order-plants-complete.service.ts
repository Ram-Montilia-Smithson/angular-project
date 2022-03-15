import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewOrderPlantsCompleteService {
  private showShortTable$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private showPrsonTale$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private filterValue$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'all'
  );
  constructor() {}

  public showShortTableAsObs(): Observable<boolean> {
    return this.showShortTable$.asObservable();
  }

  public emitShowShortTable(value: boolean): void {
    console.log('service short table'+value);

    this.showShortTable$.next(value);
  }
  public showShowPrsonTaleAsObs(): Observable<boolean> {
    return this.showPrsonTale$.asObservable();
  }

  public emitShowPrsonTale(value: boolean): void {
    console.log(value);

    this.showPrsonTale$.next(value);
  }

  public filterValueAsObs(): Observable<string> {
    return this.filterValue$.asObservable();
  }

  public emitfilterValue(value: string): void {
    console.log(value);

    this.filterValue$.next(value);
  }
}
