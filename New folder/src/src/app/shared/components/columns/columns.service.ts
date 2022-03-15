import { Injectable } from '@angular/core';
import { QuestionGroupModel } from '../form/models/question-group.model';
import {
  QuestionSelectModel,
  SelectOption,
} from '../form/models/question-select.model';
import { Question } from '../form/services/form.service';
import { ListItem } from '../list-item/list-item.model';
import { FilterMap } from '../table-filters/table-filter.service';
import { ColumnDef, ColumnModel } from './column.model';

export interface ColumnsData<T> {
  columns: ColumnModel<T>[];
  columnsDefs: ColumnDef<T>[];
}

@Injectable({
  providedIn: 'root',
})
export class ColumnsService<T> {
  constructor() {}

  public updateColumnsOptions(
    columns: ColumnModel<T>[],
    key: ColumnDef<T>,
    type: 'select' | 'filter',
    options?: SelectOption[],
    selector?: string
  ): ColumnModel<T>[] {
    const index = columns.findIndex(
      (column: ColumnModel<T>) => column.columnDef === key
    );

    switch (type) {
      case 'filter':
        columns[index].filterQuestion['options'] = options;
        break;

      case 'select':
        if (selector) {
          const selectorIndex = columns[index].question['questions'].findIndex(
            (q: Question) => q.key === selector
          );
          columns[index].question['questions'][selectorIndex]['options'] =
            options;
        } else {
          columns[index].question['options'] = options;
        }
        break;
    }

    return columns;
  }
  
  public updateColumnsOptionsSelect(
    columns: ColumnModel<T>[],
    key: ColumnDef<T>,
    selected: string[]
  ): ColumnModel<T>[] {
    const index = columns.findIndex(
      (column: ColumnModel<T>) => column.columnDef === key
    );

    const options = columns[index].filterQuestion['options'];

    columns[index].filterQuestion['options'] = options.map((option) => {
      if (selected.indexOf(option['value']) !== -1) {
        option.selected = true;
      } else {
        option.selected = false;
      }
      return option;
    });

    return columns;
  }

  public recursiveColumnsOptionsUpdate(
    multiOptions: FilterMap,
    columns: ColumnModel<T>[],
    type: 'select' | 'filter',
    columnKey?: string
  ): ColumnModel<T>[] {
    Object.entries(multiOptions).map(([key, options]) => {
      if (Array.isArray(options) && !columnKey) {
        columns = this.updateColumnsOptions(columns, key, type, options);
      } else if (Array.isArray(options) && columnKey) {
        columns = this.updateColumnsOptions(
          columns,
          columnKey,
          type,
          options,
          key
        );
      } else if (!Array.isArray(options)) {
        columnKey = key;
        columns = this.recursiveColumnsOptionsUpdate(
          options,
          columns,
          type,
          columnKey
        );
      }
    });
    return columns;
  }

  public updateOptionsValue(
    valueMap: { [key: string]: ListItem<T> },
    columns: ColumnModel<T>[]
  ): ColumnModel<T>[] {
    Object.entries(valueMap).map(([columnDef, item]) => {
      const { value, key } = item;

      const index = columns.findIndex(
        (column: ColumnModel<T>) => column.columnDef === columnDef
      );

      if (key) {
        const question = columns[index].question as QuestionGroupModel;
        const questionIndex = question.questions.findIndex(
          (q) => q.key === key
        );
        question.questions[questionIndex]['value'] = value;
        columns[index].question = question;
      } else {
        const question = columns[index].question as QuestionSelectModel;
        question.value = value;
        columns[index].question = question;
      }
    });
    return columns;
  }

  private setColumnDefsFromType(model: T): ColumnDef<T>[] {
    return Object.keys(model);
  }

  private filterColumnDefs(
    columnDefs: ColumnDef<T>[],
    filters: ColumnDef<T>[]
  ): ColumnDef<T>[] {
    if (filters.length > 0) {
      const filteredColumnsDefs = columnDefs.filter(
        (item) => !filters.includes(item)
      );
      return filteredColumnsDefs;
    } else {
      return columnDefs;
    }
  }

