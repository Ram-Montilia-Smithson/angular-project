import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { TochniyotYizurList } from 'src/app/Models/TochniyotYizurList';
import { onatNetia } from 'src/app/Models/onatNetia';
import { sugTochnit } from 'src/app/Models/sugTochnit';
import { dropDown } from 'src/app/Models/dropDown';
import { NewProductionProcessTableService } from '../new-production-process/new-production-process.service';
@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss'],
})
export class ProcessFormComponent implements OnInit {
  AllListForTochniyotYitzur: TochniyotYizurList;
  @ViewChild('planingForm') signupForm: NgForm;
  public seasonOptions: onatNetia[] = [];
  public gardeningOptions: dropDown[] = [];
  public planTypeOptions: sugTochnit[] = [];
  public statusOptions: dropDown[] = [];
  processForm: FormGroup;
  ListforTochniotYezur: any[] = [];
  isMerchavitParameter: boolean = false;
  // public seasonOptions: { text: string; isShmita: boolean; value: number }[] = [
  //   { text: 'תש"פ 2020 - 2021', isShmita: true, value: 1 },
  //   { text: 'תש"פ 2020 - 2021', isShmita: false, value: 2 },
  //   { text: 'תש"פ 2020 - 2021', isShmita: true, value: 13 },
  // ];

  // public gardeningOptions: { text: string; value: number }[] = [
  //   { text: 'גולני', value: 1 },
  //   { text: 'אשתאשול', value: 2 },
  //   { text: 'גילת', value: 3 },
  // ];

  // public planTypeOptions: { text: string; value: number }[] = [
  //   { text: 'תוכניות ייצור - מרעה דבורים מרחב צפון', value: 1 },
  //   { text: 'תוכניות ייצור - מרחב מרכז', value: 2 },
  //   { text: 'תוכניות ייצור - יער מישקי מרחב דרום', value: 3 },
  // ];

  // public statusOptions: { text: string; value: number }[] = [
  //   { text: 'מאושר', value: 3 },
  //   { text: 'מאושר', value: 1 },
  //   { text: 'מאושר', value: 2 },
  // ];

  // { text: string; value: number }[] = [
  //   { text: 'גולני', value: 1 },
  //   { text: 'אשתאשול', value: 2 },
  //   { text: 'גילת', value: 3 },
  // ];

  //  { text: string; value: number }[] = [
  //   { text: 'תוכניות ייצור - מרעה דבורים מרחב צפון', value: 1 },
  //   { text: 'תוכניות ייצור - מרחב מרכז', value: 2 },
  //   { text: 'תוכניות ייצור - יער מישקי מרחב דרום', value: 3 },
  // ];

