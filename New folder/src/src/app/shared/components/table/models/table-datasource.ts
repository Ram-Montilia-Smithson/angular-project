import { DataSource } from '@angular/cdk/collections';
import { ColumnState, RowsState, TableEvent } from '../table.component';
import { ColumnModel } from '../../columns/column.model';
import { FormDataSource } from '../../form/models/form-data-source.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class TableDataSource<T> implements DataSource<T> {
  private dataSubject: BehaviorSubject<T[]>;
  private formDataSource: FormDataSource;
  private columnSubject: BehaviorSubject<ColumnModel<T>[]>;

  private columnsStateSubject: BehaviorSubject<ColumnState<T>>;
  private rowsStateSubject: BehaviorSubject<RowsState<T>>;
  private events$: Observable<TableEvent>;

  constructor(data?) {
    this.dataSubject = new BehaviorSubject<T[]>([]);
    this.columnSubject = new BehaviorSubject<ColumnModel<T>[]>([]);

    this.columnsStateSubject = new BehaviorSubject<ColumnState<T>>(null);
    this.rowsStateSubject = new BehaviorSubject<RowsState<T>>({
      event: 'default',
    });
    this.events$ = this.setEvents();
    this.formDataSource = new FormDataSource();
  }

  disconnect(): void {}

  public load(data: T[]): void {
    this.dataSubject.next([...data]);
  }

  public connect(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  private loadColumns(columns: ColumnModel<T>[]): void {
    this.columnSubject.next([...columns]);
  }

  public connectColumns(
    columns: ColumnModel<T>[]
  ): Observable<ColumnModel<T>[]> {
    this.loadColumns(columns);
    return this.columnSubject.asObservable();
  }

  public getColumnsState(): Observable<ColumnState<T>> {
    return this.columnsStateSubject.asObservable();
  }

  public getRowsState(): Observable<RowsState<T>> {
    return this.rowsStateSubject.asObservable();
  }

  public getEvents$(filters?: TableEvent[]): Observable<TableEvent> {
    return this.events$.pipe(
      filter((event) => {
        return filters ? filters.indexOf(event) !== -1 : true;
      })
    );
  }

  private setEvents(): Observable<TableEvent> {
    return this.rowsStateSubject.pipe(
      map((state) => {
        return state.event;
      })
    );
  }

  // method to change row state to add - add form row in start of table
  public add(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'add' });
  }

  public create(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'create' });
  }
  // method to change row state to save - update new item from database
  public save(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'save' });
  }
  // method to change row state to form - change all selected rows to form state
  public form(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'form' });
  }
  // method to change row state to edit - change all selected rows to edit state
  public edit(data: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'edit' });
  }
  // method to change row state to cancel - remove first row (use with add state)
  public cancel(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'cancel' });
  }

  // method to change row state to default - remove cahnges from edit mode (use with add state)
  public close(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'close' });
  }
  // method to change row state to expand - expand row
  public expand(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'expand' });
  }
  // method to change row state to delete - load new content from server
  public delete(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'delete' });
  }

  // method to update columns options = selectOptions or filterOptions
  public updateOptions(state: ColumnState<T>) {
    this.columnsStateSubject.next({ ...state });
  }

  public updateSortDir(state: ColumnState<T>) {
    this.columnsStateSubject.next({ ...state });
  }

  private selected(data?: RowsState<T>) {
    this.rowsStateSubject.next({ ...data, event: 'selected' });
  }

  // main actions object
  public actions = {
    add: (data?: RowsState<T>) => this.add(data),
    create: (data?: RowsState<T>) => this.create(data),
    save: (data?: RowsState<T>) => this.save(data),
    form: (data?: RowsState<T>) => this.form(data),
    edit: (data: RowsState<T>) => this.edit(data),
    cancel: (data?: RowsState<T>) => this.cancel(data),
    close: (data?: RowsState<T>) => this.close(data),
    expand: (data?: RowsState<T>) => this.expand(data),
    delete: (data?: RowsState<T>) => this.delete(data),
    selected: (data?: RowsState<T>) => this.selected(data),
    updateOptions: (state: ColumnState<T>) => this.updateOptions(state),
    updateSortDir: (state: ColumnState<T>) => this.updateSortDir(state),
  };
}