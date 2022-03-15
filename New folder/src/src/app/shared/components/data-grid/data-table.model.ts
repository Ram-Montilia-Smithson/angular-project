import { ListItem } from '../list-item/list-item.model';

export interface DataTable<T> {
  columns?: ListItem<T>[];
  rows: ListItem<T>[];
}
