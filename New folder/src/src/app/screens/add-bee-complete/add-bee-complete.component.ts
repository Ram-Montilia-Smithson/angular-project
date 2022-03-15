import { Component, Input, OnInit } from '@angular/core';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';


import {
  treeTypes,
  tableData,
  tableForm,
  tableHeaders,
  secondTableForm,
  secondTableHeaders,
  secondTableData,
} from '../../mock_data/bee-plan-complete-data';
import { SpatialProductionProgramComponent } from '../spatial-production-program/spatial-production-program.component';
import { NewBeeCompleteTableService } from './new-bee-complete-table/new-bee-complete-table.service';

@Component({
  selector: 'app-add-bee-complete',
  templateUrl: './add-bee-complete.component.html',
  styleUrls: ['./add-bee-complete.component.scss'],
})
export class AddBeeCompleteComponent implements OnInit {
  treeTypes: {
    name: string;
    filterValue: string;
    count: number;
    urlSrc: string;
  }[] = [];
  filterValue: string = 'all';
  isOpend: boolean = true;
  tableHeaders: any = [];
  tableForm: any = [];
  tableData: any = [];
  @Input() title: { plantingSeason: any; status: any; };
  IdArray: any[] = [];
  misparTochnitArray: any[] = [];
  IdGolani: any[] = [];
  IdGilat: any[] = [];
  IdAshtaol: any[] = [];
  listOfAddBeePlan: any[] = [];
  constructor(private orderPlantsCompleteService: OrderPlantsCompleteService,
    private addProductionProcessService: AddProductionProcessService,
    private spatialProductionProgramService: SpatialProductionProgramService,
    private addBeePlanService: AddBeePlanService,
    private newBeeCompleteTableService: NewBeeCompleteTableService) {

 this.treeTypes = treeTypes;
      // this.tableData = tableData;
      this.tableForm = tableForm;
      this.tableHeaders = tableHeaders;
    }
    handleFilterValue(event) {
 
      if (event === 'all') {
       this.newBeeCompleteTableService.emitShowFullTable(false)
        this.ngOnInit();
        this.tableForm = tableForm;
        this.tableHeaders = tableHeaders;
      }
       
      if (event === 'golani') {
      this.newBeeCompleteTableService.emitShowFullTable(true)

        this.orderPlantsCompleteService.getTochnitYitzurMishkiMashtelotFiltered(this.addProductionProcessService.addTochnitYezur.id, 1).subscribe(res => {
          let listOfAddBeePlan = res.mineTzemach;
          // listOfAddBeePlan = this.arrayDeleteMisparTochnit(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayAshtaol(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayGilat(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayGolani(listOfAddBeePlan)
          this.addBeePlanService.listOfAddBeePlan = listOfAddBeePlan;
          this.listOfAddBeePlan = [];
          listOfAddBeePlan.forEach(element => {
            let newObject = Object.assign({
              id:element.id,
              tzemach: element.tzemach,
              kamut: element.kamut,
              controllers: false
            })
            this.listOfAddBeePlan.push(newObject);
          });
          this.tableData = this.listOfAddBeePlan;
          this.addBeePlanService.listOfAddBeePlan =this.tableData;
         console.log(this.tableData);
         
         this.newBeeCompleteTableService.emitData(this.tableData);
        })

      }
      if (event === 'gilat') {
      this.newBeeCompleteTableService.emitShowFullTable(true)

        this.orderPlantsCompleteService.getTochnitYitzurMishkiMashtelotFiltered(this.addProductionProcessService.addTochnitYezur.id, 2).subscribe(res => {
          let listOfAddBeePlan =res.mineTzemach;
          // listOfAddBeePlan = this.arrayDeleteMisparTochnit(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayAshtaol(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayGilat(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayGolani(listOfAddBeePlan)
          this.addBeePlanService.listOfAddBeePlan = listOfAddBeePlan;
          this.listOfAddBeePlan = [];
          listOfAddBeePlan.forEach(element => {
            let newObject = Object.assign({
              id:element.id,
              tzemach: element.tzemach,
              kamut: element.kamut,
              controllers: false
            })
            this.listOfAddBeePlan.push(newObject);
          });
          this.tableData = this.listOfAddBeePlan;
          this.tableForm = secondTableForm;
          this.tableHeaders = secondTableHeaders
          console.log(this.tableData);
          this.addBeePlanService.listOfAddBeePlan =this.tableData;

          this.newBeeCompleteTableService.emitData(this.tableData);
        })
      }
      if (event === 'ashtaol') {
        this.newBeeCompleteTableService.emitShowFullTable(true)
        this.orderPlantsCompleteService.getTochnitYitzurMishkiMashtelotFiltered(this.addProductionProcessService.addTochnitYezur.id, 3).subscribe(res => {
          let listOfAddBeePlan =res.mineTzemach;
          // listOfAddBeePlan = this.arrayDeleteMisparTochnit(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayAshtaol(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayGilat(listOfAddBeePlan)
          // listOfAddBeePlan = this.arrayGolani(listOfAddBeePlan)
          this.addBeePlanService.listOfAddBeePlan = listOfAddBeePlan;
          this.listOfAddBeePlan = [];
          listOfAddBeePlan.forEach(element => {
            let newObject = Object.assign({
              id:element.id,
              tzemach: element.tzemach,
              kamut: element.kamut,
              controllers: false
            })
            this.listOfAddBeePlan.push(newObject);
          });
          this.tableForm = secondTableForm;
          this.tableHeaders = secondTableHeaders
          this.newBeeCompleteTableService.emitData(listOfAddBeePlan);

        })
      }
    }
    ngOnInit() {
      this.addBeePlanService.degelofAddBeeComplete = true;
      this.addBeePlanService.getTochnitYitzurMireDvorim(this.addProductionProcessService.addTochnitYezur.id).subscribe(res => {
        this.orderPlantsCompleteService.treeTypes = treeTypes;
        this.addBeePlanService.degelOfOrderPlanComplete = false;
        this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot = false;
        this.addBeePlanService.degelofAddBeeComplete = true;
        let listOfAddBeePlan = res.mineTzemach;
         listOfAddBeePlan =this.arraySorting(res.mineTzemach);
        listOfAddBeePlan=this.arrayDeleteMisparTochnit(listOfAddBeePlan)
        listOfAddBeePlan = listOfAddBeePlan
        // this.addBeePlanService.listOfAddBeePlan = res.mineTzemach;
        this.tableData = listOfAddBeePlan;
        this.treeTypes[0]["count"] = res.ashtaol;
        this.treeTypes[1]["count"] = res.golani;
        this.treeTypes[2]["count"] = res.gilat;
        this.treeTypes[3]["count"] = res.total;
         this.newBeeCompleteTableService.emitData(this.tableData);

      })
    }
    arraySorting(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.IdArray[i] = arr[i]["id"];
        delete arr[i]["id"];
        arr[i].controllers = true;
      }
      return arr;

    }
    arrayDeleteMisparTochnit(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.misparTochnitArray[i] = arr[i]["misparTochnit"];
        delete arr[i]["misparTochnit"];
        arr[i].controllers = true;
      }
      return arr;
    }
    arrayAshtaol(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.IdAshtaol[i] = arr[i]["ashtaol"];
        delete arr[i]["ashtaol"];
        arr[i].controllers = true;
      }
      return arr;

    }
    arrayGolani(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.IdGolani[i] = arr[i]["golani"];
        delete arr[i]["golani"];
        arr[i].controllers = true;
      }
      return arr;

    }
    arrayGilat(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.IdGilat[i] = arr[i]["gilat"];
        delete arr[i]["gilat"];
        arr[i].controllers = true;
      }
      return arr;

    }
    toggleEditHandler(): void {
      this.isOpend = !this.isOpend;
    }
    savechangesInDB(event: any){
      let status = this.addProductionProcessService.status.find(x => x.code == Number(event.status))
      this.title = { plantingSeason: this.addProductionProcessService.addTochnitYezur.onatNetia, status: status.name }
      let onatNetia = this.addProductionProcessService.onaotNetia.find(x => x.name == this.addProductionProcessService.addTochnitYezur.onatNetia);
      let objectToSave = Object.assign({ id: this.addProductionProcessService.addTochnitYezur.id, onatNetia: onatNetia.code, status: event.status, hearot: "" })
      return this.spatialProductionProgramService.editTochnit(objectToSave).subscribe(res => {
        try {
          if (res) {
            this.addProductionProcessService.addTochnitYezur.status = objectToSave.status;
          }
          if (res.errors != null) {
            if (res.errors.title != null) {
              alert(res.errors.title);
            }
            else {
              alert("תקלה במערכת, נא לנסות שנית")

            }
          }
        }
        catch (e) {
        }
      },
        (error) => {
          if (error.error != null) {
            if (error.error.title != null) {
              alert(error.error.title);
            }
            else {
              alert("תקלה במערכת, נא לנסות שנית")

            }
          }                            //Error callback


        })
    }
    updateFiltered(updateFiltered: any){
      this.treeTypes[0].count -= (Number(updateFiltered.ashtaolFirst));
      this.treeTypes[0].count += Number(updateFiltered.ashtaolNow)
      this.treeTypes[1].count -= (Number(updateFiltered.golaniFirst));
      this.treeTypes[1].count += (Number(updateFiltered.golaniNow));
      this.treeTypes[2].count -= (Number(updateFiltered.gilatFirst));
      this.treeTypes[2].count += (Number(updateFiltered.gilatNow));
      this.treeTypes[3]["count"] -= Number(updateFiltered.kamutFirst);
      this.treeTypes[3]["count"] += Number(updateFiltered.kamutNow);
    }
  }
