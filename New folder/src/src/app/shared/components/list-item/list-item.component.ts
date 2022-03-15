import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from './list-item.model';

@Component({
  selector: 'kkl-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent<T> implements OnInit {

  @Input() public item: ListItem<T>;

  constructor() {}

  ngOnInit(): void {}


}
