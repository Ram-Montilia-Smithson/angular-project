import { Injectable } from '@angular/core';
import { ListItem } from '../list-item/list-item.model';
import { Observable, map } from 'rxjs';
import { Question } from '../form/services/form.service';
import { ControlType } from '../form/models/question.model';
import { FormatPipe } from '../../pipes/format.pipe';

@Injectable({
  providedIn: 'root' 
})
export class ListService<T> {
  constructor(private format: FormatPipe) {
  }

  public findItem(items: Array<any>, key: string, value: string): any {
    return items.find((item) => item[key] === value);
  }

  public findItemIndex(items: Array<any>, key: string, value: any): number {
    return items.findIndex((item) => item[key] === value);
  }

  public handleValueOfObject(item: Object, selectors: string[]) {
    return Object.entries(item).find(
      ([key, value]) => selectors.indexOf(key) !== -1
    )[1];
  }

  private setType(item: ListItem<T>): ListItem<T> {
    const type = typeof item.value;
    const name = item.value?.constructor.name.toLowerCase();
    return {
      ...item,
      type: type !== 'object' ? type : name !== 'object' ? name : 'custom',
    };
  }

  private setFormat(item: ListItem<T>): ListItem<T> {
    const format =
      item.type === 'date'
        ? 'date'
        : item.key.toString().toLocaleLowerCase().includes('area')
        ? 'area'
        : item.type;

    return { ...item, format };
  }

  private setListKeyAndValue(
    data: any,
    labelMap: { [key: string]: string }
  ): ListItem<T>[] {
    const entries = Object.entries(data);
    return entries.map(([key, value]) => {
      const item: ListItem<T> = {
        key,
        value,
        label: labelMap[key],
      };

      return item;
    });
  }

  public setList$(
    data$: Observable<any>,
    labelMap: { [key: string]: string }
  ): Observable<ListItem<T>[]> {
    return data$.pipe(
      map((data) => {
        if (data) {
          const items: ListItem<T>[] = this.setListKeyAndValue(data, labelMap)
            .map((item) => this.setType(item))
            .map((item) => this.setFormat(item));

          return items;
        }
        return [];
      })
    );
  }

  private setQuestionListControl(
    data: any,
    labelMap: { [key: string]: string },
    controlTypes?: { [key: string]: ControlType }
  ): Question[] {
    const entries = Object.entries(data);
    return entries.map(([key, value]) => {
      const item: Question = {
        key,
        label: labelMap[key],
        controlType: controlTypes[key] || 'text',
      };

      return item;
    });
  }

  public setQuestionsList(
    model: Object,
    labelMap: { [key: string]: string },
    controlTypes?: { [key: string]: ControlType }
  ): Question[] {
    const questions: Question[] = this.setQuestionListControl(
      model,
      labelMap,
      controlTypes
    );
    return questions;
  }

  public setItemFormat(item: Object, formatMap: { [key: string]: string }) {
    const entries = Object.entries(item);
    return entries.reduce((acc, [key, value]) => {
      const item = {
        ...acc,
        [key]: this.format.transform(value, formatMap[key]),
      };

      return item;
    }, {});
  }
}