import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { CollectSeedOrderDetailsModel } from '../modules/collect-seed/components/collect-seed-order-details/collect-seed-order-details.model';
import { CollectSeedsOrderAmountCalcModel } from '../modules/collect-seed/components/collect-seeds-order-amount/collect-seeds-order-amount-calc';
import { CollectSeedsOrderAmountSeedsModel } from '../modules/collect-seed/components/collect-seeds-order-amount/collect-seeds-order-amount-seeds';
import { CollectSeedsOrderInventoryTableModel } from '../modules/collect-seed/components/collect-seeds-order-inventory/collect-seeds-order-inventory-table.model';
import { CollectSeedsOrderInventoryModel } from '../modules/collect-seed/components/collect-seeds-order-inventory/collect-seeds-order-inventory.model';
import { CollectSeedsOrderLocationModel } from '../modules/collect-seed/components/collect-seeds-order-location/collect-seeds-order-location.model';
import { CollectSeedsModel } from '../modules/collect-seed/components/collect-seeds-table/collect-seeds.model';
// import { CollectSeedsModel } from '../modules/collect-seed/components/collect-seeds-table/collect-seeds.model';
import { PageHeaderModel } from '../shared/components/page-header/page-header,model';

export const DETAILS_MOCK: CollectSeedOrderDetailsModel = {
  // id: '000000',
  // plantType: 'אורן אקליפטוס',
  // seedOrigin: 'יער ביריה',
  // collecterName: 'אלון תבור',
  // collectionDate: '13.07.2021',
  // registringName: 'אלון יבניאל',
  // enteringDate: '13.07.2021',
  // collectionRegistration: 'שטח',
  // collectionNote: 'ברוש מצוי',
};

export const COLLECT_SEEDS_HEADER: PageHeaderModel[] = [
  {
    text: 'אורן אקליפטוס',
    size: '2.6',
    color: 'text',
    bold: 700,
  },
  {
    text: 'יער ביריה',
    size: '2.3',
    color: 'text',
  },
  {
    text: '25.10.21',
    size: '2.3',
    color: 'text',
  },
  {
    text: 'ממתין לשקילה',
    size: '1.6',
    bold: 300,
    color: 'text',
  },
];

export const COMMENT: string = 'קוד איסוף  0000000000';

export const AMOUNT_SEEDS_MOCK: CollectSeedsOrderAmountSeedsModel = {
  id: 1,
  fruitWeigh: '5.800',
  seedWeigh: '2.790',
  bagNumber: '2',
};

export const AMOUNT_CALC_MOCK: CollectSeedsOrderAmountCalcModel = {
  id: 1,
  seedWeigh: 10,
  seedCount: 125,
  seedsCountInPortion: '1,250',
};

export const AMOUNT_INVENTORY_MOCK: CollectSeedsOrderInventoryModel = {
  id: 1,
  seedWeigh: 10,
  remainningWeigh: 125,
  shelf: 'Rd3f',
};

export const LOCTAION_MOCK: CollectSeedsOrderLocationModel = {
  id: 1,
  siteSize: '100',
  treeNumber: '122',
  treeDirections: 'ליד עץ האבוקדוז',
};

export const GALLERY_CONFIG: NgxGalleryOptions[] = [];
//   {
//     width: '40%',
//     height: 'calc(80% - 8rem )',
//     thumbnailsColumns: 4,
//     imageAnimation: NgxGalleryAnimation.Slide,
//   },
//   // max-width 800
//   {
//     breakpoint: 1920,
//     width: '100%',
//     height: '100%',
//     imagePercent: 100,
//     thumbnailsPercent: 30,
//     thumbnailsMargin: 20,
//     thumbnailMargin: 20,
//   },
//   {
//     breakpoint: 1024,
//     width: '10%',
//     height: 'calc(90% )',
//     imagePercent: 100,
//     thumbnailsPercent: 30,
//     thumbnailsMargin: 10,
//     thumbnailMargin: 10,
//   },
//   // max-width 400
//   {
//     breakpoint: 400,
//     preview: false,
//   },
// ];

