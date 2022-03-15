import { Injectable } from '@angular/core';
import { FilterOption } from '../columns/column-filter/column-filter.component';
import { ListItem } from '../list-item/list-item.model';
import { NavbarService } from '../navbar/navbar.service';
import { CardStatusModel } from '../cards/card-status/card-status.model';
import { SelectOption } from '../form/models/question-select.model';
import { map, switchMap, filter, skipWhile, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { constrainPoint } from '@fullcalendar/angular';
import { ListService } from '../list/list.service';

type FilterEvent =
  | 'push'
  | 'update'
  | 'insert'
  | 'pushMany'
  | 'range'
  | 'clear'
  | 'remove'
  | '';

export interface TableFilterOption<T> {
  event?: FilterEvent;
  key?: keyof ListItem<T>;
  item?: ListItem<T>;
  filters?: ListItem<T>[];
  selected?: any[];
  selectedOptions?: SelectOption[];
}

export declare type FilterMap = { [key: string]: SelectOption[] };

@Injectable({
  providedIn: 'root',
})
export class TableFilterService<T> {
  private filterEventsSubject: BehaviorSubject<TableFilterOption<T>>;
  private filtersSubject: BehaviorSubject<ListItem<T>[]>;
  public filtersStateSubject: BehaviorSubject<ListItem<T>[]>;
  public removedFilterSubject: BehaviorSubject<ListItem<T>>;

  constructor(
    private navbarService: NavbarService,
  ) {
    this.filterEventsSubject = new BehaviorSubject<TableFilterOption<T>>({
      event: '',
    });

    this.filtersSubject = new BehaviorSubject<ListItem<T>[]>([]);
    this.removedFilterSubject = new BehaviorSubject<ListItem<T>>(null);
    this.filtersStateSubject = new BehaviorSubject<ListItem<T>[]>([]);

    this.filtersSubject.subscribe((data) => {
      console.log("tableFilterService.filtersSubject", data)
    })
  }
  private mapFiltersToObject(
    filters: ListItem<T>[],
    multiFilters: string[]
  ): FilterMap {
    console.log(filters);
    
    const result: FilterMap[] = filters.reduce((acc, item) => {
      const find = acc.find((obj) => {
        if (obj.key === item.key) {
          return obj;
        }
      });

      if (find) {
        const i = acc.findIndex((a) => a.key === find.key);
        find.options.push({ value: item.value, label: item.label });
        acc[i] = find;
      } else {
        const options = [];
        options.push({ value: item.value, label: item.label });
        acc.push({ key: item.key, options });
      }
      return acc;
    }, []);

    let selectedMap: FilterMap = result.reduce((acc, item) => {
      return {
        ...acc,
        [item.key.toString()]: item.options,
      };
    }, {});

    const selectKeys: string[] = Object.keys(selectedMap);

    if (multiFilters.length > selectKeys.length) {
      selectedMap = multiFilters
        .filter((key) => selectKeys.indexOf(key) === -1)
        .reduce((acc, key) => {
          return {
            ...selectedMap,
            ...acc,
            [key]: [],
          };
        }, {});
    }

    return selectedMap;
  }

  public getFiltersAfterRemove(multiFilters: string[]) {
    return this.getFilterEventByFilter(['remove', 'clear']).pipe(
      switchMap(() => {
        return merge(this.onFilterRemove(), this.onFilterCLear()).pipe(
          map((filters: ListItem<T>[]) => {
            return filters.length > 0
              ? filters
                  .filter((filter) => filter.multi)
                  .map((item) => {
                    return {
                      key: item.key,
                      value: item.value,
                      label: item.label,
                    };
                  })
              : null;
          }),
          map((filters: ListItem<T>[]) => {
            if (filters) {
              return this.mapFiltersToObject(filters, multiFilters);
            } else {
              return { plantSpecies: [], seedSperm: [] ,collectedBy:[],status:[]};
            }
          })
        );
      })
    );
  }

  public getRemovedFilter(): Observable<ListItem<T>> {
    return this.getFilterEventByFilter(['remove', 'clear']).pipe(
      map((option: TableFilterOption<T>) => {
        const { item } = option;
        console.log(item);
        
        return item;
      })
    );
  }

  public getFiltersByKey(
    key: string,
    events: FilterEvent[]
  ): Observable<ListItem<T>[]> {
    return this.getFilterEventByFilter(events).pipe(
      skipWhile((events) => events.event === ''),
      switchMap(() => {
        return this.filtersSubject.asObservable().pipe(
          map((filters: ListItem<T>[]) => {
            return filters.filter((filter) => filter.key === key);
          })
        );
      })
    );
  }

  public getFilterMap(events?: FilterEvent[]) {
    return this.getFilterEventByFilter(events).pipe(
      switchMap(() => {
        return this.filtersSubject.asObservable().pipe(
          map((filters: ListItem<T>[]) => {
            return filters.reduce((acc, item) => {
              return {
                ...acc,
                [item.key]: item.value,
              };
            }, {});
          })
        );
      })
    );
  }

  public getFilterEventByFilter(events?: FilterEvent[]) {
    return this.filterEventsSubject
      .asObservable()
      .pipe(
        filter((filterEvent: TableFilterOption<T>) =>
          events ? events.indexOf(filterEvent.event) !== -1 : true
        )
      );
  }

  private getFiltersFromNavbar(active: boolean): Observable<ListItem<T>[]> {
    return this.navbarService.getSelectStatusObs().pipe(
      skipWhile((card: CardStatusModel) => !card || !active),
      map((card: CardStatusModel) =>
        card.options.map((option: SelectOption) =>
          this.setListItem({
            label: option.label,
            value: option.value,
            key: 'status',
            multi: true,
          })
        )
      ),
      switchMap((statusFilters: ListItem<T>[]) => {
        return this.filtersSubject.asObservable().pipe(
          map((filters) => {
            statusFilters.map((item) => {
              filters.push(item);
            });
            return filters;
          })
        );
      })
    );
  }

  private findOption(
    options: ListItem<T>[],
    value: string,
    key: keyof ListItem<T>
  ): Observable<boolean> {
    return of(!!options.find((item) => item[key] === value));
  }

  private onFilterInsert(item: ListItem<T>): Observable<ListItem<T>[]> {
    console.log("tableFilterService.onFilterInsert", item)
    return this.filtersSubject.asObservable().pipe(
      map((filters: ListItem<T>[]) => {
        filters.push(this.setListItem(item));
        return filters;
      })
    );
  }

  private setFilterType(value: any) {}

  public setListItem(option: ListItem<T>) {
    const item: ListItem<T> = {
      ...option,
    };

    return item;
  }

  private onPushMany(
    filters: ListItem<T>[],
    filterOption: TableFilterOption<T>
  ) {
    const {
      selectedOptions,
      item: { key },
    } = filterOption;

    const existFilters = [...filters]
      .filter((item: ListItem<T>) => item.key === key)
      .map((filter) => filter.value);

    if (selectedOptions.length > existFilters.length) {
      const option = selectedOptions.find(
        (select: SelectOption) => existFilters.indexOf(select.value) === -1
      );

      const item = this.setListItem({
        label: option.label,
        value: option.value,
        key: key.toString(),
        multi: true,
      });
      filters.push(item);
    }

    if (selectedOptions.length < existFilters.length) {
      const filterToDelete = existFilters.filter(
        (select: SelectOption) => selectedOptions.indexOf(select.value) === -1
      )[0];

      const index = filters.findIndex(
        (filter) => filter.value === filterToDelete
      );

      filters.splice(index, 1);
    }

    return filters;
  }

  private onFilterPushMany() {
    return this.getFilterEventByFilter(['pushMany']).pipe(
      switchMap((filterOption: TableFilterOption<T>) => {
        return this.filtersSubject.asObservable().pipe(
          map((filters: ListItem<T>[]) => {
            return filters;
          }),
          map((filters: ListItem<T>[]) => {
            return this.onPushMany(filters, filterOption);
          })
        );
      })
    );
  }

  // method to find filter in filters array : return item
  private findFilter(
    filters: ListItem<T>[],
    value: string,
    key: keyof ListItem<T>
  ): ListItem<T> {
    return filters.find((item: ListItem<T>) => item[key] === value);
  }

  // method to find filter index in filters array : return number
  private findItemIndex(
    filters: ListItem<T>[],
    value: string,
    key?: keyof ListItem<T>
  ): number {
    return filters.findIndex(
      (item: ListItem<T>) => item[key || 'value'] === value
    );
  }

  // method which update filter item
  private updateFilters(
    filters: ListItem<T>[],
    item: ListItem<T>
  ): ListItem<T>[] {
    const index: number = this.findItemIndex(
      filters,
      item.key.toString(),
      'key'
    );
    const filter = this.findFilter(filters, item.key.toString(), 'key');
    filter.value = item.value;
    filters[index] = item;
    return filters;
  }

  private onFilterUpdate(item): Observable<ListItem<T>[]> {
    console.log("tableFilterService.onFilterUpdate", item)
    return this.filtersSubject.asObservable().pipe(
      map((filters: ListItem<T>[]) => {
        return this.updateFilters(filters, item);
      })
    );
  }

  private onFilterPush(): Observable<ListItem<T>[]> {
    return this.filtersSubject.asObservable().pipe(
      switchMap((filters: ListItem<T>[]) => {
        return this.getFilterEventByFilter(['push']).pipe(
          switchMap((filterOption: TableFilterOption<T>) => {
            console.log("tableFilterService.onFilterPush", filterOption)
            const { item } = filterOption;
            return this.findOption(filters, item.key.toString(), 'key').pipe(
              switchMap((found: boolean) => {
                return found
                  ? this.onFilterUpdate(filterOption.item)
                  : this.onFilterInsert(filterOption.item);
              })
            );
          })
        );
      })
    );
  }

  private removeFilter(
    filters: ListItem<T>[],
    value: any,
    key?: keyof ListItem<T>
  ): ListItem<T>[] {
    console.log("tableFilterService.removeFilter", filters, value, key)
    const index: number = this.findItemIndex(filters, value, key);
    if (index !== -1) {
      filters.splice(index, 1);
    }
    return filters;
  }

  private onFilterRemove(): Observable<ListItem<T>[]> {
    return this.getFilterEventByFilter(['remove']).pipe(
      switchMap((filterOption: TableFilterOption<T>) => {
        console.log("tableFilterService.onFilterRemove")
        return this.filtersSubject.asObservable().pipe(
          map((filters: ListItem<T>[]) => {
            const { item } = filterOption;
            return item.multi
              ? this.removeFilter(filters, item.value, 'value')
              : this.removeFilter(filters, item.key, 'key');
          })
        );
      })
    );
  }

  private onFilterCLear() {
    return this.getFilterEventByFilter(['clear']).pipe(
      switchMap(() => {
        return this.filtersSubject.asObservable().pipe(
          map((filters: ListItem<T>[]) => {
            filters.splice(0, filters.length);
            return filters;
          })
        );
      })
    );
  }

  // main method to get arrayFilters$ form display - call Once!!!
  public getFilters$(active: boolean): Observable<ListItem<T>[]> {
    return merge(
      this.filtersSubject.asObservable(),
      this.onFilterPush(),
      this.onFilterPushMany(),
      this.onFilterRemove(),
      this.onFilterCLear(),
      this.getFiltersFromNavbar(active)
    ).pipe(
      tap((filters) => {
        console.log("tableFilterService.getFilters$", filters)

        this.filtersStateSubject.next(filters);
      })
    );
  }

  public emitFiltersObs(filters: ListItem<T>[]): void {
    return this.filtersSubject.next(filters);
  }
  
  public returnFiltersObs(): Observable<ListItem<T>[]> {
    return this.filtersStateSubject.asObservable();
  }


  // Filter Events Section
  public clear() {
    this.filterEventsSubject.next({ event: 'clear' });
  }

  public remove(item: ListItem<T>) {
    this.filterEventsSubject.next({
      event: 'remove',
      item,
    });
  }

  public push(filterOption: FilterOption<T>) {
    console.log("tableFilterService.push", filterOption)
    const {
      column: { columnDef, format },
      label,
      value,
    } = filterOption;

    if (label.length > 0 && label !== undefined) {
      this.filterEventsSubject.next({
        event: 'push',
        item: {
          key: columnDef,
          label,
          value,
          format: format !== 'currency' ? format : '',
          type: typeof value,
        },
      });
    } else {
      this.remove({ key: columnDef });
    }
  }

  public pushMany(tableFilter: TableFilterOption<T>) {
    console.log(tableFilter);

    this.filterEventsSubject.next({
      event: 'pushMany',
      ...tableFilter,
    });
  }

  // FILTER DATA SECTION

  public filterFormServer(data$: Observable<T[]>, callback): Observable<T[]> {

    return data$.pipe(
      switchMap((data: T[]) => {
        return this.filtersStateSubject.asObservable().pipe(
          switchMap((filters: ListItem<T>[]) => {
            if (filters.length > 0) {
              const results: Observable<T[]> = callback(filters);
              return results;
            }

            return of(data);
          })
        );
      })
    );
  }

  // filter locally
  public filter(data$: Observable<T[]>, callback?): Observable<T[]> {
    return combineLatest([
      this.getFilterMap(['push', 'pushMany', 'clear', 'remove', '']),
      data$,
    ]).pipe(
      map(([filtersMap, data]) => {
        let results = [...data];
        results = data.filter((item) =>
          this.filterData(item, filtersMap, callback)
        );
        console.log(results);
        
        return results;
      })
    );
  }

  private filterData(item: T, filtersMap, callback?): boolean {
    return Object.keys(filtersMap).every((key: string) =>
      callback
        ? callback(item, key, filtersMap)
        : this.defaultFilter(item, key, filtersMap)
    );
  }

  public defaultFilter(item, key, filtersMap) {
    return item[key]?.toString().includes(filtersMap[key]);
  }


// get table filter removed obs

public getTableFilterRemovedAsObs(){
  return this.removedFilterSubject.asObservable()
}


}