  private setColumnDefs(model: T, filters: ColumnDef<T>[]): ColumnDef<T>[] {
    return this.filterColumnDefs(this.setColumnDefsFromType(model), filters);
  }

  private setColumnWithColumnDefs(
    columns: ColumnModel<T>[],
    columnDefs: ColumnDef<T>[]
  ): ColumnModel<T>[] {
    return columns.map((column, i) => {
      if (column.columnDef === 'select') {
        i++;
      }

      return new ColumnModel<T>({
        ...column,
        columnDef: column.columnDef || columnDefs[i],
      });
    });
  }

  private setColumnDefsFromColumns(
    columns: ColumnModel<T>[],
    columnDefs: ColumnDef<T>[]
  ): ColumnDef<T>[] {
    if (columns.length > columnDefs.length) {
      columnDefs = columns.map((column) => column.columnDef);
    }
    return columnDefs;
  }

  private initColumnsDefs(model: T, filters: ColumnDef<T>[]): ColumnDef<T>[] {
    return this.setColumnDefs(model, filters);
  }

  private getColumnsDefs(
    columns: ColumnModel<T>[],
    columnDefs: ColumnDef<T>[]
  ) {
    return this.setSelect(this.setColumnDefsFromColumns(columns, columnDefs));
  }

  private setSelect(columns: ColumnDef<T>[]): ColumnDef<T>[] {
    const newColumns = [...columns];
    const index = newColumns.findIndex((columnDef) => columnDef === 'select');

    if (index < 0 || index === 0) {
      return newColumns;
    }

    const selectColumn: ColumnDef<T> = newColumns.find(
      (columnDef) => columnDef === 'select'
    );
    newColumns.splice(index, 1);

    const updateColumns = [selectColumn, ...newColumns];

    return updateColumns;
  }

  private addSelectColumn(columns: ColumnModel<T>[]): ColumnModel<T>[] {
    const columnsWithSelect = [...columns];

    const column = new ColumnModel<T>({
      columnDef: 'select',
      type: 'select',
      selectable: true,
    });

    columnsWithSelect.unshift(column);

    return columnsWithSelect;
  }
  private addActionsColumn(columns: ColumnModel<T>[]): ColumnModel<T>[] {
    const columnsWithActions = [...columns];
    const column = new ColumnModel<T>({
      columnDef: 'actions',
      type: 'actions',
    });

    columnsWithActions.push(column);
    return columnsWithActions;
  }

  private findColumn(columns: ColumnModel<T>[], key: ColumnDef<T>): boolean {
    return !!columns.find((column: ColumnModel<T>) => column.columnDef === key);
  }

  private setColumnsWithState(
    hasActions,
    filterable
  ): (columns: ColumnModel<T>[]) => ColumnModel<T>[] {
    return (columns: ColumnModel<T>[]) => {
      let newColumns = [...columns];

      if (filterable) {
        newColumns = this.setSelectAndFilter(newColumns);
      }

      if (hasActions) {
        newColumns = this.addActionsColumn(newColumns);
      }

      return newColumns;
    };
  }

  public getColumns(options: {
    model: T;
    tableColumns: ColumnModel<T>[];
    filters: ColumnDef<T>[];
    filterable?: boolean;
    selectable?: boolean;
    hasActions?: boolean;
  }): ColumnsData<T> {
    const { model, tableColumns, selectable, filterable, hasActions, filters } =
      options;

    const columnWithState = this.setColumnsWithState(
      hasActions,
      filterable
    )(tableColumns);
    const columnsDefs = this.initColumnsDefs(model, filters);
    const columns = this.unShiftSelect(
      this.setColumnWithColumnDefs(columnWithState, columnsDefs),
      selectable
    );

    return {
      columns: columns,
      columnsDefs: this.getColumnsDefs(columns, columnsDefs),
    };
  }

  private unShiftSelect(columns, selectable) {
    if (selectable) {
      return this.addSelectColumn(columns);
    }
    return columns;
  }

  private setSelectAndFilter(columns: ColumnModel<T>[]) {
    return columns.map((column: ColumnModel<T>) => {
      return new ColumnModel({
        ...column,
        filterable: true,
        sortable: true,
      });
    });
  }
}
