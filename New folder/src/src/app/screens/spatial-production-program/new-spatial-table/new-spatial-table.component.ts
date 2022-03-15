// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Input, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { CollectSeedsService } from 'src/app/modules/collect-seed/components/collect-seeds-table/collect-seeds.service';
import {
  combineLatest,
  filter,
  first,
  map,
  merge,
  Observable,
  of,
  skipWhile,
  startWith,
  switchMap,
} from 'rxjs';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';

import {
  TableOptions,
  RowsState,
  ColumnState,
  TableEvent,
} from 'src/app/shared/components/table/table.component';
import {
  FilterOption,
  SortOption,
} from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import {
  FilterMap,
  TableFilterService,
} from 'src/app/shared/components/table-filters/table-filter.service';
import { FormDataSource } from 'src/app/shared/components/form/models/form-data-source.model';
import { ListItem } from 'src/app/shared/components/list-item/list-item.model';
import { MatDialog } from '@angular/material/dialog';

import { ListService } from 'src/app/shared/components/list/list.service';
import { Question } from 'src/app/shared/components/form/services/form.service';
import { SelectOption } from 'src/app/shared/components/form/models/question-select.model';
import { RouterService } from 'src/app/shared/services/route.service';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { DialogAlertComponent } from 'src/app/shared/components/dialog-alert/dialog-alert.component';
import { HttpService } from 'src/app/services/http.service';
import { FreeText } from 'src/app/Models/FreeText';
import { COLLECT_SEEDS_TABLE_DATA } from 'src/app/mock_data/collect-seeds-data';
import { NewSpatialTableService } from './new-spatial-table.service';
// import { NEW_SPATITAL_TABLE_DATA } from 'src/app/mock_data/spatial-production-data';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { NewSpatialTableDataService } from './new-spatial-table-data.service';
import { NewSpatialTableModel } from './new-spatial-table.model';
import { FILTERS } from 'src/app/mock_data/spatial-production-data';
import { minHatzemachMerchavi } from 'src/app/Models/minHatzemachMerchavi';

@Component({
  selector: 'app-new-spatial-table',
  templateUrl: './new-spatial-table.component.html',
  styleUrls: ['./new-spatial-table.component.scss'],
  providers: [ListService, TableFilterService],
})
export class NewSpatialTableComponent implements OnInit, OnDestroy {
  public dataFromServer$: Observable<NewSpatialTableModel[]>;
  private formDataSource: FormDataSource;
  public dataSource: TableDataSource<NewSpatialTableModel>;
  private sortObj: SortOption<NewSpatialTableModel>;
  public events$: Observable<string>;
  public rowsState$: Observable<RowsState<NewSpatialTableModel>>;
  public columnsState$: Observable<ColumnState<NewSpatialTableModel>>;
  public autocompleteEvent$: Observable<boolean>;
  public getAllFlag: boolean = false;
  plantTypes: any;
  public filtersArr: any[] = FILTERS;

