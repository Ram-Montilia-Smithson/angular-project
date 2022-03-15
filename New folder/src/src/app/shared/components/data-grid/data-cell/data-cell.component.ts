import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../../list-item/list-item.model';

@Component({
  selector: 'kkl-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.scss'],
})
export class DataCellComponent<T> implements OnInit {
  @Input() item: ListItem<T>;

  constructor() {}

  ngOnInit(): void {}
}
