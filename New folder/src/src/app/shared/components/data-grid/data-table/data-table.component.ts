import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListItem } from '../../list-item/list-item.model';
import { DataCellModel } from '../data-cell.model';
import { DataTable } from '../data-table.model';

@Component({
  selector: 'kkl-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T> implements OnInit {
  @Input() model: Object;
  @Input() cols: number;
  @Input() rowCols: number;

  @Input() slots: {
    column: ElementRef;
    button: ElementRef;
    custom: ElementRef;
  };

  @Input() public columns$: Observable<ListItem<T>[]>;
  @Input() public rows$: Observable<ListItem<T>[][]>;

  constructor() {}

  ngOnInit(): void {}
}
