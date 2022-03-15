import { ContestTableModel } from '../modules/collect-contest/collect-contest-table/collect-contest.model';
import { CollectContestWorkInstructionsStandModel } from '../modules/collect-contest/collect-contest-work-instructions-stand/collect-contest-work-instructions-stand.model';
import { AreaActionsModel } from '../modules/collect-contest/collect-contest-work-instructions-stand/components/area-actions-table/area-actions-table.model';
import { PageHeaderModel } from '../shared/components/page-header/page-header,model';

export const COLLECT_CONTEST_HEADER: PageHeaderModel[] = [
  {
    text: '2001 - מרחב דרום, נגד דרומי',
    size: '2.6',
    color: 'text',
  },
  {
    text: '1200 דונם',
    size: '1.8',
    color: 'text',
  },
  {
    text: '2021',
    size: '1.8',
    color: 'text',
  },
  {
    text: 'מאושר',
    size: '1.2',
    color: 'accent',
  },
];

export const CONTEST_TABLE_DATA: ContestTableModel[] = [
  {
    tenderID: 1,
    // contractNumber: '1235/28',
    subTenderYear: 2021,
    subTenderID: 20001,
    subTenderName: 'טיפול יער - יער כיסופים',
    stDistrictName: 'דרום',
    stRegionName: 'נגב דרומי',
    status: 'התחלת עבודה קבלן',
  },
  {
    tenderID: 2,
    // contractNumber: '1235/29',
    subTenderYear: 2021,
    subTenderID: 20002,
    subTenderName: 'טיפול יער - יער כיסופים',
    stDistrictName: 'שמעון',
    stRegionName: 'נגב מערבי',
   status: 'התחלת עבודה קבלן',
  },
  {
    tenderID: 3,
    // contractNumber: '1235/30',
    subTenderYear: 2021,
    subTenderID: 20003,
    subTenderName: 'טיפול יער - יער כיסופים',
    stDistrictName: 'ארתור',
    stRegionName: 'שמעון',
    status:'נבחר קבלן',
  },
  {
    tenderID: 4,
    // contractNumber: '1235/31',
    subTenderYear: 2021,
    subTenderID: 20004,
    subTenderName: 'טיפול יער - יער כיסופים',
    stDistrictName: 'יוסי',
    stRegionName: 'נגב מערבי',
   status: 'אושר ע"י מחלקת יעור',
  },
];

export const COLLECT_CONTAST_INSTRUCTIONS_TABLE: CollectContestWorkInstructionsStandModel[] =
  [
    {
      id: 1,
      portion: '1',
      forest: 'כיסופים',
      section: '7',
      area: '104',
      areaSize: '5/10',
      speciesAssemble: 'אלון מצוי',
      plantingYear: '1991',
      areaActions: 'דילול, סניטציה',
      density: '60',
      treeEstimation: '60 מ"ק',
      speacialAreaComments: 'לורפ איפסום דולורס הום שדגכח כדש',
    },
    {
      id: 122,
      portion: '1',
      forest: 'כיסופים',
      section: '7',
      area: '104',
      areaSize: '5/10',
      speciesAssemble: 'אלון מצוי',
      plantingYear: '1991',
      areaActions: 'דילול, סניטציה',
      density: '60',
      treeEstimation: '60 מ"ק',
      speacialAreaComments: 'לורפ איפסום דולורס הום שדגכח כדש',
    },
    {
      id: 132,
      portion: '1',
      forest: 'כיסופים',
      section: '7',
      area: '104',
      areaSize: '5/10',
      speciesAssemble: 'אלון מצוי',
      plantingYear: '1991',
      areaActions: 'דילול, סניטציה',
      density: '60',
      treeEstimation: '60 מ"ק',
      speacialAreaComments: 'לורפ איפסום דולורס הום שדגכח כדש',
    },
  ];

export const AREA_ACTIONS_TABLE_MOCK: AreaActionsModel[] = [
  {
    id: '1',
    actionType: 'סוג הפעולה',
    estimatedArea: 'שטח מוערך',
    plantType: 'מין הצומח',
    modelDilution: 'דגם דילול',
    requierdDensity: 'צפיפות ממוצעת רצויה',
  },
  {
    id: '13',
    actionType: 'סוג הפעולה',
    estimatedArea: 'שטח מוערך',
    plantType: 'מין הצומח',
    modelDilution: 'דגם דילול',
    requierdDensity: 'צפיפות ממוצעת רצויה',
  },
  {
    id: '12',
    actionType: 'סוג הפעולה',
    estimatedArea: 'שטח מוערך',
    plantType: 'מין הצומח',
    modelDilution: 'דגם דילול',
    requierdDensity: 'צפיפות ממוצעת רצויה',
  },
  {
    id: '11',
    actionType: 'סוג הפעולה',
    estimatedArea: 'שטח מוערך',
    plantType: 'מין הצומח',
    modelDilution: 'דגם דילול',
    requierdDensity: 'צפיפות ממוצעת רצויה',
  },
];
