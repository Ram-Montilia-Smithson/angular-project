import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { treeTypes } from 'src/app/mock_data/bee-plan-complete-data';
import { expandableSecondTableDataArray } from 'src/app/mock_data/order-plantes-complete-data';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { OrderPlantsService } from 'src/app/services/order-plants.service';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { PlantTypes } from '../../../mock_data/spatial-production-data';

@Component({
  selector: 'app-order-plants-complete-table',
  templateUrl: './order-plants-complete-table.component.html',
  styleUrls: ['./order-plants-complete-table.component.scss'],
})
export class OrderPlantsCompleteTableComponent implements OnInit, OnChanges {
  currentPage: number = 0;
  public page: number = 1;
  
  itemsPerPage: number = 8;
  pagesCount: number = 0;
  editRow: number = -1;
  tableDataArrayKeys = [];
  form!: FormGroup;
  isControllers: boolean = true;
  @Input() tableFormArray = [];
  @Input() tableHeaders = [];
  @Input() tableDataArray = [];
  @Input() tableDataArrayOfId = [];
  @Input() headerBorder: boolean = true;
  @Input() kodMinTzemach = [];
  @Output() updateFiltered :EventEmitter<any[]>= new EventEmitter();
  @Output() updateFilteredMishtalot :EventEmitter<any>= new EventEmitter();
  tableDataToShow = [];
  IdOfRow: any;
  kodMintzemach: any;
  ifNeedDelelte:boolean
  filteredPlantType: Observable<any>;
  public minHatzemach = new FormControl(); 
  plantTypes: any[]=[];
  constructor(private cdRef: ChangeDetectorRef, private changeDetection: ChangeDetectorRef, private orderPlantsService: OrderPlantsService, private orderPlantsCompleteService: OrderPlantsCompleteService, private router: Router, private addBeePlan: AddBeePlanService,private spatialProductionProgramService: SpatialProductionProgramService,private addProductionProccessService : AddProductionProcessService,) {
  }

