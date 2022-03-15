import { Component, OnInit } from '@angular/core';
import {
  GALLERY_CONFIG_DRAWER_OPEN,
  GALLERY_PICTURES,
  LOCTAION_MOCK,
} from 'src/app/mock_data/collect-seeds-data';
import { HeaderTextModel } from 'src/app/Models/header-text.model';
import { CollectSeedsOrderLocationModel } from './collect-seeds-order-location.model';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { StepperLayoutService } from 'src/app/shared/screens/stepper-layout/stepper-layout.service';
import { map, switchMap } from 'rxjs';
import { CollectSeedOrderService } from '../collect-seed-order/collect-seed-order.sevice';
import { CollectSeedsService } from '../collect-seeds-table/collect-seeds.service';

@Component({
  selector: 'app-collect-seeds-order-location',
  templateUrl: './collect-seeds-order-location.component.html',
  styleUrls: ['./collect-seeds-order-location.component.scss'],
})
export class CollectSeedsOrderLocationComponent implements OnInit {
  // public calcDetails: CollectSeedsOrderAmountCalcModel;
  // public seedsDetails: CollectSeedsOrderAmountSeedsModel;
  // public seedsHeadlines: { key: string; value: string }[] = [];
  // public calcHeadlines: { key: string; value: string }[] = [];

  public locationDetails: CollectSeedsOrderLocationModel;
  public locationHeadlines: HeaderTextModel[] = [];
  public galleryPictures: NgxGalleryImage[] = GALLERY_PICTURES;
  public galleryConfig: NgxGalleryOptions[] 
  public isDrawerOpen: boolean = false;
  constructor(private stepperLayoutService: StepperLayoutService,private collectSeedsOrderService:CollectSeedOrderService,private collectSeedsService:CollectSeedsService) {}

  ngOnInit(): void {
    this.locationHeadlines = [
      { key: 'siteSize', value: 'גודל האתר' },
      { key: 'treeID', value: 'מספר העץ' },
      { key: 'treeIDText', value: 'הוראות הגעה לעץ' },
    ];
     
    this.locationDetails =this.collectSeedsOrderService.details //this.collectSeedsService.rowThatChooseTable;
    this.galleryPictures=[]
    this.collectSeedsOrderService.details[0].filesAttachments.forEach(element => {
      this.galleryPictures.push({small: element.url,medium: element.url,big: element.url})
    });
    this.stepperLayoutService.getDrawerSizeChanged().subscribe((width) => {
      // this.galleryConfig = GALLERY_CONFIG;
      this.galleryConfig = GALLERY_CONFIG_DRAWER_OPEN;
      if (+width < 30) {
        this.isDrawerOpen = false;
      } else {
        this.isDrawerOpen = true;
      }

      this.isDrawerOpen = +width < 30 ? false : true;
      return null;
    });
  }

  // ngOnInit(): void {
  //   this.seedsHeadlines = [
  //     { key: 'fruitWeigh', value: 'משקל פירות (ק"ג)' },
  //     { key: 'seedWeigh', value: 'משקל זרעים נטו (ק"ג)' },
  //     { key: 'bagNumber', value: 'מספר שקים' },
  //   ];

  //   this.calcHeadlines = [
  //     { key: 'collectionDate', value: 'משקל זרעים מדגמי (גרם)' },
  //     { key: 'seedCount', value: 'מספר זרעים במשקל מדגמי' },
  //     { key: 'seedsCountInPortion', value: 'מספר זרעים ב- 100 גרם' },
  //   ];
  //   this.seedsDetails = AMOUNT_SEEDS_MOCK;
  //   this.calcDetails = AMOUNT_CALC_MOCK;
  // }
}
