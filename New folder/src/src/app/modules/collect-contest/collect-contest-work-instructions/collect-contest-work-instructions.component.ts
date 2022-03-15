import { Component, HostListener, OnInit } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { GALLERY_CONFIG, GALLERY_CONFIG_DRAWER_OPEN } from 'src/app/mock_data/collect-seeds-data';
import { DETAILS_DATA_INSTRUCTIONS, GUIDANCE_DATA, SECOND_LAYER_DATA } from 'src/app/mock_data/contest-work-instructions-data';
import { StepperLayoutService } from 'src/app/shared/screens/stepper-layout/stepper-layout.service';
import { ContestDetailsModel } from '../collect-contest-details/contest-details.model';

@Component({
  selector: 'app-collect-contest-work-instructions',
  templateUrl: './collect-contest-work-instructions.component.html',
  styleUrls: ['./collect-contest-work-instructions.component.scss']
})
export class CollectContestWorkInstructionsComponent implements OnInit {

  checkMobile: boolean = false;
  isOpen: boolean = true;
  isOpen2: boolean = false;
  openAll: boolean = false;
  public isDrawerOpen: boolean = false;

  public galleryConfig: NgxGalleryOptions[] = GALLERY_CONFIG;
  dataArr: ContestDetailsModel[] = DETAILS_DATA_INSTRUCTIONS;
  dataArr2: ContestDetailsModel[] = GUIDANCE_DATA;
  dataArr3: ContestDetailsModel[] = SECOND_LAYER_DATA;

  constructor(private stepperLayoutService: StepperLayoutService) { }

  ngOnInit(): void {
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
    if (this.isOpen === false)
      this.openAll = false;
    this.checkAllOpen();
  }
  openContainer2() {
    this.isOpen2 = !this.isOpen2;
    if (this.isOpen2 === false)
      this.openAll = false;
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