export const GALLERY_CONFIG_DRAWER_OPEN: NgxGalleryOptions[] = [
  {
    width: '40%',
    height: 'calc(100% - 8rem )',
    thumbnailsColumns: 4,
    imageAnimation: NgxGalleryAnimation.Slide,
  },
  // max-width 800
  {
    breakpoint: 1920,
    width: '40%',
    height: '90%',
    imagePercent: 100,
    thumbnailsPercent: 30,
    thumbnailsMargin: 10,
    thumbnailMargin: 10,
  },
  {
    breakpoint: 1024,
    width: '30%',
    height: 'calc(60% )',
    imagePercent: 100,
    thumbnailsPercent: 30,
    thumbnailsMargin: 10,
    thumbnailMargin: 10,
  },
  // max-width 400
  {
    breakpoint: 400,
    preview: false,
  },
];

export const GALLERY_PICTURES: NgxGalleryImage[] = [
  {
    small: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    medium: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    big: 'https://preview.ibb.co/jrsA6R/img12.jpg',
  },
  {
    small: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    medium: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    big: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
  },
  {
    small: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    medium: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    big: 'https://preview.ibb.co/mwsA6R/img7.jpg',
  },
  {
    small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    big: 'https://preview.ibb.co/kZGsLm/img8.jpg',
  },
];

const date = new Date();
export const COLLECT_SEEDS_TABLE_DATA: CollectSeedsModel[] = [
  {
    id: 1,
    objectid: 1,
    hebNic: 'string',
    site: 'string',
    collectorName: 'string',
    lastPic: new Date(),
    diaryDate: new Date(),
    seedsKg: 'String',
    status: {
      statusName: 'string',
      status: 1,
    },
    siteID: 'string',
    siteSize: 'string',
    treeID: 'string',
    treeIDText: 'string',
    comments: 'any',
    creationDate: new Date(),
    creator: 'string',
    editDate: new Date(),
    editor: 'string',
    familyHeb: 'string',
    filesAttachments: [],
    globalID_2: 'string',
    kmhr: 'any',
    lat: 'any',
    latinNam: 'string',
    long: 'any',
    picSeason: 'any',
    waze: 'string',
    year: 5,
  }, {
    id: 11,
    objectid: 1,
    hebNic: 'string',
    site: 'string',
    collectorName: 'string',
    lastPic: new Date(),
    diaryDate: new Date(),
    seedsKg: 'String',
    status: {
      statusName: 'string',
      status: 1,
    },
    siteID: 'string',
    siteSize: 'string',
    treeID: 'string',
    treeIDText: 'string',
    comments: 'any',
    creationDate: new Date(),
    creator: 'string',
    editDate: new Date(),
    editor: 'string',
    familyHeb: 'string',
    filesAttachments: [],
    globalID_2: 'string',
    kmhr: 'any',
    lat: 'any',
    latinNam: 'string',
    long: 'any',
    picSeason: 'any',
    waze: 'string',
    year: 5,
  },
];

//{
//     id: 1,
//     objectid: 123528,
//     plantSpecies: 'ברוקווי',
//     seedSperm: 'בית ליד',
//     collectedBy: 'פבלו',
//     collectionDate: date,
//     entryDate: date,
//     status: {
//         label: 'ממתין לשקילה',
//         value: 1,
//     }
// },
// {
//     id: 2,
//     colectionCode: 123529,
//     plantSpecies: 'אורן ירושלים',
//     seedSperm: 'בית ליד',
//     collectedBy: 'יגאל',
//     collectionDate: date,
//     entryDate: date,
//     status: {
//         label: 'ממתין לשקילה',
//         value: 1,
//     }
// },
// {
//     id: 3,
//     colectionCode: 123530,
//     plantSpecies: 'שיטת הנגב',
//     seedSperm: 'גליקסון',
//     collectedBy: 'שמעון',
//     collectionDate: date,
//     entryDate: date,
//     status: {
//         label: 'ממתין לאישור',
//         value: 2,
//     }
// },
// {
//     id: 4,
//     colectionCode: 123531,
//     plantSpecies: 'אגס סורי',
//     seedSperm: 'גילת',
//     collectedBy: 'יוסי',
//     collectionDate: date,
//     entryDate: date,
//     status: {
//         label: 'אושר',
//         value: 3,
//     }
// },
// ]
