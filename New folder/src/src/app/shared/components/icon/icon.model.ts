import { Palette } from "src/styles/theme";

export declare type IconType = 'mat' | 'svg'

export class IconModel {

  constructor(
    public key : string,
    public size : number,
    public type? : IconType,
    public color? : Palette,
  ) {}
}
