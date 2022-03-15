import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { NEW_SPATITAL_TABLE_DATA } from 'src/app/mock_data/spatial-production-data';
import { SortOption } from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { SelectOption } from 'src/app/shared/components/form/models/question-select.model';
import { ListItem } from 'src/app/shared/components/list-item/list-item.model';
import { TableFilterService } from 'src/app/shared/components/table-filters/table-filter.service';
import { NewSpatialTableModel } from '../new-spatial-table/new-spatial-table.model';

@Injectable({
  providedIn: 'root',
})
export class NewSpatialTableDataFiltersService {
  constructor(
    private http: HttpClient,
    private tableFilterService: TableFilterService<NewSpatialTableModel>
    ) {}

  public searchSCData(
    filters: ListItem<NewSpatialTableModel>[],
    sortField?: SortOption<NewSpatialTableModel>,
    getAllFlag?: boolean
  ) {
    return this.getSCData().pipe(
      map((data) => {
        return data;
      })
    );
  }

  getFilterOptions(): Observable<SelectOption[][]> {
    const minHatzemach: SelectOption[] = [
      { value: 1, label: '1u', selected: false },
      { value: 31, label: '2u1' },
      { value: 14, label: '15u' },
      { value: 61, label: '6u1' },
    ];
    const kamut: SelectOption[] = [
      { value: 12, label: 'u12' },
      { value: 31, label: '2u1' },
      { value: 14, label: '15u' },
      { value: 61, label: '61u' },
      { value: 61231, label: '667901u' },
      { value: 6141, label: '6170970u' },
      { value: 63561, label: '667891u' },
      { value: 62451, label: '6891u' },
      { value: 623561, label: '65781u' },
      { value: 623641, label: '64671u' },
      { value: 62341, label: '34661u' },
    ];
    const ezor: SelectOption[] = [{ value: 13, label: '1u3' }];
    const kibul: SelectOption[] = [{ value: 14, label: '1y4' }];
    const ribuy: SelectOption[] = [{ value: 15, label: '1u5' }];
    const makor: SelectOption[] = [{ value: 16, label: '1u6' }];
    const hearot: SelectOption[] = [{ value: 17, label: '1u7' }];

    return of([minHatzemach, kamut, ezor, kibul, ribuy, makor, hearot]);
  }

  private getSCData(search?: any) {
    return of(NEW_SPATITAL_TABLE_DATA);
  }

  public getFiltersMap() {
    return this.getFilterOptions().pipe(
      map((filters) => {
        const minHatzemach = filters[0];
        const kamut = filters[1];
        const ezor = filters[2];
        const kibul = filters[3];
        const ribuy = filters[4];
        const makor = filters[5];
        const hearot = filters[6];

        return { minHatzemach, kamut, ezor, kibul, ribuy, makor, hearot };
      })
    );
  }
}
