export class ProductionProcessHeaderModel {
  public text: string;
  public size?: string;
  public color?: string;
  constructor(options: { text?: string; size: string; color?: string }) {
    this.text = options.text || '';
    this.size = options.size || '';
    this.color = options.color || '';
  }
}
