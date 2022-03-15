import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { FormatPipe } from 'src/app/shared/pipes/format.pipe';
import { ColumnModel, ColumnDef } from '../../columns/column.model';
import { ColumnsService, ColumnsData } from '../../columns/columns.service';
import {
  QuestionSelectModel,
  SelectOption,
} from '../../form/models/question-select.model';
import { FormService, Question } from '../../form/services/form.service';
import { ListService } from '../../list/list.service';
import { RowModel } from '../models/row.model';
import { TableOptions, RowsState } from '../table.component';
@Injectable({
  providedIn: 'root',
})
export class TableService<T> {
  constructor(
    private columnsService: ColumnsService<T>,
    private formService: FormService,
    private listService: ListService<T>,
    private format: FormatPipe
  ) {}

  public setRows(data: T[], options?: TableOptions<T>): RowModel<T>[] {
    return data.map((item: T) => {
      if (options.selected) {

        const selectable =
          options.selected.indexOf(item[options['key'] || 'id']) !== -1;
        return new RowModel({ item, selectable });
      } else {
        return new RowModel({ item });
      }
    });
  }

  public setColumns(options: {
    tableColumns: ColumnModel<T>[];
    model: T;
    filters: ColumnDef<T>[];
    selectable?: boolean;
    filterable?: boolean;
    accordion?: boolean;
    hasActions?: boolean;
  }): ColumnsData<T> {
    return this.columnsService.getColumns({ ...options });
  }

  // method for edit row
  public onEditEvent(
    rows: RowModel<T>[],
    row: RowModel<T>,
    columns: ColumnModel<T>[],
    options: any = { key: 'id' }
  ) {
    const { key } = options;
    const editRows = rows
      .filter((rowItem) => rowItem.item)
      .map((rowItem) => {
        return { ...rowItem, editable: false };
      });

    rows.map((rowItem) => {
      if (rowItem.item) {
        rowItem.editable = false;
      }
    });

    const indexToUpdate = editRows.findIndex(
      
      (rowItem) => rowItem.item[key] === row.item[key]
      
    ); 
    if (indexToUpdate !== -1) {
      if (editRows.length < rows.length) {
        rows[indexToUpdate + 1] = this.onEditRow(row, columns);
      } else {
        rows[indexToUpdate] = this.onEditRow(row, columns);
      }
    }
    return rows;

  }

  public onExpendMode(rows: RowModel<T>[], rowState: RowsState<T>) {
    const { row, column, options } = rowState;
    const { columnDef } = column;
    const { key, panel } = options;

    if (key) {
      const rowToUpdate = rows.find(
        (rowItem) => rowItem.item[key] === row.item[key]
      );

      const indexToUpdate = rows.findIndex(
        (rowItem) => rowItem.item[key] === row.item[key]
      );

      rowToUpdate.expanded = !rowToUpdate.expanded;
      rowToUpdate.expanded ? panel.open() : panel.close();
      rowToUpdate.panel = panel;
      rowToUpdate.activeColumn = panel.expanded ? columnDef : '';

      rows[indexToUpdate] = rowToUpdate;
    }

    return rows;
  }


  // method for form row
  public onFormEvent(
    rows: RowModel<T>[],
    columns: ColumnModel<T>[],
    options?: TableOptions<T>
  ): RowModel<T>[] {
    if (options?.editable) {
      const { editable } = options;
      return rows.map((row) => {
        const editRow =
          editable.indexOf(row.item['id']) > -1
            ? this.setEdit(row, columns)
            : row;
        return editRow;
      });
    } else {
      return rows.map((row) => {
        const editRow = this.setEdit(row, columns);
        return editRow;
      });
    }
  }
  
  // method for edit row
  public onEditMode(
    rows: RowModel<T>[],
    row: RowModel<T>,
    columns: ColumnModel<T>[],
    options: any = { key: 'id' }
  ) {
    const { key } = options;
    const editRows = rows
      .filter((rowItem) => rowItem.item)
      .map((rowItem) => {
        return { ...rowItem, editable: false };
      });

    rows.map((rowItem) => {
      if (rowItem.item) {
        rowItem.editable = false;
      }
    });

    const indexToUpdate = editRows.findIndex(
      
      (rowItem) => rowItem.item[key] === row.item[key]
      
    ); 
    if (indexToUpdate !== -1) {
      if (editRows.length < rows.length) {
        rows[indexToUpdate + 1] = this.onEditRow(row, columns);
      } else {
        rows[indexToUpdate] = this.onEditRow(row, columns);
      }
    }
    return rows;

  }

  
  // method for form row
  public onFormMode(
    rows: RowModel<T>[],
    columns: ColumnModel<T>[],
    options?: TableOptions<T>
  ): RowModel<T>[] {
    console.log('onFormMode');

    if (options?.editable) {
      const { editable } = options;

      return rows.map((row) => {
        const editRow =
          editable.indexOf(row.item['id']) > -1
            ? this.setEdit(row, columns)
            : row;
        return editRow;
      });
    } else {
      return rows.map((row) => {
        const editRow = this.onEditRow(row, columns);
        return editRow;
      });
    }
  }
  // method for first form row
  public onAddFormRow(
    rows: RowModel<T>[],
    columns: ColumnModel<T>[],
    item: T
  ): RowModel<T>[] {
    const row: RowModel<T> = new RowModel<T>({ item });
    const editRow = this.setEdit(row, columns);
    rows.unshift(editRow);
    return rows;
  }

