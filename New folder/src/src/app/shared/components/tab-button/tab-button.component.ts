import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { ColumnDef } from '../columns/column.model';

@Component({
  selector: 'kkl-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButton<T> implements OnInit {
  @Input() row: RowModel<T>;
  @Input() item: any;
  @Input() columnDef: ColumnDef<T>;
  @Input() label: string;
  @Input() activeColumnDef$: Observable<void>;

  public active: boolean = false;
  public active$: Observable<boolean>;
  public contacts: boolean;
  public raised: boolean;
  public show: boolean;
  public button: boolean;

  @Output() expandEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

    this.active$ = this.activeColumnDef$.pipe(
      map(() => {
        if(this.row.panel) {
        }
        return (
          this.row.panel?.expanded && this.columnDef === this.row.activeColumn
        );
      })
    );
  }

  public onClick() {
    this.expandEvent.emit();
  }
}
