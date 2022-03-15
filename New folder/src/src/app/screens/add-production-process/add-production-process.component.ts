import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { addProductionProcess } from 'src/app/Models/addProductionProcess';
import { addProductionProcessWithExcel } from 'src/app/Models/addProductionProcessWithExcel';
import { MireDvorim } from 'src/app/Models/MireDvorim';
import { Mishkit } from 'src/app/Models/Mishkit';
import { CastExcelForListService } from 'src/app/services/cast-excel-for-list.service';
import { FormValidators } from 'src/app/validators';
import { __await } from 'tslib';
import * as XLSX from 'xlsx';
 import { TochniyotYizurList } from 'src/app/Models/TochniyotYizurList';

@Component({
  selector: 'app-add-production-process',
  templateUrl: './add-production-process.component.html',
  styleUrls: ['./add-production-process.component.scss']
})
export class AddProductionProcessComponent implements OnInit {
  AllListForTochniyotYitzur: TochniyotYizurList;
  addProductionProcessForm: FormGroup;
  public switchInputs: boolean;
  public seasonOptions: any[];
  public gardeningOptions: any[];
  pageExcelName: string
  data: any;
  jsonData: string;
  addProductionProcess: any;
  files: any;
  //  public planTypeOptions:any[];
  public statusOptions: any[];
  public planTypeOptions: any[];
  planTypeOptionsThatChoose: any;
  degelMishki: boolean;
  degelmiree: boolean;

