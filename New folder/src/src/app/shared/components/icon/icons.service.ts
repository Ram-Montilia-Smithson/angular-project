import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import {
  ADD_ICON,
  LIST_ICON,
  CALENDAR_ICON,
  LOGO_ICON,
  TREE_ICON,
  BOTTOM_TREE_LOGO_LANDS_ICON,
  ESTATE_ICON,
  MAIL_ICON,
  LAWYER_ICON,
  TREE_GRADIENT_LANDS_ICON,
  TRANSACTION_ICON,
  PLANING_ICON,
  EVALUATION_ICON,
  SUPERVISION_ICON,
  MEASUREMENTS_ICON,
  LOCATION_ICON,
  BUILDING_ICON,
  HOME_ICON,
  SAVE_ICON,
  PRINT_ICON,
  SELECT_ICON,
  RELOAD_ICON,
  PORTFOLIO_ICON,
  EYE_ICON,
  FILE_ICON,
  DELETE_ICON,
  DROP_DOWN,
  ADD_PERSON_ICON,
  FILE_DOWNLOAD_ICON,

  //forestry
  TREE_TOP_GRADIENT_MPK_ICON,
  USER_ICON,
  SEEEDS_ICON,
  NOTES_ICON,
  EDIT_MPK_ICON,
  LOCATION_MPK_ICON,
  PAGE_CORENR_ICON,
  BOTTOM_TREE_LOGO_TAC_ICON,
  DRAWER_OPEN_ICON,
  READY_STOCK_ICON
} from './icons.list';

export interface IconItem {
  key: string;
  svgUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  public icons = {
    select: SELECT_ICON,
    print: PRINT_ICON,
    save: SAVE_ICON,
    home: HOME_ICON,
    building: BUILDING_ICON,
    portfolio: PORTFOLIO_ICON,
    measurements: MEASUREMENTS_ICON,
    list: LIST_ICON,
    add: ADD_ICON,
    supervision: SUPERVISION_ICON,
    evaluation: EVALUATION_ICON,
    planing: PLANING_ICON,
    transactions: TRANSACTION_ICON,
    tree: TREE_ICON,
    tree_gradient_lands: TREE_GRADIENT_LANDS_ICON,
    tree_bottom_lands: BOTTOM_TREE_LOGO_LANDS_ICON,
    estate: ESTATE_ICON,
    lawyer: LAWYER_ICON,
    reload: RELOAD_ICON,
    mail: MAIL_ICON,
    logo: LOGO_ICON,
    location: LOCATION_ICON,
    calendar: CALENDAR_ICON,
    //forestry
    userSign: USER_ICON,
    tree_top_gradient_mpk: TREE_TOP_GRADIENT_MPK_ICON,
    seeds: SEEEDS_ICON,
    notes: NOTES_ICON,
    edit_mpk: EDIT_MPK_ICON,
    location_mpk: LOCATION_MPK_ICON,
    page_corner: PAGE_CORENR_ICON,
    eye: EYE_ICON,
    delete: DELETE_ICON,
    file: FILE_ICON,
    bottom_tree_tac: BOTTOM_TREE_LOGO_TAC_ICON,
    dropdown: DROP_DOWN,
    addperson:ADD_PERSON_ICON,
    filedownload:FILE_DOWNLOAD_ICON,
    drawer_toggle_icon:DRAWER_OPEN_ICON,
    ready_stcok_icon:READY_STOCK_ICON
  };

  private findIcon(key: string): string {
    const icon = this.icons[key.toLocaleLowerCase()];
    return icon ? icon : null;
  }

  private registerIcon(key: string, icon: string) {
    this.iconRegistry.addSvgIconLiteral(
      key,
      this.sanitizer.bypassSecurityTrustHtml(icon)
    );
  }

  public setIcon(key: string): boolean {
    const icon = this.findIcon(key);

    if (icon) {
      this.registerIcon(key, icon);
      return true;
    }

    return false;
  }

  public setIconsList(items: any[]) {
    items.map((item) => {
      this.setIcon(item.svgUrl);
    });
  }
}
