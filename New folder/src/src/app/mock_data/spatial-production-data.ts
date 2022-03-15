import { NewSpatialTableModel } from '../screens/spatial-production-program/new-spatial-table/new-spatial-table.model';
import { SpatialTable } from '../screens/spatial-production-program/spatial-table/spatial-table.component';

export const displayedColumnsArrays: any = [
  'plantType',
  'amount',
  'area',
  'receptacle',
  'multiplicityMaterial',
  'seedOrigin',
  'comment',
  'controllers',
];
export const Receptacles: string[] = ['Q12', 'Q9', 'Q5'];
export const PlantTypes: any = [
  {
    name: 'אורן ברוטיה',
    family: 'מחטניים',
    id: 1103,
    icon: 'assets/images/spatial-christmas-tree.svg',
  },
  {
    name: 'אורן הצנובר',
    family: 'מחטניים',
    id: 105,
    icon: 'assets/images/spatial-christmas-tree.svg',
  },
  {
    name: 'אורן ירושלים',
    family: 'מחטניים',
    id: 560,
    icon: 'assets/images/spatial-christmas-tree.svg',
  },
];
export const Areas = ['נגב צפוני', 'נגב מערבי', 'הר מערבי'];
export const FILTERS = [
  {
    name: 'מחטניים',
    count: 0,
    filterValue: 'coniferous',
    urlSrc: 'assets/images/spatial-christmas-tree.svg',
  },
  {
    name: 'חורש טבעי',
    count: 0,
    filterValue: 'grove',
    urlSrc: 'assets/images/spatial-tree.svg',
  },
  {
    name: 'אקליפטוס',
    count: 0,
    filterValue: 'eucalyptus',
    urlSrc: 'assets/images/spatial-eucalyptus.svg',
  },
  {
    name: 'שיטים',
    filterValue: 'acacia',
    count: 0,
    urlSrc: 'assets/images/spatial-tree-black-silhouette-shape.svg',
  },
  {
    name: 'עצי ושיחי נוי',
    count: 0,
    filterValue: 'ornamentalTree',
    urlSrc: 'assets/images/spatial-shape.svg',
  },
  {
    name: 'סה"כ',
    count: 0,
    filterValue: 'all',
    urlSrc: 'assets/images/spatial-trees.svg',
  },
];

export const NEW_SPATITAL_TABLE_DATA: NewSpatialTableModel[] = [
  {
    id: 1,
    minHatzemach: 'asdasd',
    kamut: 'asdasd',
    ezor: 'asdasd',
    kibul: 'asdasd',
    ribuy: 'asdasd',
    makor: 'asdasd',
    hearot: 'asdasd',
    teurMishpacha: 'asd',
    kodMinHatzemach: 1,
  },

  {
    id: 12,
    minHatzemach: 'asdasd',
    kamut: 'asdasd',
    ezor: 'asdasd',
    kibul: 'asdasd',
    ribuy: 'asdasd',
    makor: 'asdasd',
    hearot: 'asdasd',
    teurMishpacha: 'asd',
    kodMinHatzemach: 1,
  },
  {
    id: 13,
    minHatzemach: 'asdasd',
    kamut: 'asdasd',
    ezor: 'asdasd',
    kibul: 'asdasd',
    ribuy: 'asdasd',
    makor: 'asdasd',
    hearot: 'asdasd',
    teurMishpacha: 'asd',
    kodMinHatzemach: 1,
  },
];

export const ELEMENT_DATA: SpatialTable[] = [
  //     {
  //         id:1,
  //         plantType: 'ברוקווי',
  //         amount: 1000,
  //         area: 'נגב צפוני',
  //         receptacle: 'Q12',
  //         multiplicityMaterial: 'זרעים',
  //         seedOrigin: 'קיבוץ ניר עוז',
  //         comment: 'לורום איפסום דולור סיט אמט איפיסינג',
  //         filterValue: 'coniferous',
  //         controllers: true,
  //     },
  // ];
  // export const NEW_SPATITAL_TABLE_DATA: [] = [
  //   {
  //       id:1,
  //       plantType: 'ברוקווי',
  //       amount: '1000',
  //       area: 'נגב צפוני',
  //       receptacle: 'Q12',
  //       multiplicityMaterial: 'זרעים',
  //       seedOrigin: 'קיבוץ ניר עוז',
  //       comment: 'לורום איפסום דולור סיט אמט איפיסינג',
  //   },
  //   {
  //     id:2,
  //     plantType: 'ברוקווי',
  //     amount: '1000',
  //     area: 'נגב צפוני',
  //     receptacle: 'Q12',
  //     multiplicityMaterial: 'זרעים',
  //     seedOrigin: 'קיבוץ ניר עוז',
  //     comment: 'לורום איפסום דולור סיט אמט איפיסינג',
  // },  {
  //   id:3,
  //   plantType: 'ברוקווי',
  //   amount: '1000',
  //   area: 'נגב צפוני',
  //   receptacle: 'Q12',
  //   multiplicityMaterial: 'זרעים',
  //   seedOrigin: 'קיבוץ ניר עוז',
  //   comment: 'לורום איפסום דולור סיט אמט איפיסינג',
  // },  {
  //   id:4,
  //   plantType: 'ברוקווי',
  //   amount: '1000',
  //   area: 'נגב צפוני',
  //   receptacle: 'Q12',
  //   multiplicityMaterial: 'זרעים',
  //   seedOrigin: 'קיבוץ ניר עוז',
  //   comment: 'לורום איפסום דולור סיט אמט איפיסינג',
  // },  {
  //   id:5,
  //   plantType: 'ברוקווי',
  //   amount: '1000',
  //   area: 'נגב צפוני',
  //   receptacle: 'Q12',
  //   multiplicityMaterial: 'זרעים',
  //   seedOrigin: 'קיבוץ ניר עוז',
  //   comment: 'לורום איפסום דולור סיט אמט איפיסינג',
  // },  {
  //   id:6,
  //   plantType: 'ברוקווי',
  //   amount: '1000',
  //   area: 'נגב צפוני',
  //   receptacle: 'Q12',
  //   multiplicityMaterial: 'זרעים',
  //   seedOrigin: 'קיבוץ ניר עוז',
  //   comment: 'לורום איפסום דולור סיט אמט איפיסינג',
  // },
];
