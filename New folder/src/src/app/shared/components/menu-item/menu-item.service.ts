import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItemModel } from './menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  constructor() {}

  public getActiveObs($active: BehaviorSubject<boolean>): Observable<boolean> {
    return $active.asObservable();
  }

  public active(item: MenuItemModel): MenuItemModel {
    return new MenuItemModel({ ...item, isActive: true });
  }
  public unactive(item: MenuItemModel): MenuItemModel {
    return new MenuItemModel({ ...item, isActive: false });
  }
}
