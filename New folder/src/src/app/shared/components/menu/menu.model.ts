import { MenuItemModel } from "../menu-item/menu-item.model";

export class MenuModel {
  public label?: string;
  public prefix?: string;
  public links?: MenuItemModel[];

  constructor(options: {
    label?: string;
    prefix?: string;
    links?: MenuItemModel[];
  }) {
    this.label = options?.label || '';
    this.prefix = options?.prefix || '';
    this.links = options?.links || [];
  }
}
