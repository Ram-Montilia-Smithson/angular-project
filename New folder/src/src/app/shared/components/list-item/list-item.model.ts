export declare type ListItemKeys = 'path' | 'label' | 'svgUrl';

export interface ListItem<T> {
  key?: keyof T | string,
  type?: string,
  label?: string,
  format?: string,
  size?: number,
  value?: any,
  svgUrl?: string,
  multi?: boolean,
}

export abstract class ListItemModel {

  constructor(
    public key?: string,
    public type?: string,
    public label?: string,
    public svgUrl?: string,
    public size?: number,
  ) {
  }
}