  ngOnInit() {
    
    this.filteredPlantType = this.minHatzemach.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.spatialProductionProgramService.getSpatialProductionProgram(this.addProductionProccessService.addTochnitYezur.id).subscribe(res => {
      this.plantTypes = res.tzmachim;
      this.pagesCount = Math.floor(
        +this.tableDataArray.length / this.itemsPerPage + 0.99999
      );
      this.tableDataArrayKeys = Object.keys(this.tableDataArray[0]).filter(
        (key) => key !== 'controllers'
      );
      // this.updateTableArray(1)
      })
  }
  private _filter(value: string): any {
    
    const filterValue = this._normalizeValue(value);
    return this.plantTypes.filter(item => this._normalizeValue(item.name).includes(filterValue));
  }
  changeAutoComplete(e:any){
    
    this.form.value.minHatzemach=e.source.value;
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tableDataArray != undefined) {
      if (changes.tableDataArray.previousValue !== changes.tableDataArray.currentValue) {
        if(this.tableDataArray.length>0){
        this.tableDataArrayKeys = Object.keys(this.tableDataArray[0]).filter(
          (key) => key !== 'controllers'
        );
        }
        this.updateTableArray(1);
      }
    }
  }
  toFormGroup(tableFormArray: any[]) {
    const group: any = {};
    tableFormArray.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
  updateTableArray(pageNubmer) {
    this.currentPage = +pageNubmer - 1;
    this.tableDataToShow = this.tableDataArray.slice(
      this.currentPage * this.itemsPerPage,
      this.currentPage * this.itemsPerPage + this.itemsPerPage
    );
  }
  editRowHandler(index: number) {
    
    this.minHatzemach.setValue(this.tableDataArray[index].minHatzemach)
    this.form = this.toFormGroup(this.tableFormArray);
    this.IdOfRow = this.tableDataArrayOfId[index]
    this.kodMintzemach = this.kodMinTzemach[index];
    this.editRow = index + this.currentPage * this.itemsPerPage;
    this.form.patchValue(this.tableDataArray[this.editRow]);
    this.ifNeedDelelte=true;
  }
  deleteRowHndler(index: number) {
     
    let objectOfMinHatzemach = Object.assign({ashtaolFirst:   this.tableDataArray[index] .ashtaol, ashtaolNow:0,golaniFirst:this.tableDataArray[index] .golani,golaniNow:0,gilatFirst:this.tableDataArray[index] .gilat,gilatNow:0,kamutFirst:this.tableDataArray[index] .kamut,kamutNow:0})
    return this.orderPlantsService.deleteMinHatzemach(this.tableDataArrayOfId[index]).subscribe(res => {
   
      try{
        if (res) {
          this.tableDataArray.splice(+index, 1);
          this.tableDataArrayOfId.splice(+index, 1)
          this.tableDataToShow = this.tableDataArray
            .map((el) => Object.assign({}, el))
            .slice(
              this.currentPage * this.itemsPerPage,
              this.currentPage * this.itemsPerPage + 8
            );
        }
        if(this.addBeePlan.degelofAddBeeComplete)
          this.updateFiltered.emit(objectOfMinHatzemach)
          else if(this.addBeePlan.degelOfOrderPlanCompleteByMashtelot)
          this.updateFilteredMishtalot.emit(objectOfMinHatzemach)
      if(res.errors != null ){
        if(res.errors.title != null){
          alert(res.errors.title);
        }
        else{
          alert("תקלה במערכת, נא לנסות שנית")
        
        }
      }
    }
    catch(e){
    }
  },
  (error) => { 
    if(error.error != null ){
      if(error.error.title != null){
        alert(error.error.title);
      }
      else{
        alert("תקלה במערכת, נא לנסות שנית")
      
      }
    }                            //Error callback
  
  
  })
}
  clearForm() {
    this.editRow = -1;
    this.form.reset();
  }
  submitForm() {
    const newTotal= +this.form.value.ashtaol + +this.form.value.golani + +this.form.value.gilat
    console.log(newTotal);
    console.log(this.form.value.total); 
    console.log(typeof +this.form.value.total); 
    
    if(+newTotal != +this.form.value.total){
      return alert("יש לוודא שכמות העצים החדשה שווה לכמות העצים הכללית")
    }
    
    if (this.addBeePlan.degelOfOrderPlanComplete == true) {
      let objectOfMinHatzemach = Object.assign({
        address: this.form.value.address ? this.form.value.address : " ",
        ashtaol: this.form.value.ashtaol ? this.form.value.ashtaol : 0,
        email: this.form.value.email ? this.form.value.email : " ",
        gilat: this.form.value.gilat ? this.form.value.gilat : 0,
        golani: this.form.value.golani ? this.form.value.golani : 0,
        lakoach: this.form.value.lakoach ? this.form.value.lakoach : " ",
        kodminHatzemach: this.plantTypes.find(x=>x.name==this.minHatzemach.value).code,
        minHatzemach:this.minHatzemach.value,// this.form.value.minHatzemach,
        phone: this.form.value.phone ? this.form.value.phone : " ",
        kamut: this.form.value.ashtaol && this.form.value.golani && this.form.value.gilat ? Number(this.form.value.ashtaol) + Number(this.form.value.golani) + Number(this.form.value.gilat) : 0,
        id: this.IdOfRow ? this.IdOfRow : 0,
      })
      return this.orderPlantsService.saveMinHatzemachYaarMishki(objectOfMinHatzemach).subscribe(res => {
        try{
        if (res) {
          this.form.value.minHatzemach=objectOfMinHatzemach.minHatzemach
          this.form.value.total = objectOfMinHatzemach.kamut;
          this.tableDataArray[this.editRow] = {
            ...this.form.value,
            controllers: true,
          };
          
          this.tableDataToShow = this.tableDataArray
            .map((el) => Object.assign({}, el))
            .slice(
              this.currentPage * this.itemsPerPage,
              this.currentPage * this.itemsPerPage + 8
            );
            
            this.form.reset();
            this.editRow = -1;
        }
      
      if(res.errors != null ){
        if(res.errors.title != null){
          alert(res.errors.title);

        }
        else{
          alert("תקלה במערכת, נא לנסות שנית")
        
        }
      }
    }
    catch(e){
    }
  },
  (error) => { 
    if(error.error != null ){
      if(error.error.title != null){
        alert(error.error.title);
      }
      else{
        alert("תקלה במערכת, נא לנסות שנית")
      
      }
    }                            //Error callback
  
  
  }) 
    }
    else if (this.addBeePlan.degelOfOrderPlanCompleteByMashtelot == true) {
      let objectOfMinHatzemachByMashtelot = Object.assign({
        tzemach: null,
        ashtaol: this.form.value.ashtaol,
        golani: this.form.value.golani,
        gilat: this.form.value.gilat,
        kamut: Number(this.form.value.ashtaol) + Number(this.form.value.golani) + Number(this.form.value.gilat),
        id: this.IdOfRow
      })
      return this.orderPlantsCompleteService.saveMinHatzemachMashtelaYaarMishki(objectOfMinHatzemachByMashtelot).subscribe(res => {
        
        try{
        if (res) {
          let objectOfMinHatzemach = Object.assign({ashtaolFirst:   this.tableDataArray[this.editRow] .ashtaol, ashtaolNow:objectOfMinHatzemachByMashtelot. ashtaol,golaniFirst:this.tableDataArray[this.editRow] .golani,golaniNow:objectOfMinHatzemachByMashtelot.golani,gilatFirst:this.tableDataArray[this.editRow] .gilat,gilatNow:objectOfMinHatzemachByMashtelot.gilat,kamutFirst:this.tableDataArray[this.editRow] .kamut,kamutNow:objectOfMinHatzemachByMashtelot.kamut})

          this.form.value.kamut = objectOfMinHatzemachByMashtelot.kamut;
          this.tableDataArray[this.editRow] = Object.assign({
            kamut: objectOfMinHatzemachByMashtelot.kamut,
            ashtaol: objectOfMinHatzemachByMashtelot.ashtaol,
            gilat: objectOfMinHatzemachByMashtelot.gilat,
            golani: objectOfMinHatzemachByMashtelot.golani,
            tzemach: this.tableDataArray[this.editRow].tzemach,
            controllers: this.ifNeedDelelte,
          })

          this.tableDataToShow = this.tableDataArray
            .map((el) => Object.assign({}, el))
            .slice(
              this.currentPage * this.itemsPerPage,
              this.currentPage * this.itemsPerPage + 8
            );
          this.form.reset();
          this.updateFilteredMishtalot.emit(objectOfMinHatzemach);
        }
       if(res.errors != null ){
        if(res.errors.title != null){
          alert(res.errors.title);
        }
        else{
          alert("תקלה במערכת, נא לנסות שנית")
        
        }
      }
    }
    catch(e){
    }
  },
  (error) => { 
    if(error.error != null ){
      if(error.error.title != null){
        alert(error.error.title);
      }
      else{
        alert("תקלה במערכת, נא לנסות שנית")
      
      }
    }                            //Error callback
  
  
  }) 
}
    else if (this.addBeePlan.degelofAddBeeComplete == true) {
      let objectOfMinHatzemachAddbeePlan = Object.assign({
        tzemach: null,
        ashtaol: this.form.value.ashtaol,
        golani: this.form.value.golani,
        gilat: this.form.value.gilat,
        kamut: Number(this.form.value.ashtaol) + Number(this.form.value.golani) + Number(this.form.value.gilat),
        id: this.IdOfRow
      })
      this.addBeePlan.saveMinHatzemachMashtelaYaarMishki(objectOfMinHatzemachAddbeePlan).subscribe(res => {
       try{
        if (res) {

          // this.form.value.kamut = objectOfMinHatzemachAddbeePlan.kamut;
          let ObjectToUpdate= Object.assign({ashtaolFirst:   this.tableDataArray[this.editRow] .ashtaol, ashtaolNow:objectOfMinHatzemachAddbeePlan. ashtaol,golaniFirst:this.tableDataArray[this.editRow] .golani,golaniNow:objectOfMinHatzemachAddbeePlan.golani,gilatFirst:this.tableDataArray[this.editRow] .gilat,gilatNow:objectOfMinHatzemachAddbeePlan.gilat,kamutFirst:this.tableDataArray[this.editRow] .kamut,kamutNow:objectOfMinHatzemachAddbeePlan.kamut})
          this.tableDataArray[this.editRow] = Object.assign({
            tzemach: this.tableDataArray[this.editRow].tzemach,
            ashtaol: this.form.value.ashtaol,
            golani: this.form.value.golani,
            gilat: this.form.value.gilat,
            kamut:Number(this.form.value.ashtaol) + Number(this.form.value.golani) + Number(this.form.value.gilat),
            controllers: true,
          })
          this.tableDataToShow = this.tableDataArray
            .map((el) => Object.assign({}, el))
            .slice(
              this.currentPage * this.itemsPerPage,
              this.currentPage * this.itemsPerPage + 8
            );
          this.form.reset();
          this.updateFiltered.emit(ObjectToUpdate);

        
            }
          if(res.errors != null ){
            if(res.errors.title != null){
              alert(res.errors.title);
            }
            else{
              alert("תקלה במערכת, נא לנסות שנית")
            
            }
          }
        }
        catch(e){
        }
      },
      (error) => { 
        if(error.error != null ){
          if(error.error.title != null){
            alert(error.error.title);
          }
          else{
            alert("תקלה במערכת, נא לנסות שנית")
          
          }
        }                            //Error callback
      
      
      }) 
    }
    return undefined
  }


}