  public columns: ColumnModel<NewSpatialTableModel>[] = [
    new ColumnModel({
      label: 'מין הצמח',
      columnDef: 'minHatzemach',
      filterQuestion: {
        multi: false,
        key: '',
        options: [
          {
            label: 'string1',
            value: 'any1',
          },
          {
            label: 'string2',
            value: 'any2',
          },
          {
            label: 'string3',
            value: 'any3',
          },
          {
            label: 'string4',
            value: 'any4',
          },
        ],
      },
      question: {
        key: '',
        controlType: 'autocomplete',
        options: [{ label: '1', value: 1 }],
      },
    }),
    new ColumnModel({
      label: 'כמות',
      question: {
        key: '',
        controlType: 'number',
        validations: [ Validators.min(0)],
      },
      filterable: false,
      columnDef: 'kamut',
      filterQuestion: {
        multi: false,
        key: '',
        options: [
          {
            label: 's1',
            value: 'a1',
          },
          {
            label: 's2',
            value: 'a2',
          },
          {
            label: 's3',
            value: 'a3',
          },
          {
            label: 's4',
            value: 'a4',
          },
        ],
      },
    }),
    new ColumnModel({
      question: {
        key: '',
        controlType: 'select',
        options: [{ label: '1', value: 1 }],
      },
      filterQuestion: {
        multi: false,
        key: '',
        options: [
          {
            label: 's1',
            value: 'a1',
          },
          {
            label: 's2',
            value: 'a2',
          },
          {
            label: 's3',
            value: 'a3',
          },
          {
            label: 's4',
            value: 'a4',
          },
        ],
      },
      label: 'אזור ',

      columnDef: 'ezor',
    }),
    new ColumnModel({
      question: {
        key: '',
        controlType: 'select',
        options: [{ label: '1', value: 1 }],
      },
      label: 'כלי קיבול',

      columnDef: 'kibul',
    }),
    new ColumnModel({
      label: 'חומר ריבוי',
      question: {
        key: '',
        controlType: 'select',
        options: [{ label: '1', value: 1 }],
      },

      columnDef: 'ribuy',
    }),
    new ColumnModel({
      question: {
        key: '',
        controlType: 'select',
        options: [{ label: '1', value: 1 }],
      },
      label: 'מקור הזרע ',

      columnDef: 'makor',
    }),
    new ColumnModel({
      question: { key: '', controlType: 'text' },
      label: 'הערות',
      columnDef: 'hearot',
    }),
  ];

  public data$: Observable<NewSpatialTableModel[]>;
  public columns$: Observable<ColumnModel<NewSpatialTableModel>[]>;
  public filteredData: any;
  choosenArea: any;
  choosenReceptacle: any;
  processFilter = new FormControl();
  listOfAreas: any[];
  cleyKibul: any[];

  PlanType: any[];
  ribuy: any;
  listOfPlantypes: any[] = [];
  idOfRow: any;
  mekorot: any[] = [];
  mekorotList: any[] = [];
  public list: any = [];
  public listOfArea: any[] = []; //{name:"הכל", code:0}
  public cliKibul: any[] = []; //{name:"הכל", code:0}
  public Ribuy: any[] = []; //{name:"הכל", code:0}
  public filteredDataToShow: any[] = [];
  public model: NewSpatialTableModel = new NewSpatialTableModel();

