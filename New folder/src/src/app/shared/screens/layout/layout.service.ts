import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private hideWizard$: BehaviorSubject<boolean>;

  constructor() {
    this.hideWizard$ = new BehaviorSubject<boolean>(false);
  }

  public getWizardObs(): Observable<boolean> {
    return this.hideWizard$.asObservable();
  }

  public toggleWizard(value: boolean) {
    return this.hideWizard$.next(value);
  }


}
