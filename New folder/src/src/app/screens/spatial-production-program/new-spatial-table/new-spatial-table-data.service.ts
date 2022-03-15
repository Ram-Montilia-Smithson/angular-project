import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { minHatzemachMerchavi } from 'src/app/Models/minHatzemachMerchavi';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { HttpService } from 'src/app/services/http.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { FormService } from 'src/app/shared/components/form/services/form.service';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import { NewSpatialTableModel } from './new-spatial-table.model';

@Injectable({
  providedIn: 'root'
})
export class NewSpatialTableDataService {
  minHatzemachMerchavi: any;

  public dataFromServer$: BehaviorSubject<NewSpatialTableModel[]>
  filteredData: any;
  filtersArr: any;
  totalCount: any;



  constructor(private formService: FormService, private httpService: HttpService, private addProductionProccessService: AddProductionProcessService,
    private spatialProductionProgramService: SpatialProductionProgramService,
  ) {
    this.dataFromServer$ = new BehaviorSubject<NewSpatialTableModel[]>([]);
  }
  initFilteredTable(kodmishpacha, allData) {
    this.spatialProductionProgramService.getTzmachimLeMishpachaMerchavit(
      this.addProductionProccessService.addTochnitYezur.id,
      kodmishpacha
    ).subscribe((res) => {
      this.filteredData = res;
      this.spatialProductionProgramService.listForTableForSpatialProductionProgram =
        res.mineTzemach;
      if (this.filteredData == null) {
        this.filteredData = [];
        return;
      }
       
      this.getIconsForPlantTypes(allData.tzmachim);
      this.load(this.filteredData);
    });

  }
 
  getIconsForPlantTypes(plantTypes) {
    if (plantTypes != null)
      for (let i = 0; i < plantTypes.length; i++) {
        if (plantTypes[i].mishpacha == 'מחטניים') {
          plantTypes[i].icon = 'assets/images/spatial-christmas-tree.svg';
        } else if (plantTypes[i].mishpacha == 'שיטים') {
          plantTypes[i].icon =
            'assets/images/spatial-tree-black-silhouette-shape.svg';
        } else if (plantTypes[i].mishpacha == 'חורש טבעי') {
          plantTypes[i].icon = 'assets/images/spatial-tree.svg';
        } else if (plantTypes[i].mishpacha == 'עצי ושיחי נוי') {
          plantTypes[i].icon = 'assets/images/spatial-shape.svg';
        } else if (plantTypes[i].mishpacha == 'אקליפטוס') {
          plantTypes[i].icon = 'assets/images/spatial-eucalyptus.svg';
        }
      }
  }

  public load(data: NewSpatialTableModel[]): void {
    this.dataFromServer$.next([...data]);
  }

  public connect(): Observable<NewSpatialTableModel[]> {
    return this.dataFromServer$.asObservable();
  }


