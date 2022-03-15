import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeAll, tap } from 'rxjs/operators';
import { FormOption } from 'src/app/shared/components/form/models/form-data-source.model';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { CollectContestWorkInstructionsStandModel } from './collect-contest-work-instructions-stand.model';

// export interface SelectedContacts {
//   row: RowModel<CollectContestWorkInstructionsStandModel>;
//   selected: ContactModel[];
// }
// export declare type SelectedContactsMap = { [key: string]: ContactModel[] };

@Injectable({
  providedIn: 'root',
})
export class CollectContestWorkInstructionsStandService {
  private dataSource: TableDataSource<CollectContestWorkInstructionsStandModel>;
//   private selectedSuppliers: BehaviorSubject<CollectContestWorkInstructionsStandModel[]>;
//   private selectedContacts: BehaviorSubject<SelectedContacts>;

  constructor() {
    // this.selectedSuppliers = new BehaviorSubject<CollectContestWorkInstructionsStandModel[]>([]);
    // this.selectedContacts = new BehaviorSubject<SelectedContacts>({
    //   row: null,
    //   selected: [],
    // });
  }

  public setDataSource(dataSource: TableDataSource<CollectContestWorkInstructionsStandModel>) {
    this.dataSource = dataSource;
  }
  public getDataSource() {
    return this.dataSource;
  }

//   public getSuppliersLength() {
//     return of(SUPPLIER_TABLE_DATA).pipe(map((suppliers) => suppliers.length));
//   }

//   // methods to handle selected suppliers
//   public emitSelectedSuppliers(selected: CollectContestWorkInstructionsStandModel[]): void {
//     this.selectedSuppliers.next(selected);
//   }

//   public getSelectedSuppliersObs(): Observable<CollectContestWorkInstructionsStandModel[]> {
//     return this.selectedSuppliers.asObservable();
//   }

//   // methods to handle selected contacts
//   public emitSelectedContacts(selected: SelectedContacts): void {
//     this.selectedContacts.next(selected);
//   }

//   public getSelectedContactsObs(): Observable<SelectedContacts> {
//     return this.selectedContacts.asObservable();
//   }

//   public addNewSupplier() {
//     this.dataSource.add({ options: { item: new CollectContestWorkInstructionsStandModel({}) } });
//   }

//   public addSupplier(formOption: FormOption): Observable<CollectContestWorkInstructionsStandModel[]> {
//     const { value } = formOption;

//     // TODO - get supplier from server - as array or single ?

    // const newData = SUPPLIER_TABLE_DATA.concat([new CollectContestWorkInstructionsStandModel({})]);

//     return of(newData).pipe(
//       tap((data: CollectContestWorkInstructionsStandModel[]) => {
//         this.dataSource.load(data);
//       })
//     );
//   }
}