  // { text: string; value: number }[] = [
  //   { text: 'מאושר', value: 3 },
  //   { text: 'מאושר', value: 1 },
  //   { text: 'מאושר', value: 2 },
  // ];
  constructor(
    private newProductionProcessTableService:NewProductionProcessTableService,
    private AddProductionProcess: AddProductionProcessService,
    private fb: FormBuilder,
    private route: Router,
    private addProductionProcessService: AddProductionProcessService
  ) {}
  isMerchavit() {
    if (
      this.processForm.get('sugeyTochniot').value == 1 ||
      this.processForm.get('sugeyTochniot').value == 0
    ) {
      this.isMerchavitParameter = true;
    } else {
      this.isMerchavitParameter = false;
      this.processForm.get('mashtelot').setValue(0);

    }
  }
  ngOnInit() {
     ;
    if(sessionStorage.length==0){
      this.isMerchavitParameter = true;
    }
   else if (sessionStorage.getItem('isMerchavitParameter') == 'true')
      this.isMerchavitParameter = true;
      else{
        this.isMerchavitParameter = false;

      }
    this.processForm = this.fb.group({
      onotNetia: [''],
      mashtelot: [''],
      sugeyTochniot: [''],
      status: [''],
    });
    this.seasonOptions.push({ name: 'הכל', code: 0, isShmita: null });
    this.gardeningOptions.push({ name: 'ללא', code: 0 });
    this.planTypeOptions.push({ name: 'ללא', code: 0, condition: null });
    this.statusOptions.push({ name: 'ללא', code: 0 });
    return this.AddProductionProcess.GetAllListForTochniyotYitzur().subscribe(
      (res) => {
        this.AllListForTochniyotYitzur = res;
        this.seasonOptions = this.seasonOptions.concat(
          this.AllListForTochniyotYitzur.onotNetia
        );
        this.gardeningOptions = this.gardeningOptions.concat(
          this.AllListForTochniyotYitzur.mashtelot
        );
        this.planTypeOptions = this.planTypeOptions.concat(
          this.AllListForTochniyotYitzur.sugeyTochnit
        );
        this.statusOptions = this.statusOptions.concat(
          this.AllListForTochniyotYitzur.statusim
        );
        if (
          sessionStorage.getItem('mashtelot') != null &&
          sessionStorage.getItem('mashtelot') != ''
        )
          this.processForm
            .get('mashtelot')
            .setValue(Number(sessionStorage.getItem('mashtelot')));
        else {
          this.processForm.get('mashtelot').setValue(0);
        }
        if (
          sessionStorage.getItem('onotNetia') != null &&
          sessionStorage.getItem('onotNetia') != ''
        )
          this.processForm
            .get('onotNetia')
            .setValue(Number(sessionStorage.getItem('onotNetia')));
        else {
          this.processForm.get('onotNetia').setValue(0);
        }
        if (
          sessionStorage.getItem('sugeyTochniot') != null &&
          sessionStorage.getItem('sugeyTochniot') != ''
        )
          this.processForm
            .get('sugeyTochniot')
            .setValue(Number(sessionStorage.getItem('sugeyTochniot')));
        else {
          this.processForm.get('sugeyTochniot').setValue(0);
        }
        if (
          sessionStorage.getItem('status') != null &&
          sessionStorage.getItem('status') != ''
        )
          this.processForm
            .get('status')
            .setValue(Number(sessionStorage.getItem('status')));
        else {
          this.processForm.get('status').setValue(0);
        }
        this.saveDataIntoServices();
        this.getTochnitYetzur(0);
      }
    );
  }
  serachProductionProcess() {
    this.saveDataIntoServices();
    this.getTochnitYetzur(0);
  }
  getTochnitYetzur(misparTochnitYezur: number) {
    return this.AddProductionProcess.getTochnitYezur(
      misparTochnitYezur +
        '/' +
        this.AddProductionProcess.tochnitYezurToFind.onatNetia +
        '/' +
        this.AddProductionProcess.tochnitYezurToFind.meshtala +
        '/' +
        this.AddProductionProcess.tochnitYezurToFind.sugTochnit +
        '/' +
        this.AddProductionProcess.tochnitYezurToFind.status
    ).subscribe((res) => {
      if (res) {
        this.addProductionProcessService.listForTablesprocessForm = res;
        this.newProductionProcessTableService.emitNewData(res)
      }
    });
  }
  saveDataIntoServices() {
    sessionStorage.clear();
    sessionStorage.setItem(
      'isMerchavitParameter',
      String(this.isMerchavitParameter)
    );
    sessionStorage.setItem(
      'mashtelot',
      this.processForm.get('mashtelot').value
    );
    sessionStorage.setItem('status', this.processForm.get('status').value);
    sessionStorage.setItem(
      'sugeyTochniot',
      this.processForm.get('sugeyTochniot').value
    );
    sessionStorage.setItem(
      'onotNetia',
      this.processForm.get('onotNetia').value
    );
    this.addProductionProcessService.tochnitYezurToFind.meshtala =
      this.processForm.get('mashtelot').value;
    this.addProductionProcessService.tochnitYezurToFind.status =
      this.processForm.get('status').value;
    this.addProductionProcessService.tochnitYezurToFind.sugTochnit =
      this.processForm.get('sugeyTochniot').value;
    this.addProductionProcessService.tochnitYezurToFind.onatNetia =
      this.processForm.get('onotNetia').value;
  }
}
