import {
  OnInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {
  Areas,
  displayedColumnsArrays,
  FILTERS,
  Receptacles,
} from '../../../mock_data/spatial-production-data';
import { minHatzemachMerchavi } from '../../../Models/minHatzemachMerchavi';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
export interface SpatialTable {
  id: number;
  plantType: string | object;
  amount: number;
  area: string;
  receptacle: string;
  multiplicityMaterial: any;
  seedOrigin: string;
  comment: string;
  filterValue: string;
  controllers: boolean;
  editable?: boolean;
  addColInTable?: boolean;
}

@Component({
  selector: 'app-spatial-table',
  templateUrl: './spatial-table.component.html',
  styleUrls: ['./spatial-table.component.scss'],
})
export class SpatialTableComponent implements OnInit, OnChanges {
  plantTypeFormControl = new FormControl('', Validators.required);
  amountFormControl = new FormControl('0', Validators.required);
  spatialTableForm: FormGroup;
  // auto complete input
  public control = new FormControl();
  filteredPlantType: Observable<any>;
  minHatzemachMerchavi: any;
  //data for filter cards
  public filtersArr: any[] = FILTERS;
  public data: any[] = []; //ELEMENT_DATA;
  public filteredData: any;
  // arrays vars
  public areas: any[] = Areas;
  public receptacles: any[] = Receptacles;
  public multiplicityMaterial: any;
  private chosenMultiplicityMaterial: any;
  private chosenplantType: any;
  public filters: { name: string; filterValue: string; urlSrc: string }[] = [];
  public filterValue: string = 'all';
  public page: number = 1;
  public displayedColumns: string[] = displayedColumnsArrays;
  public addInputIsOpen: boolean = false;
  private seedOrigin: any;
  @Input() idOfTochnitYezur: number;
  // chosenReceptacle:any
  private chosenSeedOrigin: any;
  @Input() isOpend: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  plantTypes: any;
  isValid: boolean = true;
  totalCount: any;
  public listOfArea: any[] = []; //{name:"הכל", code:0}
  public cliKibul: any[] = []; //{name:"הכל", code:0}
  public Ribuy: any[] = []; //{name:"הכל", code:0}
  public filteredDataToShow: any[] = [];
  ELEMENT_DATA: any;
  tmpDataObj: {
    id: any;
    plantType: string;
    amount: any;
    area: any;
    receptacle: any;
    multiplicityMaterial: any;
    seedOrigin: any;
    comment: any;
    filterValue: string;
    controllers: boolean;
    editable: boolean;
    addColInTable: boolean;
  };
  public pagesCount = 0;
  public currentPage = 1;
  public pageSize = 7;
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
  constructor(
    public dialog: MatDialog,
    private addProductionProccessService: AddProductionProcessService,
    private SpatialProductionProgramService: SpatialProductionProgramService,
    private fb: FormBuilder
  ) {}

  insertObjectHandler(condition: string): void {
    const tmpDataObj = {
      id: 0,
      plantType: '',
      amount: 0,
      area: '',
      receptacle: '',
      multiplicityMaterial: '',
      seedOrigin: '',
      comment: '',
      filterValue: 'grove',
      controllers: true,
      editable: true,
      addColInTable: true,
    };
    if (condition === 'add') {
      this.filteredData.unshift({ ...tmpDataObj });
    }
    if (condition === 'remove') {
      this.filteredData.splice(this.findEmptyCol(), 1);
    }
    if (condition === 'both') {
      this.filteredData.splice(this.findEmptyCol(), 1);
      this.filteredData.unshift({ ...tmpDataObj });
    }
  }
  ngAfterViewInit() {
    this.control.valueChanges.subscribe((res) => {
      this.filteredPlantType = this._filter(res);
    });
    this.idOfTochnitYezur =
      this.addProductionProccessService.addTochnitYezur.id;
    this.initilizedList();
  }

  plantTypeCahnge(value) {}

  initilizedList() {
    return this.SpatialProductionProgramService.getSpatialProductionProgram(
      this.idOfTochnitYezur
    ).subscribe((res) => {
      this.ELEMENT_DATA = res;
      this.listOfArea = this.ELEMENT_DATA.ezorim; //this.listOfArea.concat(;
      this.cliKibul = this.ELEMENT_DATA.ribuyim; //this.cliKibul.concat(;
      this.Ribuy = this.ELEMENT_DATA.kibulim; //this.Ribuy.concat(;
      this.seedOrigin = this.ELEMENT_DATA.mekorot;
      this.mekorot = this.seedOrigin;
      this.pagesCount = this.ELEMENT_DATA.mineTzemach.length / this.pageSize;
      this.SpatialProductionProgramService.listForTableForSpatialProductionProgram =
        this.ELEMENT_DATA.mineTzemach;
      this.listOfAreas = this.listOfArea;
      this.cleyKibul = this.cliKibul;
      this.ribuy = this.Ribuy;
      this.mekorotList = this.seedOrigin;
      this.mekorot = [];
      this.PlanType = this.plantTypes;
      this.listOfArea = [];
      this.cliKibul = [];
      this.Ribuy = [];
      this.plantTypes = [];
      this.ELEMENT_DATA.mineTzemach.forEach((element) => {
        let areas = this.listOfAreas.find((x) => x.name == element.ezor);
        if(areas!=null){
        if (this.listOfArea.length == 0) this.listOfArea.push(areas);
        else {
          this.listOfArea.forEach((x) => {
            if (x.name === areas.name) return;
            this.listOfArea.push(areas);
          });
        }
      }
        if(this.mekorotList!=null){
        let makor = this.mekorotList.find((x) => x.name == element.makor);
        if(makor!=null){
        if (this.mekorot.length == 0) this.mekorot.push(makor);
        else {
          this.mekorot.forEach((x) => {
            if (x.name === makor.name) return;
            this.mekorot.push(makor);
          });

        }
      }
      }
      if(this.cleyKibul!=null){
        let kibul = this.cleyKibul.find((x) => x.name == element.kibul);
        if(kibul!=null){
        if (this.cliKibul.length == 0) this.cliKibul.push(kibul);
        else {
          this.cliKibul.forEach((x) => {
            if (x.name === kibul.name) return;
            this.cliKibul.push(kibul);
          });
        }
      }
      }
      if(this.ribuy!=null){
        let Ribuy = this.ribuy.find((x) => x.name == element.ribuy);
        if(Ribuy!=null){
        if (this.Ribuy.length == 0) this.Ribuy.push(Ribuy);
        else {
          this.Ribuy.forEach((x) => {
            if (x.name === Ribuy.name) return;
            this.Ribuy.push(Ribuy);
          });
        }
      }
      }
    
      if(this.PlanType!=null){
         ;
        let planType = this.PlanType.find(
          (x) => x.name == element.minHatzemach
        );
        if(planType!=null){
        if (this.plantTypes.length == 0) this.plantTypes.push(planType);
        else {
          this.plantTypes.forEach((x) => {
            if (x.name === planType.name) return;
            this.plantTypes.push(planType);
          });
        }
      }
      }
      });
    });
  }
  ngOnInit(): void {
    this.spatialTableForm = this.fb.group({
      area: [''],
      plantType: [''],
      receptacle: [''],
      multiplicityMaterial: [''],
      seedOrigin: [''],
      comment: [''],
    });

    this.filteredPlantType = this.spatialTableForm
      .get('plantType')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    this.initTable();
  }
  initFilters() {
    this.SpatialProductionProgramService.getSpatialProductionProgram(
      this.addProductionProccessService.addTochnitYezur.id
    ).subscribe((res) => {
      this.SpatialProductionProgramService.listForTableForSpatialProductionProgram =
        res.mineTzemach;
      //update filters
      this.filtersArr[0].count = res.machtaniyim;
      this.filtersArr[1].count = res.choreshTivi;
      this.filtersArr[2].count = res.ekaliptus;
      this.filtersArr[3].count = res.shitim;
      this.filtersArr[4].count = res.atzeyNoy;
      this.totalCount = res.total;
    });
  }
  initFilteredTable(kodmishpacha) {
    //for developing
    this.SpatialProductionProgramService.getTzmachimLeMishpachaMerchavit(
      this.addProductionProccessService.addTochnitYezur.id,
      kodmishpacha
    ).subscribe((res) => {
      this.filteredData = res;
      this.SpatialProductionProgramService.listForTableForSpatialProductionProgram =
        res.mineTzemach;
      if (this.filteredData == null) {
        this.filteredData = [];
        return;
      }
      for (let i = 0; i < this.filteredData.length; i++) {
        this.filteredData[i].plantType = this.filteredData[i]['minHatzemach'];
        delete this.filteredData[i].minHatzemach;
        this.filteredData[i].amount = this.filteredData[i]['kamut'];
        delete this.filteredData[i].kamut;
        this.filteredData[i].area = { name: '', code: '' };
        this.filteredData[i].area.name = this.filteredData[i]['ezor'];
        this.filteredData[i].area.code = this.areas.find(
          (x) => x.name == this.filteredData[i]['ezor']
        ).code;
        delete this.filteredData[i].ezor;
        this.filteredData[i].receptacle = { name: '', code: '' };
        this.filteredData[i].receptacle.name = this.filteredData[i]['kibul'];
        this.filteredData[i].receptacle.code = this.receptacles.find(
          (x) => x.name == this.filteredData[i]['kibul']
        )?this.receptacles.find(
          (x) => x.name == this.filteredData[i]['kibul']
        ).code:0;
        delete this.filteredData[i].kibul;
        this.filteredData[i].multiplicityMaterial = { name: '', code: '' };
        this.filteredData[i].multiplicityMaterial.name =
          this.filteredData[i]['ribuy'];
        this.filteredData[i].multiplicityMaterial.code =
          this.multiplicityMaterial.find(
            (x) => x.name == this.filteredData[i]['ribuy']
          )?  this.multiplicityMaterial.find(
            (x) => x.name == this.filteredData[i]['ribuy']
          ).code:0;
        delete this.filteredData[i].ribuy;
        this.filteredData[i].seedOrigin = { name: '', code: '' };
        this.filteredData[i].seedOrigin.name = this.filteredData[i]['makor'];
        this.filteredData[i].seedOrigin.code = this.seedOrigin.find(
          (x) => x.name == this.filteredData[i].seedOrigin.name
        )?this.seedOrigin.find(
          (x) => x.name == this.filteredData[i].seedOrigin.name
        ).code:0;
        delete this.filteredData[i].makor;
        this.filteredData[i].comment = this.filteredData[i]['hearot'];
        delete this.filteredData[i].hearot;
        this.filteredData[i].controllers = true;
      }
      this.chosenMultiplicityMaterial = { name: '', code: '' };
      this.chosenplantType = { name: '', family: '', id: '', icon: '' };
      this.getIconsForPlantTypes();
    });
  }
  initTable() {
    //for developing
    this.SpatialProductionProgramService.getSpatialProductionProgram(
      this.addProductionProccessService.addTochnitYezur.id
    ).subscribe((res) => {
      this.filteredData = res.mineTzemach;
      this.filteredDataToShow = this.filteredData;
      if (this.filteredData == null) {
        this.filteredData = [];
        return;
      }
      for (let i = 0; i < this.filteredData.length; i++) {
        this.filteredData[i].plantType = this.filteredData[i]['minHatzemach'];
        delete this.filteredData[i].minHatzemach;
        this.filteredData[i].amount = this.filteredData[i]['kamut'];
        delete this.filteredData[i].kamut;
        this.filteredData[i].area = { name: '', code: '' };
        this.filteredData[i].area.name = this.filteredData[i]['ezor'];
        this.filteredData[i].area.code = res.ezorim.find(
          (x) => x.name == this.filteredData[i]['ezor']
        )?res.ezorim.find(
          (x) => x.name == this.filteredData[i]['ezor']
        ).code:0;
        delete this.filteredData[i].ezor;
        this.filteredData[i].receptacle = { name: '', code: '' };
        this.filteredData[i].receptacle.name = this.filteredData[i]['kibul'];
        this.filteredData[i].receptacle.code = res.ribuyim.find(
          (x) => x.name == this.filteredData[i]['kibul']
        )?res.ribuyim.find(
          (x) => x.name == this.filteredData[i]['kibul']
        ).code:0;
        delete this.filteredData[i].kibul;
        this.filteredData[i].multiplicityMaterial = { name: '', code: '' };
        this.filteredData[i].multiplicityMaterial.name =
          this.filteredData[i]['ribuy'];
        this.filteredData[i].multiplicityMaterial.code = res.kibulim.find(
          (x) => x.name == this.filteredData[i]['ribuy']
        )? res.kibulim.find(
          (x) => x.name == this.filteredData[i]['ribuy']
        ).code:0;
        delete this.filteredData[i].ribuy;
        this.filteredData[i].seedOrigin = { name: '', code: '' };
        this.filteredData[i].seedOrigin.name = this.filteredData[i]['makor'];
        this.filteredData[i].seedOrigin.code = res.mekorot.find(
          (x) => x.name == this.filteredData[i].seedOrigin.name
        )?res.mekorot.find(
          (x) => x.name == this.filteredData[i].seedOrigin.name
        ).code:0
        delete this.filteredData[i].makor;
        this.filteredData[i].comment = this.filteredData[i]['hearot'];
        delete this.filteredData[i].hearot;
        this.filteredData[i].controllers = true;
      }
      this.areas = res.ezorim;
      this.receptacles = res.ribuyim;
      this.multiplicityMaterial = res.kibulim;
      this.mekorot = res.mekorot;
      this.chosenMultiplicityMaterial = { name: '', code: '' };
      this.chosenplantType = { name: '', family: '', id: '', icon: '' };
      this.plantTypes = res.tzmachim;
      this.listOfPlantypes = this.plantTypes;
      this.getIconsForPlantTypes();
      this.seedOrigin = res.mekorot;
      //update filters
      this.SpatialProductionProgramService.listForTableForSpatialProductionProgram =
        res.mineTzemach;
      this.filtersArr[0].count = res.machtaniyim;
      this.filtersArr[1].count = res.choreshTivi;
      this.filtersArr[2].count = res.ekaliptus;
      this.filtersArr[3].count = res.shitim;
      this.filtersArr[4].count = res.atzeyNoy;
      this.totalCount = res.total;
    });
  }
  getIconsForPlantTypes() {
    if (this.plantTypes != null)
      for (let i = 0; i < this.plantTypes.length; i++) {
        if (this.plantTypes[i].mishpacha == 'מחטניים') {
          this.plantTypes[i].icon = 'assets/images/spatial-christmas-tree.svg';
        } else if (this.plantTypes[i].mishpacha == 'שיטים') {
          this.plantTypes[i].icon =
            'assets/images/spatial-tree-black-silhouette-shape.svg';
        } else if (this.plantTypes[i].mishpacha == 'חורש טבעי') {
          this.plantTypes[i].icon = 'assets/images/spatial-tree.svg';
        } else if (this.plantTypes[i].mishpacha == 'עצי ושיחי נוי') {
          this.plantTypes[i].icon = 'assets/images/spatial-shape.svg';
        } else if (this.plantTypes[i].mishpacha == 'אקליפטוס') {
          this.plantTypes[i].icon = 'assets/images/spatial-eucalyptus.svg';
        }
      }
  }
  ngOnChanges(changes: SimpleChanges): void {}

  public addInputHandler(): void {
    this.addInputIsOpen = !this.addInputIsOpen;
    this.addInputIsOpen
      ? this.insertObjectHandler('add')
      : this.insertObjectHandler('remove');
  }

  public updateFilteredData(event: any): void {
    this.filterValue = event[0];
    if (this.filterValue == 'all') this.initTable();
    else if (this.filterValue == 'ornamentalTree') this.initFilteredTable(5);
    else if (this.filterValue == 'acacia') this.initFilteredTable(4);
    else if (this.filterValue == 'eucalyptus') this.initFilteredTable(3);
    else if (this.filterValue == 'grove') this.initFilteredTable(2);
    else if (this.filterValue == 'coniferous') this.initFilteredTable(1);
  }
  private _filter(value: string): any {
    this.plantTypes = this.listOfPlantypes;
    const filterValue = this._normalizeValue(value);
    return this.plantTypes.filter((item) =>
      this._normalizeValue(item.name).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  filterBycliKibul(item) {
    this.filteredData = this.filteredDataToShow;
    if (item.name !== 'הכל')
      this.filteredData = this.filteredData.filter(
        (x) => x.receptacle.name == item.name
      );
  }

  filterByEzor(item) {
    this.filteredData = this.filteredDataToShow;
    if (item.name !== 'הכל')
      this.filteredData = this.filteredData.filter(
        (x) => x.area.name == item.name
      );
  }
  filterByRibuy(item) {
    this.filteredData = this.filteredDataToShow;
    if (item.name !== 'הכל')
      this.filteredData = this.filteredData.filter(
        (x) => x.multiplicityMaterial.name == item.name
      );
  }

  public findEmptyCol(): number {
    return this.filteredData.findIndex((i) => i.addColInTable);
  }
  filterByMakor(item: any) {
    this.filteredData = this.filteredDataToShow;
    if (item.name !== 'הכל')
      this.filteredData = this.filteredData.filter(
        (x) => x.seedOrigin.name == item.name
      );
  }

  public makeElementEditable(i: number) {
    this.plantTypes = this.listOfPlantypes;
    this.choosenArea = this.filteredData[i].area;
    this.choosenReceptacle = this.filteredData[i].receptacle;
    this.chosenSeedOrigin = this.filteredData[i].seedOrigin;
    this.chosenMultiplicityMaterial = this.filteredData[i].multiplicityMaterial;
    this.spatialTableForm
      .get('multiplicityMaterial')
      .setValue(this.chosenMultiplicityMaterial);

      console.log(i)

    this.filteredData[i].editable = true;
  }

  public findElementInArrayById(id: number) {
    return this.filteredData.findIndex((item) => item.id === id);
  }
  public addItemToArray(item): void {
    let obj = { ...item };
    obj.addColInTable = false;
    obj.editable = false;
    this.filteredData.unshift(obj);
    //remove this object and create new one
    this.insertObjectHandler('both');
  }

  public updateItemInArray(index: number) {

    return this.SpatialProductionProgramService.getSpatialProductionProgram(
      this.addProductionProccessService.addTochnitYezur.id
    ).subscribe((res) => {
      let list = res.mineTzemach;
      if (list.length == 0 || this.addInputIsOpen == true) {
        this.filteredData[index].id = 0;
      }
      else if (list.length==1) {
        this.filteredData[index].id = list[0].id;
      }
        else if (this.filteredData[index].editable == true) {
          this.filteredData[index].id = list[list.length - 1 - index].id;
      }

      this.isValid = true;
      const item = this.filteredData[index];
      if (this.chosenMultiplicityMaterial!=null &&this.chosenMultiplicityMaterial.name != '')
        item.multiplicityMaterial = this.chosenMultiplicityMaterial;
      if (this.chosenSeedOrigin !=null &&this.chosenSeedOrigin.name != '')
        item.seedOrigin = this.chosenSeedOrigin;
      if (this.choosenArea!=null &&this.choosenArea.name != '') 
      item.area = this.choosenArea;
      if (this.choosenReceptacle!=null&&this.choosenReceptacle.name != '')
        item.receptacle = this.choosenReceptacle;
      this.choosenReceptacle = { name: '', code: '' };
      this.choosenArea = { name: '', code: '' };
      this.chosenSeedOrigin = { name: '', code: '' };
      this.chosenMultiplicityMaterial = { name: '', code: '' };
      this.minHatzemachMerchavi = new minHatzemachMerchavi();
      this.minHatzemachMerchavi.misparTochnit =
        this.addProductionProccessService.addTochnitYezur.id;
      this.minHatzemachMerchavi.id = item.id;
      this.minHatzemachMerchavi.shemMinHatzemach = this.chosenplantType.name;
      this.minHatzemachMerchavi.kodMinHatzemach = this.chosenplantType.code;
      this.minHatzemachMerchavi.kamut = Number(item.amount);
      this.minHatzemachMerchavi.ezor = this.returnCode0ForEmptyDropDowns(
        item.area.code
      );
      this.minHatzemachMerchavi.kibul = this.returnCode0ForEmptyDropDowns(
        item.receptacle.code
      );
      this.minHatzemachMerchavi.ribuy = this.returnCode0ForEmptyDropDowns(
        item.multiplicityMaterial.code
      );
      this.minHatzemachMerchavi.makor = this.returnCode0ForEmptyDropDowns(
        item.seedOrigin.code
      );
      this.minHatzemachMerchavi.hearot = item.comment;
      this.SpatialProductionProgramService.saveTochnitYitzurMerchavit(
        this.minHatzemachMerchavi
      ).subscribe(
        (res) => {
          try {
            if (res.errors == null) {
              //update filters
              this.initFilters();
              this.initilizedList();
            } else {
              if (res.errors.title != null) {
                alert(res.errors.title);
                return;
              } else {
                alert('תקלה במערכת, נא לנסות שנית');
                return;
              }
            }
          } catch (e) {}
        },
        (error) => {
          if (error.error != null) {
            if (error.error.title != null) {
              alert(error.error.title);
              return;
            } else {
              alert('תקלה במערכת, נא לנסות שנית');
              return;
            }
          } //Error callback
        }
      );
      console.log(this.filteredData)
      // this.filteredData.shift()
      if (index == 0 && this.addInputIsOpen) {
        this.addItemToArray(item);
        return;
      }
      item.editable = false;
      this.filteredData[this.findElementInArrayById(item.id)] = item;
    });
  }

  public removeItemFromArray(index: number) {
    this.filteredData.splice(this.findElementInArrayById(index), 1);
    this.SpatialProductionProgramService.listForTableForSpatialProductionProgram =
      this.filteredData;
  }
  filterByplanType(item: any) {
    this.filteredData = this.filteredDataToShow;
    if (item.name !== 'הכל')
      this.filteredData = this.filteredData.filter(
        (x) => x.plantType == item.name
      );
  }
  // public openDialog(id: number) {
  //   let dialogRef = this.dialog.open(SpatialDialogComponent);
  //   const sub = dialogRef.componentInstance.doDelete.subscribe(value => {
  //     if (value) {
  //       this.removeItemFromArray(id);
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //     sub.unsubscribe();
  //   });
  // }
  returnCode0ForEmptyDropDowns(i) {
    if (i == '' || i == null) return 0;
    return i;
  }
  deleteRow(index, id: number, plantType: string) {
    if (id != 0) {
      this.SpatialProductionProgramService.deleteMinHatzemachMerchavi(
        id
      ).subscribe((res) => {
        this.removeItem(id);
      });
    }
    if (id == 0) {
      return this.SpatialProductionProgramService.getSpatialProductionProgram(
        this.addProductionProccessService.addTochnitYezur.id
      ).subscribe((res) => {
        let listOfSpetailProduction = res.mineTzemach;
        this.idOfRow = listOfSpetailProduction.find(
          (x) => x.minHatzemach == plantType
        ).id;
        id = this.idOfRow;
        this.filteredData[index].id =
          listOfSpetailProduction[
            listOfSpetailProduction.length - 1 - index
          ].id;
        this.SpatialProductionProgramService.deleteMinHatzemachMerchavi(
          id
        ).subscribe((res) => {
          this.removeItem(id);
        });
      });
    }
    return undefined;
  }
  findElementInArrey(arrey: any[], name) {
    return arrey.findIndex((x) => x.name == name);
  }
  removeItem(id: number) {
    let object = this.filteredData.find((x) => x.id == id);
    this.removeItemFromArray(id);
    this.Ribuy.splice(
      this.findElementInArrey(this.Ribuy, object.multiplicityMaterial.name),
      1
    );
    this.cliKibul.splice(
      this.findElementInArrey(this.cliKibul, object.receptacle.name),
      1
    );
    this.mekorot.splice(
      this.findElementInArrey(this.mekorot, object.seedOrigin.name),
      1
    );
    this.listOfArea.splice(
      this.findElementInArrey(this.listOfArea, object.area.name),
      1
    );
    this.plantTypes.splice(
      this.findElementInArrey(this.plantTypes, object.plantType),
      1
    );
    this.initFilters();
    this.initilizedList();
  }


}