  // method for first form row
  public onCreateEvent(
    rows: RowModel<T>[],
    columns: ColumnModel<T>[],
    item: T
  ): RowModel<T>[] {
    const row: RowModel<T> = new RowModel<T>({ item });
    const editRow = this.setEdit(row, columns);
    rows.unshift(editRow);
    return rows;
  }

  // method which cancel form/edit state
  public onSaveEvent(
    tableRows: RowModel<T>[],
    item: T,
    key: string
  ): RowModel<T>[] {
    const rows = [...tableRows];
    const index = this.findRowIndex(rows, key, item);
    if (index !== -1) {
      rows[index].editable = false;
    }
    return rows;
  }

  public onCloseEvent(
    tableRows: RowModel<T>[],
    item: T,
    key: string
  ): RowModel<T>[] {
    const rows = [...tableRows];
    const index = this.findRowIndex(rows, key, item);
    if (index !== -1) {
      rows[index].editable = false;
    }
    return rows;
  }

  public onDelete(
    tableRows: RowModel<T>[],
    key: string,
    item: T
  ): RowModel<T>[] {
    const rows = [...tableRows];
    const index = this.findRowIndex(rows, key, item);
    return index >= 0 ? rows.splice(index, 1) : rows;
  }

  // private methods

  private findRowIndex(rows: RowModel<T>[], key: string, item?: T): number {
    return rows.findIndex((row) => row.item[key] === item[key]);
  }

  private updateRow(row: RowModel<T>, questions: Question[]): RowModel<T> {
    const editRow = new RowModel({ ...row });
    editRow.editable = true;
    editRow.form = this.formService.createQuestionGroup({ key: '', questions });
    return editRow;
  }

  // take columns array and return Question array for formGroup
  private setQuestionsWithKey(tableColumns: ColumnModel<T>[]): Question[] {
    const columns = tableColumns;

    if (columns) {
      const questions = columns
        .filter(
          (column) =>
            column.columnDef !== 'actions' &&
            column.columnDef !== 'select' &&
            column.question !== null
        )
        .map((column: ColumnModel<T>) => {
          const { columnDef, question } = column;
          return {
            ...question,
            key: columnDef.toString(),
          };
        });
      return questions;
    }

    return [];
  }

  private setEdit(row: RowModel<T>, columns: ColumnModel<T>[]): RowModel<T> {
    const questions: Question[] = this.setQuestionsWithKey(columns);

    const editRow: RowModel<T> = this.updateRow(row, questions);
    return editRow;
  }


  private handleQuestionValue(value: any, selectors: string[]): any {
    const type = typeof value;
    const name = value.constructor.name.toLowerCase();

    return type !== 'object'
      ? value
      : name === 'date'
      ? this.format.transform(value, 'date')
      : name !== 'array'
      ? this.listService.handleValueOfObject(value, selectors)
      : value.length;
  }
  private setItemToUpdate(questions: Question[], item: Object) {
    return questions.reduce((acc, q) => {
      const key = q.key;


      const value =
        q instanceof QuestionSelectModel
          ? q.options.find((option: SelectOption) => option.label === item[key])
              .value
          : item[key];

      return {
        ...acc,
        [key]: value,
      };
    }, {});
  }

  private setItemValue(item: Object, columns: ColumnModel<T>[]) {
    const selectors = columns
      .filter((column) => column.selector !== null)
      .map((column) => column.selector);

    const questionsKeys: string[] = columns
      .filter((column) => column.question)
      .map((q) => q.columnDef.toString());

    const updateItem = questionsKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: item[key],
      };
    }, {});

    return Object.entries(updateItem)
      .map((entries) => entries)
      .reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: this.handleQuestionValue(value, selectors),
        };
      }, {});
  }


  private onEditRow(row: RowModel<T>, columns: ColumnModel<T>[]): RowModel<T> {    
    const editRow = this.setEdit(row, columns);
    const item = this.setItemValue(
      editRow.item,
      columns,
      // editRow.form.questions
    );

    console.log(editRow.form)
    console.log(item)

    editRow.form.patchValue({ ...item });
    return editRow;
  }
}
