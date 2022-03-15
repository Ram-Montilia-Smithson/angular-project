import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { ListService } from 'src/app/shared/components/list/list.service';
import { TableFilterService } from 'src/app/shared/components/table-filters/table-filter.service';
import {
  RowsState,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { AreaActionsModel } from './area-actions-table.model';
import { AreaActionsTableService } from './area-actions-table.service';

@Component({
  selector: 'app-area-actions-table',
  templateUrl: './area-actions-table.component.html',
  styleUrls: ['./area-actions-table.component.scss'],
  providers: [ListService, TableFilterService],
})
export class AreaActionsTableComponent implements OnInit {
  public data$: Observable<AreaActionsModel[]>;
  public rowsState$: BehaviorSubject<RowsState<AreaActionsModel>>;
  public model: AreaActionsModel = new AreaActionsModel();
  public columns$: Observable<ColumnModel<AreaActionsModel>[]>;

  constructor(private areaActionsTableService: AreaActionsTableService) {}

  public columns: ColumnModel<AreaActionsModel>[] = [
    new ColumnModel({ label: 'סוג הפעולה' }),
    new ColumnModel({ label: 'שטח מוערך' }),
    new ColumnModel({ label: 'מין הצומח',}),
    new ColumnModel({ label: 'דגם הדילול' }), 
    new ColumnModel({ label: 'צפיפות ממוצעת רצויה' }), 
  ];
  '';
  ngOnInit(): void {
    this.data$ = this.areaActionsTableService.getTabledata();
    this.setRowsState();
    this.columns$ = of(this.columns);
  }

  private setRowsState() {
    this.rowsState$ = new BehaviorSubject<RowsState<AreaActionsModel>>({
      event: 'default',
    });
  }

  private pagination: PaginationInstance = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<AreaActionsModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };
}
