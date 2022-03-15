import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../list-item/list-item.model';
import { Palette } from 'src/styles/theme';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'kkl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T> implements OnInit {
  @Input() data$: Observable<Object>;
  @Input() template: ListItem<T>[];
  @Input() icon: {
    size?: number;
    color?: Palette;
  };
  @Input() slots: {};

  public list$: Observable<ListItem<T>[]>;

  constructor() {}
  ngOnInit(): void {
    this.list$ = this.setList(this.template);
    this.icon = this.icon || { size: 1, color: 'accent' };
  }

  private setList(template: ListItem<T>[]): Observable<ListItem<T>[]> {
    return this.data$.pipe(
      map((data) => {
        if (data) {
          return template.map((item: ListItem<T>) => {
            const listItem = { ...item };
            const key = item.key.toString();
            if (data[key]) {
              listItem.value = item?.value || data[key];
            }
            return listItem;
          });
        }
        return [];
      })
    );
  }
}
