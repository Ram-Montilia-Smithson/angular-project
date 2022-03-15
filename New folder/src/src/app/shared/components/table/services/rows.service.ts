// import { Injectable } from '@angular/core';
// import { Observable, combineLatest } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import { ColumnModel } from '../../columns/column.model';
// import { RowModel } from '../models/row.model';
// import { RowsState, TableOptions } from '../table.component';
// import { TableService } from './table.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class RowsService<T> {
//   constructor(private tableService: TableService<T>) {}

//   // set row$ with data$ form parent
//   private setDataRows$(
//     data$: Observable<T[]>,
//     rows: RowModel<T>[],
//     options
//   ): Observable<RowModel<T>[]> {
//     return data$.pipe(
//       map((data) => {
//         rows = this.tableService.setRows(data, options);
//         return rows;
//       })
//     );
//   }

//   private setRowState(
//     rows: RowModel<T>[],
//     state: RowsState<T>,
//     columns: ColumnModel<T>[],
//     options : TableOptions<T>,
//   ): RowModel<T>[] {
//     const { mode, row, column } = state;

//     switch (mode) {
//       case 'expand':
//         rows = this.tableService.onExpendMode(rows, row, column.columnDef);
//         break;
//       case 'form':
//         rows = this.tableService.onFormMode(rows, columns, options);
//         break;
//       case 'add':
//         rows = this.tableService.onAddFormRow(rows, columns);
//         break;

//       case 'edit':
//         rows = this.tableService.onEditMode(rows, row, columns);
//         break;
//       case 'cancel':
//         rows.shift();
//         break;
//       default:
//         break;
//     }
//     rows = rows;

//     return rows;
//   }

//   private setRowWithState$(
//     rows: RowModel<T>[],
//     data$: Observable<T[]>,
//     rowsState$: Observable<RowsState<T>>,
//     columns$: Observable<ColumnModel<T>[]>,
//     options: TableOptions<T>
//   ): Observable<RowModel<T>[]> {
//     return columns$.pipe(
//       switchMap((columns : ColumnModel<T>[]) => {
//         return combineLatest([
//           this.setDataRows$(data$, rows, options),
//           rowsState$,
//         ]).pipe(
//           map((pair) => {
//             rows = this.setRowState(pair[0], pair[1], columns, options);
//             return rows;
//           })
//         );
//       })
//     );
//   }
// }