  EditData(data: any[], row: RowModel<NewSpatialTableModel>, allData: any) {
    let tzemach = allData.tzmachim.find(x => x.name == row.form.formGroup.value.minHatzemach)
    let ribuy = allData.kibulim.find(x => x.code == row.form.formGroup.value.ribuy);
    let kibul = allData.ribuyim.find(x => x.code == row.form.formGroup.value.kibul);
    let makor = allData.mekorot.find(x => x.code == row.form.formGroup.value.makor);
    let ezor = allData.ezorim.find(x => x.code == row.form.formGroup.value.ezor);
    const item = data.find(x => x.id == row.item.id);
    const index = data.findIndex(x => x.id == row.item.id);

    // this.choosenReceptacle = { name: '', code: '' };
    // this.choosenArea = { name: '', code: '' };
    // this.chosenSeedOrigin = { name: '', code: '' };
    // this.chosenMultiplicityMaterial = { name: '', code: '' };
    this.minHatzemachMerchavi = new minHatzemachMerchavi();
    this.minHatzemachMerchavi.misparTochnit =
      this.addProductionProccessService.addTochnitYezur.id;
    this.minHatzemachMerchavi.id = item.id;
    if (row.form.formGroup.value.ribuy != null && row.form.formGroup.value.ribuy != '' && typeof row.form.formGroup.value.ribuy === 'number')
      this.minHatzemachMerchavi.ribuy = Number(row.form.formGroup.value.ribuy);
    else {
      if (row.form.formGroup.value.ribuy != "")
        this.minHatzemachMerchavi.ribuy = allData.kibulim.find(x => x.name == row.form.formGroup.value.ribuy).code
      else {
        this.minHatzemachMerchavi.ribuy = 0
      }
    }
    if (row.form.formGroup.value.makor != null && row.form.formGroup.value.makor != '' && typeof row.form.formGroup.value.makor === 'number')
      this.minHatzemachMerchavi.makor = Number((row.form.formGroup.value.makor))
    else {
      if (row.form.formGroup.value.makor != "")
        this.minHatzemachMerchavi.makor = allData.mekorot.find(x => x.name == row.form.formGroup.value.makor).code
      else {
        this.minHatzemachMerchavi.makor = 0
      }
    }
    if (row.form.formGroup.value.ezor != null && row.form.formGroup.value.ezor != '' && typeof row.form.formGroup.value.ezor === 'number')
      this.minHatzemachMerchavi.ezor = Number(row.form.formGroup.value.ezor);
    else {
      if (row.form.formGroup.value.ezor != "")
        this.minHatzemachMerchavi.ezor = allData.ezorim.find(x => x.name == row.form.formGroup.value.ezor).code
      else {
        this.minHatzemachMerchavi.ezor = 0
      }
    }
    if (row.form.formGroup.value.kibul != null && row.form.formGroup.value.kibul != '' && typeof row.form.formGroup.value.kibul === 'number')
      this.minHatzemachMerchavi.kibul = Number(row.form.formGroup.value.kibul);
    else {
      if (row.form.formGroup.value.kibul != "")
        this.minHatzemachMerchavi.kibul = allData.ribuyim.find(x => x.name == row.form.formGroup.value.kibul).code
      else {
        this.minHatzemachMerchavi.kibul = 0
      }
    }
    this.minHatzemachMerchavi.minHatzemach = row.form.formGroup.value.minHatzemach;
    this.minHatzemachMerchavi.kodMinHatzemach = tzemach.code;
    this.minHatzemachMerchavi.kamut = Number(row.form.formGroup.value.kamut);
    this.minHatzemachMerchavi.hearot = row.form.formGroup.value.hearot;
    let itemToUpdate = this.minHatzemachMerchavi;


    this.spatialProductionProgramService.saveTochnitYitzurMerchavit(
      this.minHatzemachMerchavi
    ).subscribe(
      (res) => {
        try {
          if (res.errors == null) {
            itemToUpdate.ribuy = ribuy ? ribuy.name : row.form.formGroup.value.ribuy;
            itemToUpdate.makor = makor ? makor.name : row.form.formGroup.value.makor;
            itemToUpdate.kibul = kibul ? kibul.name : row.form.formGroup.value.kibul;
            itemToUpdate.ezor = ezor ? ezor.name : row.form.formGroup.value.ezor;
            itemToUpdate.minHatzemach = tzemach ? tzemach.name : row.form.formGroup.value.minHatzemach
            itemToUpdate.kodMinHatzemach = tzemach ? tzemach.code : 0
            delete data[index].misparTochnit
            data[index] = { ...itemToUpdate }
            this.spatialProductionProgramService.listForTableForSpatialProductionProgram = data;
             
            this.load(data)
            //update filters
            // this.initFilters();
            // this.initilizedList();
          } else {
            if (res.errors.title != null) {
              alert(res.errors.title);
              return [];
            } else {
              alert('תקלה במערכת, נא לנסות שנית');
              return [];
            }
          }
        } catch (e) { }
        return []
      }
      ,
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
        return []
      }
    );