  private pagination: PaginationInstance = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 10,
  };

  public options: TableOptions<NewSpatialTableModel> = {
    pagination: this.pagination,
    filters: ['id', 'teurMishpacha', , 'kodMinHatzemach'],
  };
  allData: any;
  filterValue: string;
  filterArr: any;
  minHatzemachMerchavi: any;

  constructor(
    private spatialProductionProgramService: SpatialProductionProgramService,
    private addProductionProccessService: AddProductionProcessService,
    private newSpatialTableDataService: NewSpatialTableDataService,
    private newSpatialService: NewSpatialTableService,
    private tableFilterService: TableFilterService<NewSpatialTableModel>,
    private dialog: MatDialog
  ) {}

  filterLabels = {
    id: '',
    minHatzemach: '',
    kamut: '',
    ezor: '',
    kibul: '',
    ribuy: '',
    makor: '',
    hearot: '',
  };
  ngOnInit(): void {
    this.dataSource = new TableDataSource<NewSpatialTableModel>();
    this.newSpatialTableDataService.connect().subscribe((res) => {
       
      this.dataSource.load(res);
    });

//     this.tableFilterService.returnFiltersObs().subscribe(filters=>{
//       for (let i = 0; i < filters.length; i++) {
//         this.filterLabels[filters[i].key] = filters[i].label;
//       }
      
//       this.filteredData = this.newSpatialService.filterData(this.filterLabels);
//        
      
//       console.log('load-ng-on-init');
//       console.log(this.filteredData);
      
//       this.newSpatialTableDataService.load(this.filteredData)

    //       this.newSpatialTableDataService.load(this.filteredData)

    //       this.filteredData = this.newSpatialService.filterData(this.filterLabels);
    //       //

    //       console.log('load-ng-on-init');
    //       console.log(this.filteredData);

    //       this.newSpatialTableDataService.load(this.filteredData)

    //       return filters

    //     })

    this.formDataSource = new FormDataSource();

    this.data$ = this.setDataWithFilters();
    this.columns$ = this.setColumns$();
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.events$ = this.dataSource.getEvents$();
    this.initTable();
    // this.autocompleteEvent$ = this.onFormAutocomplete();
  }

  ngOnDestroy() {}

  public removeAllFilters(): void {}

  // method which handle data$ with filters[]
  private setDataWithFilters(): Observable<NewSpatialTableModel[]> {
    const data$ = this.initTable();

    //  const filterCallback = (
    //       filters: ListItem<NewSpatialTableModel>[]
    //     ) => {
    //     }
    const filterCallback = (filters: ListItem<NewSpatialTableModel>[]) =>
      console.log(filters);
    // this.dataService
    //   .searchSCData(filters, this.sortObj, this.getAllFlag)
    //   .pipe(
    //     map((results: ExistingProceduresTableModel[]) =>
    //       results.map((item) => {
    //         return {
    //           ...item,
    //           dateCreated: new Date(item.dateCreated),
    //         };
    //       })
    //     )

    return this.tableFilterService.filterFormServer(data$, filterCallback);
  }

  // main method to set columns$
  private setColumns$() {
    return combineLatest([this.dataSource.connectColumns(this.columns)]).pipe(
      map(([columns]) => {
        return columns;
      })
    );
  }

  // method to change row state to edit
  public onEditState(row: RowModel<NewSpatialTableModel>) {
    // TODO - server side data
    this.dataSource.edit({ row, options: { key: 'id' } });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<NewSpatialTableModel>, event: TableEvent) {
    
    this.dataSource
    .connect()
    .pipe(
      first(),
        map((res) => {
          if (event === 'edit') {
            // TODO - server side data
            //TODO - this.dataSource.load()
            console.log(row);
            this.EditData(res, row, this.allData);
            this.dataSource.save({ row, options: { key: 'id' } });
          }
          
          if (event === 'create') {
            console.log(row);
             
          this.addData(res, row, this.allData);
            // this.dataSource.load(data1);
            this.dataSource.save({ row, options: { key: 'id' } });
            // this.dataSource.cancel();
          }
        })
      )
      .subscribe();
  }

  public onCreateEvent() {
    this.dataSource.create({ options: { item: new NewSpatialTableModel() } });
  }
  EditData(data: any[], row: RowModel<NewSpatialTableModel>, allData: any) {
    let tzemach = allData.tzmachim.find(
      (x) => x.name == row.form.formGroup.value.minHatzemach
    );
    let ribuy = allData.kibulim.find(
      (x) => x.code == row.form.formGroup.value.ribuy
    );
    let kibul = allData.ribuyim.find(
      (x) => x.code == row.form.formGroup.value.kibul
    );
    let makor = allData.mekorot.find(
      (x) => x.code == row.form.formGroup.value.makor
    );
    let ezor = allData.ezorim.find(
      (x) => x.code == row.form.formGroup.value.ezor
    );
    const item = data.find((x) => x.id == row.item.id);
    const index = data.findIndex((x) => x.id == row.item.id);

    // this.choosenReceptacle = { name: '', code: '' };
    // this.choosenArea = { name: '', code: '' };
    // this.chosenSeedOrigin = { name: '', code: '' };
    // this.chosenMultiplicityMaterial = { name: '', code: '' };
    this.minHatzemachMerchavi = new minHatzemachMerchavi();
    this.minHatzemachMerchavi.misparTochnit =
      this.addProductionProccessService.addTochnitYezur.id;
    this.minHatzemachMerchavi.id = item.id;
    if (
      row.form.formGroup.value.ribuy != null &&
      row.form.formGroup.value.ribuy != '' &&
      typeof row.form.formGroup.value.ribuy === 'number'
    )
      this.minHatzemachMerchavi.ribuy = Number(row.form.formGroup.value.ribuy);
    else {
      if (row.form.formGroup.value.ribuy != '')
        this.minHatzemachMerchavi.ribuy = allData.kibulim.find(
          (x) => x.name == row.form.formGroup.value.ribuy
        ).code;
      else {
        this.minHatzemachMerchavi.ribuy = 0;
      }
    }
    if (
      row.form.formGroup.value.makor != null &&
      row.form.formGroup.value.makor != '' &&
      typeof row.form.formGroup.value.makor === 'number'
    )
      this.minHatzemachMerchavi.makor = Number(row.form.formGroup.value.makor);
    else {
      if (row.form.formGroup.value.makor != '')
        this.minHatzemachMerchavi.makor = allData.mekorot.find(
          (x) => x.name == row.form.formGroup.value.makor
        ).code;
      else {
        this.minHatzemachMerchavi.makor = 0;
      }
    }
    if (
      row.form.formGroup.value.ezor != null &&
      row.form.formGroup.value.ezor != '' &&
      typeof row.form.formGroup.value.ezor === 'number'
    )
      this.minHatzemachMerchavi.ezor = Number(row.form.formGroup.value.ezor);
    else {
      if (row.form.formGroup.value.ezor != '')
        this.minHatzemachMerchavi.ezor = allData.ezorim.find(
          (x) => x.name == row.form.formGroup.value.ezor
        ).code;
      else {
        this.minHatzemachMerchavi.ezor = 0;
      }
    }
    if (
      row.form.formGroup.value.kibul != null &&
      row.form.formGroup.value.kibul != '' &&
      typeof row.form.formGroup.value.kibul === 'number'
    )
      this.minHatzemachMerchavi.kibul = Number(row.form.formGroup.value.kibul);
    else {
      if (row.form.formGroup.value.kibul != '')
        this.minHatzemachMerchavi.kibul = allData.ribuyim.find(
          (x) => x.name == row.form.formGroup.value.kibul
        ).code;
      else {
        this.minHatzemachMerchavi.kibul = 0;
      }
    }
    this.minHatzemachMerchavi.minHatzemach =
      row.form.formGroup.value.minHatzemach;
    this.minHatzemachMerchavi.kodMinHatzemach = tzemach.code;
    if(row.form.formGroup.value.kamut<=0){
    this.onCancelEvent(row,"edit")
    return alert("לא הוכנס כמות תקינה");
    }
    this.minHatzemachMerchavi.kamut = Number(row.form.formGroup.value.kamut);
    this.minHatzemachMerchavi.hearot = row.form.formGroup.value.hearot;
    let itemToUpdate = this.minHatzemachMerchavi;

    this.spatialProductionProgramService
      .saveTochnitYitzurMerchavit(this.minHatzemachMerchavi)
      .subscribe(
        (res) => {
          try {
            if (res.errors == null) {
              itemToUpdate.ribuy = ribuy
                ? ribuy.name
                : row.form.formGroup.value.ribuy;
              itemToUpdate.makor = makor
                ? makor.name
                : row.form.formGroup.value.makor;
              itemToUpdate.kibul = kibul
                ? kibul.name
                : row.form.formGroup.value.kibul;
              itemToUpdate.ezor = ezor
                ? ezor.name
                : row.form.formGroup.value.ezor;
              itemToUpdate.minHatzemach = tzemach
                ? tzemach.name
                : row.form.formGroup.value.minHatzemach;
              itemToUpdate.kodMinHatzemach = tzemach ? tzemach.code : 0;
              delete data[index].misparTochnit;
              data[index] = { ...itemToUpdate };
              this.spatialProductionProgramService.listForTableForSpatialProductionProgram =
                data;
              this.dataSource.load(data);
              this.initTable();
            } else {
              if (res.errors.title != null) {
                alert(res.errors.title);
                return [];
              } else {
                alert('תקלה במערכת, נא לנסות שנית');
                return [];
              }
            }
          } catch (e) {}
          return [];
        },
        (error) => {
          if (error.error != null) {
            if (error.error.title != null) {
              alert(error.error.title);
              return [];
            } else {
              alert('תקלה במערכת, נא לנסות שנית');
              return [];
            }
          } //Error callback
          return [];
        }
      );

    // this.filteredData.shift()
    // if (index == 0 && this.addInputIsOpen) {
    //   this.addItemToArray(item);
    //   return;
    // }
    // item.editable = false;
    // data[this.findElementInArrayById(item.id)] = item;
    return data;
  }
  addData(data: any[], row: RowModel<NewSpatialTableModel>, allData: any) {
    if(row.form.formGroup.value.kamut<=0){
    this.onCancelEvent(row,"add")
    return alert("לא הוכנס כמות תקינה")
  }
    let tzemach = allData.tzmachim.find(
      (x) => x.name == row.form.formGroup.value.minHatzemach
    );
    let ribuy = allData.kibulim.find(
      (x) => x.code == row.form.formGroup.value.ribuy
    );
    let kibul = allData.ribuyim.find(
      (x) => x.code == row.form.formGroup.value.kibul
    );
    let makor = allData.mekorot.find(
      (x) => x.code == row.form.formGroup.value.makor
    );
    let ezor = allData.ezorim.find(
      (x) => x.code == row.form.formGroup.value.ezor
    );
    this.minHatzemachMerchavi = new minHatzemachMerchavi();
    this.minHatzemachMerchavi.misparTochnit =
      this.addProductionProccessService.addTochnitYezur.id;
    this.minHatzemachMerchavi.id = 0;
    if (
      row.form.formGroup.value.ribuy != null &&
      row.form.formGroup.value.ribuy != '' &&
      typeof row.form.formGroup.value.ribuy === 'number'
    )
      this.minHatzemachMerchavi.ribuy = Number(row.form.formGroup.value.ribuy);
    else {
      this.minHatzemachMerchavi.ribuy = 0;
    }
    if (
      row.form.formGroup.value.makor != null &&
      row.form.formGroup.value.makor != '' &&
      typeof row.form.formGroup.value.makor === 'number'
    )
      this.minHatzemachMerchavi.makor = Number(row.form.formGroup.value.makor);
    else {
      this.minHatzemachMerchavi.makor = 0;
    }
    if (
      row.form.formGroup.value.ezor != null &&
      row.form.formGroup.value.ezor != '' &&
      typeof row.form.formGroup.value.ezor === 'number'
    )
      this.minHatzemachMerchavi.ezor = Number(row.form.formGroup.value.ezor);
    else {
      this.minHatzemachMerchavi.ezor = 0;
    }
    if (
      row.form.formGroup.value.kibul != null &&
      row.form.formGroup.value.kibul != '' &&
      typeof row.form.formGroup.value.kibul === 'number'
    )
      this.minHatzemachMerchavi.kibul = Number(row.form.formGroup.value.kibul);
    else {
      this.minHatzemachMerchavi.kibul = 0;
    }
    this.minHatzemachMerchavi.minHatzemach =
      row.form.formGroup.value.minHatzemach;
    this.minHatzemachMerchavi.kodMinHatzemach = tzemach.code;

    this.minHatzemachMerchavi.kamut = Number(row.form.formGroup.value.kamut);
    this.minHatzemachMerchavi.hearot = row.form.formGroup.value.hearot;
    let itemToUpdate = this.minHatzemachMerchavi;
    this.spatialProductionProgramService
      .saveTochnitYitzurMerchavit(this.minHatzemachMerchavi)
      .subscribe(
        (res) => {
          try {
            if (res.errors == null) {
              return this.spatialProductionProgramService
                .getSpatialProductionProgram(
                  this.addProductionProccessService.addTochnitYezur.id
                )
                .subscribe((res) => {
                  console.log(res);
                  let max = Math.max.apply(
                    Math,
                    res.mineTzemach.map(function (o) {
                      return o.id;
                    })
                  );
                  itemToUpdate.ribuy = ribuy ? ribuy.name : '';
                  itemToUpdate.makor = makor ? makor.name : '';
                  itemToUpdate.kibul = kibul ? kibul.name : '';
                  itemToUpdate.ezor = ezor ? ezor.name : '';
                  itemToUpdate.minHatzemach = tzemach
                    ? tzemach.name
                    : row.form.formGroup.value.minHatzemach;
                  itemToUpdate.kodMishpacha = tzemach ? tzemach.code : 0;
                  delete itemToUpdate.kodMinHatzemach;
                  itemToUpdate.teurMishpacha = tzemach.mishpacha;
                  itemToUpdate.id = max;
                  delete itemToUpdate.misparTochnit;
                  data.unshift({ ...itemToUpdate });
                  this.spatialProductionProgramService.listForTableForSpatialProductionProgram =
                    data;
                  console.log(data);

                  this.dataSource.load(data);
                  this.initTable();
                });
            } else {
              if (res.errors.title != null) {
                alert(res.errors.title);
                return [];
              } else {
                alert('תקלה במערכת, נא לנסות שנית');
                return [];
              }
            }
          } catch (e) {}
          return [];
        },
        (error) => {
          if (error.error != null) {
            if (error.error.title != null) {
              alert(error.error.title);
              return [];
            } else {
              alert('תקלה במערכת, נא לנסות שנית');
              return [];
            }
          } //Error callback
          return [];
        }
      );
  }
  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<NewSpatialTableModel>;
    event: string;
  }) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
      const { event, row } = options;
      let data = [];
      this.dataSource
        .connect()
        .pipe(
          first(),
          map((res) => {
            data = res;
          })
        )
        .subscribe();
      if (row.item.id != 0) {
        this.spatialProductionProgramService
          .deleteMinHatzemachMerchavi(+row.item.id)
          .subscribe((res) => {
            this.removeItem(+row.item.id, data);
          });
      }
    }
    return [];
  }
  public removeItemFromArray(index: number, data: any[]) {
    data.splice(this.findElementInArrayById(index, data), 1);
     
    this.dataSource.load(data);
    this.spatialProductionProgramService.listForTableForSpatialProductionProgram =
      data;
    this.initTable();
  }
  public findElementInArrayById(id: number, data: any[]) {
    return data.findIndex((item) => item.id === id);
  }
  findElementInArrey(arrey: any[], name) {
    return arrey.findIndex((x) => x.name == name);
  }
  removeItem(id: number, data: any[]) {
    let object = data.find((x) => x.id == id);
    this.removeItemFromArray(id, data);
    // this.Ribuy.splice(
    //   this.findElementInArrey(this.Ribuy, object.multiplicityMaterial.name),
    //   1
    // );
    // this.cliKibul.splice(
    //   this.findElementInArrey(this.cliKibul, object.receptacle.name),
    //   1
    // );
    // this.mekorot.splice(
    //   this.findElementInArrey(this.mekorot, object.seedOrigin.name),
    //   1
    // );
    // this.listOfArea.splice(
    //   this.findElementInArrey(this.listOfArea, object.area.name),
    //   1
    // );
    // this.plantTypes.splice(
    //   this.findElementInArrey(this.plantTypes, object.plantType),
    //   1
    // );
    //

    this.initTable();
    //  this.initilizedList();
  }

  public onCancelEvent(row: RowModel<NewSpatialTableModel>, event: string) {
    console.log(event);

    if (event === 'edit') {
      console.log(row);

      this.dataSource.close({ row, options: { key: 'id' } });
    } else {
      this.dataSource.cancel();
    }
  }

  initTable(): Observable<NewSpatialTableModel[]> {
    //for developing
    this.spatialProductionProgramService
      .getSpatialProductionProgram(
        this.addProductionProccessService.addTochnitYezur.id
      )
      .subscribe((res) => {
        this.spatialProductionProgramService.listForTableForSpatialProductionProgram =
          res.mineTzemach;
        this.columns = [
          new ColumnModel({
            label: 'מין הצמח',
            columnDef: 'minHatzemach',
            filterQuestion: {
              multi: true,
              key: '',
              options: [
                {
                  label: 'string',
                  value: 'any',
                },
              ],
            },
            question: {
              key: '',
              controlType: 'autocomplete',
              options: this.castArrey(res.tzmachim),
            },
          }),
          new ColumnModel({
            label: 'כמות',
            question: { key: '', controlType: 'number' ,
        validations: [Validators.required, Validators.min(1)],
        },

            columnDef: 'kamut',
          }),
          new ColumnModel({
            question: {
              key: '',
              controlType: 'select',
              options: this.castArrey(res.ezorim),
            },
            label: 'אזור ',

            columnDef: 'ezor',
          }),
          new ColumnModel({
            question: {
              key: '',
              controlType: 'select',
              options: this.castArrey(res.ribuyim),
            },
            label: 'כלי קיבול',

            columnDef: 'kibul',
          }),
          new ColumnModel({
            label: 'חומר ריבוי',
            question: {
              key: '',
              controlType: 'select',
              options: this.castArrey(res.kibulim),
            },

            columnDef: 'ribuy',
          }),
          new ColumnModel({
            question: {
              key: '',
              controlType: 'select',
              options: this.castArrey(res.mekorot),
            },
            label: 'מקור הזרע ',

            columnDef: 'makor',
          }),
          new ColumnModel({
            question: { key: '', controlType: 'text' },
            label: 'הערות',
            columnDef: 'hearot',
          }),
        ];
        this.dataSource.connectColumns(this.columns);

        this.initFiltersFirst(res);
        this.dataSource.load(res.mineTzemach);
        // this.initFiltersFirst(res);
      });
    return this.dataSource.connect();
  }
  initFiltersFirst(res) {
    this.allData = res;
    this.filteredData = res;
    this.filtersArr[0].count = this.filteredData.machtaniyim;
    this.filtersArr[1].count = this.filteredData.choreshTivi;
    this.filtersArr[2].count = this.filteredData.ekaliptus;
    this.filtersArr[3].count = this.filteredData.shitim;
    this.filtersArr[4].count = this.filteredData.atzeyNoy;
    this.filtersArr[5].count = this.filteredData.total;
    return this.filtersArr;
  }
  castArrey(data: any[]) {
    let listOfData: any[] = [];
    data.forEach((x) => {
      listOfData.push({ label: x.name, value: x.code });
    });
    return listOfData;
  }

  onFilterChange(filterValue: string) {
    this.filterValue = filterValue;
    if (this.filterValue == 'all') this.initTable();
    else if (this.filterValue == 'ornamentalTree')
      this.newSpatialTableDataService.initFilteredTable(5, this.allData);
    else if (this.filterValue == 'acacia')
      this.newSpatialTableDataService.initFilteredTable(4, this.allData);
    else if (this.filterValue == 'eucalyptus')
      this.newSpatialTableDataService.initFilteredTable(3, this.allData);
    else if (this.filterValue == 'grove')
      this.newSpatialTableDataService.initFilteredTable(2, this.allData);
    else if (this.filterValue == 'coniferous')
      this.newSpatialTableDataService.initFilteredTable(1, this.allData);
    console.log('method to load new data with filter value' + filterValue);
  }

  private filterData(data) {
    this.dataSource.load(data);
    this.tableFilterService.filtersStateSubject
      .asObservable()
      .pipe(
        switchMap((filters) => {
          console.log(filters);

          return of(data);
        })
      )
      .subscribe((data) => this.dataSource.load(data));
  }
}
