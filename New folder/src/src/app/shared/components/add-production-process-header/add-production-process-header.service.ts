import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ADD_SPATIAL_HEADER } from 'src/app/mock_data/production-process';
import { ProductionProcessHeaderModel } from './production-process-header.model';

@Injectable({
  providedIn: 'root',
})
export class AddProductionProcessHeaderService {
  private headerItems$: BehaviorSubject<ProductionProcessHeaderModel[]>;
  private comment$: BehaviorSubject<string>;

  constructor() {
    this.comment$ = new BehaviorSubject<string>('');
    this.headerItems$ = new BehaviorSubject<ProductionProcessHeaderModel[]>([]);
  }
  public getComment(): Observable<string> {
    return this.comment$.asObservable();
  }

  public emitComment(comment: string): void {
    this.comment$.next(comment);
  }

  public getAddSpatialHeaderItems(): Observable<
    ProductionProcessHeaderModel[]
  > {
    return this.headerItems$.asObservable();
  }

  public emitAddSpatialHeaderItems(
    items: ProductionProcessHeaderModel[]
  ): void {
    this.headerItems$.next(items);
  }
}
