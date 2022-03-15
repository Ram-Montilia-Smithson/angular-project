import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from './card-filter.model';

@Component({
  selector: 'kkl-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss'],
})
export class CardFilterComponent implements OnInit {
  @Input() filter!: FilterModel;
  @Input() filterValue!: string;

  public active$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {
  }
}