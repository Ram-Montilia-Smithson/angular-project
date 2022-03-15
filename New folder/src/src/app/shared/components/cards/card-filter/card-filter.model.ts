import { MenuItemModel } from '../../menu-item/menu-item.model';

export class FilterModel extends MenuItemModel {
  public size?: number;
  public scale?: number;
  public divider?: boolean;
  public spacer?: boolean;
  public value?: number;
  public filterValue?:string

  constructor(options?: {
    label?: string;
    filterValue?: string;
    path?: string;
    svgUrl?: string;
    isActive?: boolean;
    size?: number;
    scale?: number;
    divider?: boolean;
    spacer?: boolean;
    value?: number;
  }) {
    super(options);
    this.label = options?.label || '';
    this.filterValue = options?.filterValue || '';
    this.path = options?.path || '';
    this.isActive = options?.isActive || false;
    this.svgUrl = options?.svgUrl || '';
    this.size = options?.size || 80;
    this.scale = options?.scale || 1;
    this.value = options?.value || null;
    this.divider = options?.divider || false;
    this.spacer = options?.spacer || false;
  }
}
