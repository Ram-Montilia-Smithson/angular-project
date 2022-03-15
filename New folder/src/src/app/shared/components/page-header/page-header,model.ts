export class PageHeaderModel {
    public text: string;
    public size?: string;
    public color?: string;
    public bold?:number;
    constructor(options: { text?: string; size: string; color?: string,bold?:number }) {
      this.text = options.text || '';
      this.size = options.size || '';
      this.color = options.color || '';
      this.bold = options.bold || 400;
    }
  }
  