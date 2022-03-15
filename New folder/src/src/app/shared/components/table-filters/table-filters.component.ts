import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItem } from '../list-item/list-item.model';
import { TableFilterService } from './table-filter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'kkl-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent<T> implements OnInit {
  @Input() public dates: any;
  @Input() public filters$: Observable<ListItem<T>[]>;
  @Output() public emitDeleteFilter: EventEmitter<any> = new EventEmitter();
  @Output() public emitRemoveAllFilters: EventEmitter<any> = new EventEmitter();
  
  constructor(private tableFilterService: TableFilterService<T>) {}

  ngOnInit(): void {}

  public onFilterRemove(item: ListItem<T>): void {
    console.log(item);
    
    this.tableFilterService.removedFilterSubject.next(item);
    this.tableFilterService.remove(item);
  }

  public onClearFilters(): void {
    this.tableFilterService.clear();
    this.emitRemoveAllFilters.emit();
  }
}