    // this.filteredData.shift()
    // if (index == 0 && this.addInputIsOpen) {
    //   this.addItemToArray(item);
    //   return;
    // }
    // item.editable = false;
    // data[this.findElementInArrayById(item.id)] = item;
    return data
  };


  addData(data: any[], row: RowModel<NewSpatialTableModel>, allData: any) {
    let tzemach = allData.tzmachim.find(x => x.name == row.form.formGroup.value.minHatzemach)
    let ribuy = allData.kibulim.find(x => x.code == row.form.formGroup.value.ribuy);
    let kibul = allData.ribuyim.find(x => x.code == row.form.formGroup.value.kibul);
    let makor = allData.mekorot.find(x => x.code == row.form.formGroup.value.makor);
    let ezor = allData.ezorim.find(x => x.code == row.form.formGroup.value.ezor);


    // this.choosenReceptacle = { name: '', code: '' };
    // this.choosenArea = { name: '', code: '' };
    // this.chosenSeedOrigin = { name: '', code: '' };
    // this.chosenMultiplicityMaterial = { name: '', code: '' };
    this.minHatzemachMerchavi = new minHatzemachMerchavi();
    this.minHatzemachMerchavi.misparTochnit =
      this.addProductionProccessService.addTochnitYezur.id;
    this.minHatzemachMerchavi.id = 0;
    if (row.form.formGroup.value.ribuy != null && row.form.formGroup.value.ribuy != '' && typeof row.form.formGroup.value.ribuy === 'number')
      this.minHatzemachMerchavi.ribuy = Number(row.form.formGroup.value.ribuy);
    else {
      this.minHatzemachMerchavi.ribuy = 0
    }
    if (row.form.formGroup.value.makor != null && row.form.formGroup.value.makor != '' && typeof row.form.formGroup.value.makor === 'number')
      this.minHatzemachMerchavi.makor = Number((row.form.formGroup.value.makor))
    else {
      this.minHatzemachMerchavi.makor = 0
    }
    if (row.form.formGroup.value.ezor != null && row.form.formGroup.value.ezor != '' && typeof row.form.formGroup.value.ezor === 'number')
      this.minHatzemachMerchavi.ezor = Number(row.form.formGroup.value.ezor);
    else {
      this.minHatzemachMerchavi.ezor = 0
    }
    if (row.form.formGroup.value.kibul != null && row.form.formGroup.value.kibul != '' && typeof row.form.formGroup.value.kibul === 'number')
      this.minHatzemachMerchavi.kibul = Number(row.form.formGroup.value.kibul);
    else {
      this.minHatzemachMerchavi.kibul = 0
    }
    this.minHatzemachMerchavi.minHatzemach = row.form.formGroup.value.minHatzemach;
    this.minHatzemachMerchavi.kodMinHatzemach = tzemach.code;
    this.minHatzemachMerchavi.kamut = Number(row.form.formGroup.value.kamut);
    this.minHatzemachMerchavi.hearot = row.form.formGroup.value.hearot;
    let itemToUpdate = this.minHatzemachMerchavi;
    this.spatialProductionProgramService.saveTochnitYitzurMerchavit(
      this.minHatzemachMerchavi
    ).subscribe(
      (res) => {
        try {
          if (res.errors == null) {
            return this.spatialProductionProgramService.getSpatialProductionProgram(
              this.addProductionProccessService.addTochnitYezur.id
            ).subscribe((res) => {
              console.log(res)
              let max = Math.max.apply(Math, res.mineTzemach.map(function (o) { return o.id; }))
              itemToUpdate.ribuy = ribuy ? ribuy.name : "";
              itemToUpdate.makor = makor ? makor.name : "";
              itemToUpdate.kibul = kibul ? kibul.name : "";
              itemToUpdate.ezor = ezor ? ezor.name : "";
              itemToUpdate.minHatzemach = tzemach ? tzemach.name : row.form.formGroup.value.minHatzemach
              itemToUpdate.kodMishpacha = tzemach ? tzemach.code : 0
              delete itemToUpdate.kodMinHatzemach
              itemToUpdate.teurMishpacha = tzemach.mishpacha
              itemToUpdate.id = max;
              delete itemToUpdate.misparTochnit
              data.unshift({ ...itemToUpdate })
              this.spatialProductionProgramService.listForTableForSpatialProductionProgram = data;
              console.log(data);
 
              this.load(data)
              //update filters
              // this.initFilters();
              // this.initilizedList();
            })
          }
          else {
            if (res.errors.title != null) {
              alert(res.errors.title);
              return [];
            } else {
              alert('תקלה במערכת, נא לנסות שנית');
              return [];
            }
          }
        } catch (e) { }
        return []
      }
      ,
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
        return []
      },
    )
  }
}