import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel } from '../column.model';

@Component({
  selector: 'kkl-columns-select',
  templateUrl: './columns-select.component.html',
  styleUrls: ['./columns-select.component.scss']
})
export class ColumnsSelectComponent<T> implements OnInit {

  @Input() column: ColumnModel<T>;

  constructor() { }

  ngOnInit(): void {
  }

}
