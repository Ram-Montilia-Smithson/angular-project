import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AMOUNT_INVENTORY_MOCK } from 'src/app/mock_data/collect-seeds-data';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { ListService } from 'src/app/shared/components/list/list.service';
import { TableFilterService } from 'src/app/shared/components/table-filters/table-filter.service';
import {
  RowsState,
  TableOptions,
} from 'src/app/shared/components/table/table.component';
import { StepperLayoutService } from 'src/app/shared/screens/stepper-layout/stepper-layout.service';
import { CollectSeedsOrderInventoryTableModel } from './collect-seeds-order-inventory-table.model';
import { CollectSeedsOrderInventoryTableService } from './collect-seeds-order-inventory-table.service';
import { CollectSeedsOrderInventoryModel } from './collect-seeds-order-inventory.model';

@Component({
  selector: 'app-collect-seeds-order-inventory',
  templateUrl: './collect-seeds-order-inventory.component.html',
  styleUrls: ['./collect-seeds-order-inventory.component.scss'],
  providers: [ListService, TableFilterService],
})
export class CollectSeedsOrderInventoryComponent implements OnInit {
  public inventoryDetails: CollectSeedsOrderInventoryModel;
  public inventoryHeadlines: { key: string; value: string }[] = [];
  public isDrawerOpen: boolean = false;
  index: number | string;
  toggle: boolean = false;

  public data$: Observable<CollectSeedsOrderInventoryTableModel[]>;
  public rowsState$: BehaviorSubject<
    RowsState<CollectSeedsOrderInventoryTableModel>
  >;
  public model: CollectSeedsOrderInventoryTableModel =
    new CollectSeedsOrderInventoryTableModel();
  public columns$: Observable<
    ColumnModel<CollectSeedsOrderInventoryTableModel>[]
  >;

  constructor(
    private invntoryTableServiece: CollectSeedsOrderInventoryTableService,
    private stepperLayoutService: StepperLayoutService
  ) {}

  public columns: ColumnModel<CollectSeedsOrderInventoryTableModel>[] = [
    new ColumnModel({ label: 'ת. הוצאה', center: true, colspan: 2 }),
    new ColumnModel({ label: 'מ. תעודת משלוח', center: true, colspan: 2 }),
    new ColumnModel({ label: 'כמות זרעים שיצאו', center: true, colspan: 2 }),
  ];

  ngOnInit(): void {
    this.inventoryHeadlines = [
      { key: 'SeedsKg', value: 'משקל זרעים נטו (ק"ג)' },
      { key: 'remainningWeigh', value: 'משקל נותר' },
      { key: 'shelf', value: 'מספר מדף' },
    ];
    this.inventoryDetails = AMOUNT_INVENTORY_MOCK;
    this.data$ = this.invntoryTableServiece.getTabledata();
    this.data$.subscribe((data) => console.log(data));

    this.setRowsState();
    this.columns$ = of(this.columns);

    this.stepperLayoutService.getDrawerSizeChanged().subscribe((width) => {
      console.log(width);
      
      this.isDrawerOpen = +width < 30 ? false : true;
      console.log(this.isDrawerOpen);
      
      return null;
    });
  }

  private setRowsState() {
    this.rowsState$ = new BehaviorSubject<
      RowsState<CollectSeedsOrderInventoryTableModel>
    >({
      event: 'default',
    });
  }

  private pagination: PaginationInstance = {
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<CollectSeedsOrderInventoryTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };
}
