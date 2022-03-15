import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ColumnModel } from '../columns/column.model';
import { RowModel } from '../table/models/row.model';
import { TableEvent } from '../table/table.component';
import { filter, map, mapTo } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';

@Component({
  selector: 'kkl-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent implements OnInit {
  @Input() options: any;
  @Input() row: RowModel<Object>;
  @Input() column: ColumnModel<Object>;
  @Input() panel: MatExpansionPanel;

  // boolean for render default actions
  @Input() public hasDelete: boolean;
  @Input() public hasEdit: boolean=true;
  @Input() public editable: boolean;

  // handle table events
  @Input() public events$: Observable<TableEvent>;

  // custom button slot
  @Input() public startSlot: ElementRef;
  @Input() public endSlot: ElementRef;

  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<TableEvent> = new EventEmitter<TableEvent>();

  public editButton$: Observable<Object>;
  public showDelete$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {
    if (this.events$) {
      this.editButton$ = this.setEditButton$();
    }

    this.showDelete$ = this.handleShowDelete();
  }

  private setEditButton$() {
    return this.events$.pipe(
      map((event: TableEvent) => {
        const disabled = (event === 'edit' || event === 'create') && !this.editable;
        const show = (event === 'edit' || event === 'create' ) && this.editable;
        return { show, event, disabled };
      })
    );
  }

  private handleShowDelete() {
    if (this.events$ && this.hasDelete) {
      return this.setEditButton$().pipe(map(({ show, event }) => !show));
    } else {
      return of(this.hasDelete);
    }
  }

  public onDelete() {
    this.delete.emit();
  }

  public onEdit() {
    this.edit.emit();
  }

  public onCancel() {
    this.cancel.emit();
  }

  public onSave(event: TableEvent) {
    this.save.emit(event);
  }
}