  constructor(private AddProductionProcess: AddProductionProcessService, private fb: FormBuilder, private route: Router, private addProductionProcessService: AddProductionProcessService, private castExcel: CastExcelForListService) { }
  public planTypeOnChange(value: any) {
   this.planTypeOptionsThatChoose=this.planTypeOptions.find(x=>x.code==Number(value));
   this.planTypeOptionsThatChoose.condition ? this.switchInputs = true : this.switchInputs = false;
   this.addProductionProcessForm.get('mashtelot').setValue('');
   this.addProductionProcessForm.get('onotNetia').setValue('');
   this.addProductionProcessForm.get('excelPage').setValue('');
   this.addProductionProcessForm.get('command').setValue('');
  }
  ngOnInit() {
    this.addProductionProcessForm = this.fb.group({ 'sugeyTochnit': [''], 'mashtelot': [''], 'onotNetia': [''], 'command': [''], 'excelPage': [''] });
    return this.AddProductionProcess.GetAllListForTochniyotYitzur().subscribe(res => {
      
      this.AllListForTochniyotYitzur = res;
      this.seasonOptions = this.AllListForTochniyotYitzur.onotNetia;
      this.gardeningOptions = this.AllListForTochniyotYitzur.mashtelot;
      this.planTypeOptions = this.AllListForTochniyotYitzur.sugeyTochnit;
      this.statusOptions = this.AllListForTochniyotYitzur.statusim
      this.addProductionProcessService.status=this.AllListForTochniyotYitzur.statusim;
      this.addProductionProcessService.onaotNetia= this.AllListForTochniyotYitzur.onotNetia;
    })
  }
  changeExcelFile(e: any) {
    this.degelMishki=false
    this.degelmiree=false
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(e.target);
    this.files = target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    this.pageExcelName = e.target.files[0].name;
    this.addProductionProcessForm.get('excelPage').setValue(this.pageExcelName);
  }
  async saveProductionProcess(e: any) {
   
    if (this.addProductionProcessForm.get('sugeyTochnit').value == 1 || this.addProductionProcessForm.get('sugeyTochnit').value == "") {
      this.addProductionProcessForm.get('mashtelot').setValidators(Validators.required);
      this.addProductionProcessForm.get('mashtelot').updateValueAndValidity();
    }
    else {
      this.addProductionProcessForm.get('excelPage').setValidators(Validators.required);
      this.addProductionProcessForm.get('excelPage').updateValueAndValidity();
    }
    this.addProductionProcessForm.get('sugeyTochnit').setValidators(Validators.required);
    this.addProductionProcessForm.get('sugeyTochnit').updateValueAndValidity();
    this.addProductionProcessForm.get('onotNetia').setValidators(Validators.required);
    this.addProductionProcessForm.get('onotNetia').updateValueAndValidity();
    if (this.validateForm(this.addProductionProcessForm)){ 
    
      if (this.addProductionProcessForm.get('sugeyTochnit').value == 2) {
        //async function that call to the cast function and aftaer save the excel list in object
        this.data = await this.castExcelPageToList(this.files);
        this.addProductionProcessService.TochnitYitzurMishkit = new addProductionProcessWithExcel<Mishkit>();
        this.addProductionProcessService.TochnitYitzurMishkit.sugTochnit =Number( this.addProductionProcessForm.get('sugeyTochnit').value);
        this.addProductionProcessService.TochnitYitzurMishkit.onatNetia =Number( this.addProductionProcessForm.get('onotNetia').value);
        this.addProductionProcessService.TochnitYitzurMishkit.excel = this.data;
        
        this.data.forEach(element => {
          if(typeof element.kamut!='number'){
this.degelMishki=true
           return
          }
        
        });
        if(this.degelMishki==true)
        alert("כמות לא תקינה טען שוב")
        if(this.degelMishki==false){
        try{
this.addProductionProcessService.addTochnitYitzurMishkit(this.addProductionProcessService.TochnitYitzurMishkit).subscribe(res=>{
if(res[0]!=null){
this.addProductionProcessService.addTochnitYezur.id=res[0].id;
this.addProductionProcessService.addTochnitYezur.onatNetia=res[0].onatNetia;
this.addProductionProcessService.addTochnitYezur.status=res[0].status;
 this.route.navigate(['/forestry/order-plants']);
}
else{
  alert("השמירה נכשלה!");
}
},
err=>{alert( err.error)}
)

        }
        catch(e){
          console.error(e);        }
      }
    }
      else if (this.addProductionProcessForm.get('sugeyTochnit').value == 3) {
        //async function that call to the cast function and aftaer save the excel list in object
        this.data = await this.castExcelPageToList(this.files);
        this.addProductionProcessService.TochnitYitzurMireDvorim = new addProductionProcessWithExcel<MireDvorim>();
        this.addProductionProcessService.TochnitYitzurMireDvorim.sugTochnit =Number( this.addProductionProcessForm.get('sugeyTochnit').value);
        this.addProductionProcessService.TochnitYitzurMireDvorim.onatNetia =Number( this.addProductionProcessForm.get('onotNetia').value);
        this.addProductionProcessService.TochnitYitzurMireDvorim.excel  = this.data;
        this.data.forEach(element => {
          if(typeof element.count!='number'){
          this.degelmiree=true
          return;
          }
        });
        if(this.degelmiree==true)
        alert("כמות לא תקינה טען שוב")

        if(this.degelmiree==false){
            this.addProductionProcessService.addTochnitYitzurMireDvorim(this.addProductionProcessService.TochnitYitzurMireDvorim).subscribe(res=>{
          
          this.addProductionProcessService.addTochnitYezur.id=res[0].id;
          this.addProductionProcessService.addTochnitYezur.onatNetia=res[0].onatNetia;
          this.addProductionProcessService.addTochnitYezur.status=res[0].status;
           this.route.navigate(['/forestry/add-bee-plan']);
          
          },
          err=>{console.log(err.error);
           alert( err.error)}
          )      }
      }
      
      else {
        this.addProductionProcessService.TochnitYitzurMerchavit = new addProductionProcess();
        this.addProductionProcessService.TochnitYitzurMerchavit.sugTochnit = this.addProductionProcessForm.get('sugeyTochnit').value;
        this.addProductionProcessService.TochnitYitzurMerchavit.onatNetia = Number(this.addProductionProcessForm.get('onotNetia').value);
        this.addProductionProcessService.TochnitYitzurMerchavit.mashtela  = Number(this.addProductionProcessForm.get('mashtelot').value);
        this.addProductionProcessService.TochnitYitzurMerchavit.hearot  = this.addProductionProcessForm.get('command').value;
        try{
          this.addProductionProcessService.addTochnitYitzurMerchavit(this.addProductionProcessService.TochnitYitzurMerchavit).subscribe(res=>{
        
          this.addProductionProcessService.addTochnitYezur={};
         this.addProductionProcessService.addTochnitYezur.id=res[0].id;
         this.addProductionProcessService.addTochnitYezur.onatNetia=res[0].onatNetia;
         this.addProductionProcessService.addTochnitYezur.status=res[0].status;
         this.addProductionProcessService.addTochnitYezur.hearot=res[0].hearot;
         this.addProductionProcessService.addTochnitYezur.mashtela=res[0].mashtela;
            this.route.navigate(['/forestry/spatial-production-program']);
          })
                  }
                  catch(e){
                    console.error(e);        }
      //  this.route.navigate(['/forestry/production-process']);
      }
    }
  }

  castExcelPageToList(file: any) {
    return new Promise(function (resolve, reject) {
      if (file) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(file.files[0]);
        reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
          /* selected the first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          /* save data */
          let data = XLSX.utils.sheet_to_json(ws);
          // to get 2d array pass 2nd parameter as object {header: 1}
          resolve(data);
        }
      }
    });
  }
  validateForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsDirty({ onlySelf: true });
      if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
    form.updateValueAndValidity({
      onlySelf: false,
      emitEvent: true
    });
    return form.valid;
  }

  initilizedObjectOfExcelToSend() {
  }
}
