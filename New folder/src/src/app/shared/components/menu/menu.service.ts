import { Injectable } from '@angular/core';
import { MenuModel } from './menu.model';
import { MenuItemModel } from '../menu-item/menu-item.model';
import { ListItemKeys } from '../list-item/list-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {


  private modulePrefix: string;

  constructor() { }



  public getPrefix(): string {
    return this.modulePrefix;
  }

  public setPrefix(modulePrefix: string) {
    this.modulePrefix = modulePrefix;
  }

  // METHODS TO HANDLE ACTIVE STEP STATUS
  private activeStep(items: MenuItemModel[], key: ListItemKeys, value: any) {
    items.find((item) => {
      if (item[key] === value) {
        item.active();
      }
    });
  }

  private unactiveStep(items: MenuItemModel[]) {
    items.find((item) => {
      if (item.isActive) {
        item.unactive();
      }
    });
  }

  public setSteps(
    items: MenuItemModel[],
    key: ListItemKeys,
    value: string
  ): MenuItemModel[] {
    this.unactiveStep(items);
    this.activeStep(items, key, value);
    return [...items];
  }

  public setList(
    menu: MenuModel[],
    key: ListItemKeys,
    value: string
  ): MenuModel[] {
    const updateMenu = [...menu];
    updateMenu.find((list) => {
      if (list.prefix === this.modulePrefix) {
        list.links = this.setSteps(list.links, key, value);
      }
    });
    return updateMenu;
  }
  public setMenu(
    menu: MenuModel[],
    modulePrefix: string,
    key: ListItemKeys,
    value: string,
  ): MenuModel[] {
    const updateMenu = [...menu];
    updateMenu.find((list) => {
      if (list.prefix === modulePrefix) {
        list.links = this.setSteps(list.links, key, value);
      }
    });
    return updateMenu;
  }

  
}
