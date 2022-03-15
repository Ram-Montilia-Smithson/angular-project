import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../../list-item/list-item.model';

@Component({
  selector: 'kkl-data-row',
  templateUrl: './data-row.component.html',
  styleUrls: ['./data-row.component.scss'],
})
export class DataRowComponent<T> implements OnInit {
  @Input() item: ListItem<T>;
  @Input() row: ListItem<T>[];
  @Input() cols: number;

  constructor() {}

  ngOnInit(): void {}
}
