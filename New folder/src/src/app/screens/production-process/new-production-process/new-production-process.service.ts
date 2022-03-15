import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewProductionProcessTableModel } from './new-production-process.model';

@Injectable({
  providedIn: 'root'
})
export class NewProductionProcessTableService {
  public data$:BehaviorSubject<NewProductionProcessTableModel[]>

  constructor() { 
    this.data$=new BehaviorSubject<NewProductionProcessTableModel[]>([])
    
  }

  public dataAsObs():Observable<NewProductionProcessTableModel[]>{
    return this.data$.asObservable()
  }

  public emitNewData(data:NewProductionProcessTableModel[]){
    this.data$.next(data)
  }
}
