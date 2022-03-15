import { Platform } from '@angular/cdk/platform';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { GALLERY_CONFIG, GALLERY_CONFIG_DRAWER_OPEN } from 'src/app/mock_data/collect-seeds-data';
import { DETAILS_DATA, DETAILS_DATA2, DETAILS_DATA3 } from 'src/app/mock_data/contest-details-data';
import { StepperLayoutService } from 'src/app/shared/screens/stepper-layout/stepper-layout.service';
import { ContestService } from '../collect-contest-table/contest.service';
import { ContestDetailsModel } from './contest-details.model';

@Component({
  selector: 'app-collect-contest-details',
  templateUrl: './collect-contest-details.component.html',
  styleUrls: ['./collect-contest-details.component.scss']
})
export class CollectContestDetailsComponent implements OnInit {

  checkMobile: boolean = false;
  isOpen: boolean = false;
  isOpen2: boolean = false;
  openAll: boolean = false;
  public isDrawerOpen: boolean = false;

  public innerWidth: any;
  public galleryConfig: NgxGalleryOptions[] = GALLERY_CONFIG;
  dataArr: ContestDetailsModel[] = DETAILS_DATA;
  dataArr2: ContestDetailsModel[] = DETAILS_DATA2;
  dataArr3: ContestDetailsModel[] = DETAILS_DATA3;

  constructor(private stepperLayoutService: StepperLayoutService,private contestService : ContestService) { }

  ngOnInit(): void {
    this.contestService.GetSubTenderDetail(this.contestService.rowThatChooseInTable.item.globalID).subscribe(x=>{
let a= x
this.contestService.header=x;
this.dataArr[0].data=x[0].tenderID
this.dataArr[1].data=x[0].tenderName
this.dataArr[2].data=x[0].stWorkStartDate
this.dataArr[3].data=x[0].stWorkEndDate
// this.dataArr[4].data=x[0].stWorkStartDate
this.dataArr[5].data=x[0].stSelectedContractor
this.dataArr[6].data=x[0].stSubContractors
// this.dataArr[7].data=x[0].stWorkEndDate
this.dataArr[8].data=x[0].woodVolumeForSubTender
this.dataArr2[0].data=x[0].forestryTendersManas[0].swuForests
this.dataArr2[1].data=x[0].forestryTendersManas[0].swuForests

console.log(a);
  })
/*costSubTender: null
engineer: null
forestryTendersManas: (5) [{…}, {…}, {…}, {…}, {…}]
globalID: "b790cb8c-d409-4e44-8501-69a195b353b4"
objectid: "118"
paymentForDunam: null
priceForCubicMeter: null
stAreaDunam: 565.09
stDistrictName: "מרכז"
stForestNames: "בן-שמן"
stRegionName: "החוף  - שפלה"
stSelectedContractor: null
stStageStatus: {stStageStatus: 'לפני ביצוע', stStageStatusName: 'לפני ביצוע'}
stSubContractors: null
stWorkEndDate: null
stWorkStartDate: "2021-12-08T22:00:00Z"
subTenderID: "10"
subTenderName: "10"
subTenderYear: 2021
tenderID: null
tenderName: "9200/19 - טיפול יערני אזור החוף-שפלה"
woodVolumeForSubTender: 0
-----------------
endDate: null
globalID: "b5db61e3-841a-4db2-bbb5-98a4c0b77413"
helkaForMana: "33,33,33,33"
istPlantSpForMana: "לנטנה ססגונית,דודוניאה דביקה,פלפלון דמוי-אלה"
istTreatmentTypeForMana: "טיפול כימי,עקירה,עקירה"
objectid: "671"
shape_Area: null
stReqForestType: "אקליפטוס"
standCoverTypeForMana: "ברוש מצוי,מעורב עצי מחט,אורן ירושלים,אורן ירושלים"
standDetails: (4) [{…}, {…}, {…}, {…}]
standForMana: "105,117,113,106"
startDate: null
swuAdditionalGuidelines: "xxxx"
swuAllowedForUseTools: "xxxxxx"
swuAreaDesignationCl: "רב-תכליתי, נופש וטיילות"
swuBroadLeafPruning: "ללא טיפול"
swuBroadLeafStemThinning: "טיפול פרטני למין או סוג מסוים"
swuBroadLeafStemThinningDetails: "vvvvvv"
swuConiferSeedlingsThinning: "טיפול פרטני לזריעים ממין או סוג מסוים"
swuConiferSeedlingsThinningDeta: "xxxxxx"
swuCuttingTreatment: "ריסוק בשטח"
swuFieldRisks: "xxxx"
swuForests: "בן-שמן"
swuGeneralDescription: "VV"
swuLyingTreeTreat: "כן"
swuMinimumCapacityPerMonth: "x"
swuNatureAndResearchValuesGuide: "xxxxxx"
swuPreventingDamageGuidelines: "xxxxxxxxx"
swuProhibitedForUseTools: "xxxxxxx"
swuPruningAdditionalGuidelines: "xxx"
swuPullingLogsWorkArea: "קווי_גרירה_מוגדרים_מראש,מפה_טכנולוגית"
swuRequiredTreeDensityType: "מרחק בין גזעים (עד 15 מ')"
swuThinningPurposeType: "ויסות_צפיפות,סניטציה_ובטיחות_עצים_בודדים"
swuThinningType: "סלקטיבי למינים או מאפייני עצים"
swuTreeStumpsTreatments: "השארת גובה גדמים"
swuTrimTreeTreatType: "עבודה ידנית"
swuTrimmedTreeTreatment: "הוצאת_בולים"
swuVegDesignPrinc: "שינוי_רמת_כיסוי,שימור_או_טיפוח_תצורת_צומח_קיימת,יער_גבוה_מצל"
tsCurForestType: "מחטני,אקליפטוס"
woodVolumeForMana: 0


*/
  
   
  this.onResize();
    if (this.checkMobile == false) {
      this.stepperLayoutService.getDrawerSizeChanged().subscribe((width) => {
        if (+width < 30) {
          this.isDrawerOpen = false;
          this.galleryConfig = GALLERY_CONFIG;
        } else {
          this.galleryConfig = GALLERY_CONFIG_DRAWER_OPEN;
          this.isDrawerOpen = true;
        }

        this.isDrawerOpen = +width < 30 ? false : true;
        return null;
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth <= 768) {
      this.isDrawerOpen = true;
      this.checkMobile = true;
    } else {
      this.isDrawerOpen = false;
      this.checkMobile = false;
    }
  }

  openContainer() {
    this.isOpen = !this.isOpen;
    this.checkAllOpen();
  }
  openContainer2() {
    this.isOpen2 = !this.isOpen2;
    this.checkAllOpen();
  }
  toggleOpenAll(bol: boolean) {
    this.openAll = bol;
    this.isOpen = bol;
    this.isOpen2 = bol;
    this.checkAllOpen();
  }

  checkAllOpen() {
    if (this.isOpen === false)
      this.openAll = false;
    if (this.isOpen2 === false)
      this.openAll = false;

    if (this.isOpen && this.isOpen2) {
      this.openAll = true;
    } else {
      this.openAll = false;
    }
  }

}
 