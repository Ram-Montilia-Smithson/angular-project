import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { AllSearchUnitsForWorkDilution } from 'src/app/Models/AllSearchUnitsForWorkDilution';
import { MireDvorim } from 'src/app/Models/MireDvorim';
import { Ezorim } from 'src/app/Models/Ezorim';
import { Merchavim } from 'src/app/Models/Merchavim';
import { Mishkit } from 'src/app/Models/Mishkit';
import { status } from 'src/app/Models/status';
import { Yaarot } from 'src/app/Models/Yaarot';
import { YearOfWorkPlan } from 'src/app/Models/YearOfWorkPlan';
import { GridScreenService } from 'src/app/services/grid-screen.service';
import { HttpService } from 'src/app/services/http.service';
import { SearchScreenService } from 'src/app/services/search-screen.service';
import { FormValidators } from 'src/app/validators';
import * as XLSX from 'xlsx';
import * as i0 from "@angular/core";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  WorkUnitsForDilutionForm: FormGroup;
  YearOfWorkPlansList: YearOfWorkPlan[];
  StatusesList: status[];
  MerchavimList: Merchavim[]=[];
  EzorimList: Ezorim[]=[];
  YaarotList: Yaarot[]=[];
  Merchavim:Merchavim[]=[];
  Yaarot:Yaarot[]=[];
  Ezorim:Ezorim[]= [];
  yaarSelected: any;
  ezorSelected: Ezorim;
 objectForMerchavimList:Merchavim = new Merchavim();
 objectForEzorimList:Ezorim= new Ezorim();
 objectForYaarotimList:Yaarot= new Yaarot();
 isListsFull:boolean=false;
  constructor(private fb: FormBuilder, private searchService: SearchScreenService, private route: Router, private workUnitService:GridScreenService,private httpService:HttpService) {
  //  const XLSX = require('xlsx');
  }
  ngOnInit(): any {
    this.WorkUnitsForDilutionForm = this.fb.group({ 'yearOfWorkPlanName': [''], 'statusName': [''], 'ezorName': [''], 'yaarName': [''], 'IDNumWorkForPlan': [''], 'merchavName': [''] });
    this.initilizeListes();
  }
  public value = '';
  onSubmit() {
this.workUnitService.workUnitToSend.workYear=this.WorkUnitsForDilutionForm.get('yearOfWorkPlanName').value!=null&& this.WorkUnitsForDilutionForm.get('yearOfWorkPlanName').value!=""?this.WorkUnitsForDilutionForm.get('yearOfWorkPlanName').value:null;
this.workUnitService.workUnitToSend.for_NO=this.WorkUnitsForDilutionForm.get('yaarName').value!=null&&this.WorkUnitsForDilutionForm.get('yaarName').value!=""?String(this.WorkUnitsForDilutionForm.get('yaarName').value):null
this.workUnitService.workUnitToSend.wpfsRequestStatus=this.WorkUnitsForDilutionForm.get('statusName').value!=""?this.WorkUnitsForDilutionForm.get('statusName').value:null;
this.workUnitService.workUnitToSend.regionName=(this.WorkUnitsForDilutionForm.get('ezorName').value!="")&&this.WorkUnitsForDilutionForm.get('ezorName').value!=null?(this.EzorimList.find( x=>x.ezor_code==(this.WorkUnitsForDilutionForm.get('ezorName').value)).ezor_name):null;
this.workUnitService.workUnitToSend.districtName=this.WorkUnitsForDilutionForm.get('merchavName').value!=""&&this.WorkUnitsForDilutionForm.get('merchavName').value!=null?this.Merchavim.find(x=>x.merchav_co==(this.WorkUnitsForDilutionForm.get('merchavName').value)).merchav_na:null;
this.workUnitService.workUnitToSend.trtUnit=this.WorkUnitsForDilutionForm.get('IDNumWorkForPlan').value!=null?this.WorkUnitsForDilutionForm.get('IDNumWorkForPlan').value:null;
  this.route.navigate(['/forestry/results']); 

//this.route.navigate(["/results"]);
    }
  //}
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
  initilizeListes(): any {
    //initilized all the lists of select
    this.objectForMerchavimList={merchav_co:null,objectid:null,merchav_na:'--בחר--'};
    this.objectForEzorimList={ezor_code:null,ezor_name:'--בחר--',merchav_co:null};
    this.objectForYaarotimList={district_C:null,fid:null,foR_Name:'--בחר--',foR_Num:null,region_Cod:null};
    this.EzorimList.push(this.objectForEzorimList);
    this.MerchavimList.push(this.objectForMerchavimList);
    this.YaarotList.push(this.objectForYaarotimList);
    try{
    return this.searchService.GetAllListForSearchScreen().subscribe(res=>{
this.MerchavimList= this.MerchavimList.concat(res.listOfMerchavim);
this.EzorimList=this.EzorimList.concat(res.listOfEzorim);
this.YaarotList=this.YaarotList.concat(res.listOfYaarot);
      this.Merchavim=this.MerchavimList;
      this.Ezorim = this.EzorimList;
      this.Yaarot =  this.YaarotList;
              this.StatusesList = [{ statusName: '--בחר--', statusCode: null },{ statusName: 'בהכנה', statusCode: 'בהכנה', }, { statusName: 'הוגש למחלקת יער', statusCode: 'הוגש למחלקת יער' }, { statusName: 'אושר על ידי מחלקת יער', statusCode: 'אושר על ידי מחלקת יער' }, { statusName: 'לא אושר על ידי אגף הייעור', statusCode: 'לא אושר על ידי אגף הייעור' }, { statusName: 'הוגש לרגולטור', statusCode: 'הוגש לרגולטור' }, { statusName: 'אושר על ידי אגף הייעור', statusCode: 'אושר על ידי אגף הייעור' }] ,
              this.YearOfWorkPlansList =[{ yearOfWorkPlanName: '--בחר--', yearOfWorkPlanCode: null },{ yearOfWorkPlanName: '2019', yearOfWorkPlanCode: '2019' }, { yearOfWorkPlanName: '2020', yearOfWorkPlanCode: '2020' }, { yearOfWorkPlanName: '2021', yearOfWorkPlanCode: '2021' }, { yearOfWorkPlanName: '2022', yearOfWorkPlanCode: '2022' }, { yearOfWorkPlanName: '2023', yearOfWorkPlanCode: '2023' }, { yearOfWorkPlanName: '2024', yearOfWorkPlanCode: '2024' }]
              this.isListsFull=true;  
    });
  }
  catch(e){}
    /*return forkJoin([
      this.searchService.getEzorimList(),
      this.searchService.getYaarotList(),
      this.searchService.getMerchavimList(),
    ]).subscribe((res) => {
     this.EzorimList =this.EzorimList .concat(res[0]);
      this.YaarotList = this.YaarotList.concat(res[1])  ,
        this.MerchavimList =this.MerchavimList.concat(res[2 ]),*/
    }
  changeList(object: any) {
    //check which select is change and initilized in accordance
    switch (object.source.ngControl.name) {
      case "merchavName": {
        this.initilizedEzor(object.source.ngControl.name,object.value);
        this.initilizedYaar(this.WorkUnitsForDilutionForm.get(object.source.ngControl.name).value);
        break;
      }
      case "ezorName": {
        this.initilizedYaar(this.WorkUnitsForDilutionForm.get(object.source.ngControl.name).value);
   
        break;
      }
      case "yaarName":{
        this.initilizedEzorAndMerchav(this.WorkUnitsForDilutionForm.get(object.source.ngControl.name).value);
      }
    }
  }
  //initilized merchav and Ezor when yaar select is changed
  initilizedEzorAndMerchav(value: number) {
        this.yaarSelected= this.YaarotList.find(x=>x.foR_Num== value);
    this.WorkUnitsForDilutionForm.get("merchavName").setValue( this.yaarSelected.region_Cod);
    this.WorkUnitsForDilutionForm.get("ezorName").setValue( this.yaarSelected.district_C);
  }
  initilizedEzor(controlName: any,value:number) {
    //initilized Ezor when merchav select is changed
   if( this.WorkUnitsForDilutionForm.get("merchavName").value==null)
   {
    this.YaarotList=this.Yaarot;
    this.EzorimList= this.Ezorim;
    this.clearValues();
   }
   else{
    this.EzorimList=this.Ezorim;
    this.clearValues();
    this.EzorimList= this.EzorimList.filter(x => x.merchav_co == value);
   }
  }
  initilizedYaar(ezorCode: number) {
    //initilized Yaar when merchav select changes and when ezor select is changed
    this.YaarotList=this.Yaarot;
    this.WorkUnitsForDilutionForm.get("yaarName").setValue(null);
let ezorimSelected;//if merchav not null
if (this.WorkUnitsForDilutionForm.get('merchavName').value) {
  //find the ezor that choosen
  this.ezorSelected= this.EzorimList.find(x=>x.merchav_co==ezorCode)
}
  //if ezor not null
if (this.WorkUnitsForDilutionForm.get('ezorName').value) {
////find the ezor that choosen
  this.ezorSelected= this.EzorimList.find(x=>x.ezor_code==ezorCode)
}
//if merchav is choosen
    if(this.WorkUnitsForDilutionForm.get('merchavName').value &&  this.ezorSelected.merchav_co==this.WorkUnitsForDilutionForm.get('merchavName').value){
      //initilized the yaarot list
      this.YaarotList = this.YaarotList.filter(x => x.region_Cod ==   this.WorkUnitsForDilutionForm.get('merchavName').value);
  }//if ezor is also choosen
    if (  this.WorkUnitsForDilutionForm.get('ezorName').value) {
//initilized the yaarot list in accrodence
      this.YaarotList = this.YaarotList.filter(x => x.district_C == this.WorkUnitsForDilutionForm.get('ezorName').value);
      //find the object of ezorim that choosen
     ezorimSelected=  this.EzorimList.filter(x=>x.ezor_code==this.WorkUnitsForDilutionForm.get('ezorName').value);
    }
   if( ezorimSelected
   &&ezorimSelected.length>0){
     //initilized merchav
    this.WorkUnitsForDilutionForm.get("merchavName").setValue(  ezorimSelected[0].merchav_co);
  }
  }
  clearValues() {
    //clear value of ezor and yaar
    this.WorkUnitsForDilutionForm.get("ezorName").setValue(null);
    this.WorkUnitsForDilutionForm.get("yaarName").setValue(null);
  }
  /*findObjectOfInputFeild(formControlNameOfSelect:string){
  return  this.inputFields.find(x => x.formControlName == formControlNameOfSelect);
  }*/
  // addFileXLS(e:any){
  //   /* wire up file reader */
  //   const target: DataTransfer = <DataTransfer>(e.target);
  //   if (target.files.length !== 1) {
  //     throw new Error('Cannot use multiple files');
  //   }
  //   const reader: FileReader = new FileReader();
  //   reader.readAsBinaryString(target.files[0]);
  //   reader.onload = (e: any) => {
  //     /* create workbook */
  //     const binarystr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  //     /* selected the first sheet */
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //     /* save data */
  //     this.data = (XLSX.utils.sheet_to_json(ws)); 
  //     // to get 2d array pass 2nd parameter as object {header: 1}
  //   this.listOfBeeGrazing= this.data;
  //     console.log(this.data); 
  //     console.log(this.listOfBeeGrazing); 
  //     // Data will be logged in array format containing objects
  //     alert(this.data)
  //   }
  // }
}



  
