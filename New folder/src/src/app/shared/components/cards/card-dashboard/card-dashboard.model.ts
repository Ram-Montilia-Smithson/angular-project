
export class CardDashboardModel {
  public label?: string;
  public path?: string;
  public svgUrl?: string;
  public size?: number;

  constructor(options: {
    label?: string;
    path?: string;
    svgUrl?: string;
    size?: number;
  }) {
    this.label = options?.label;
    this.path = options?.path;
    this.svgUrl = options?.svgUrl;
    this.size = options?.size;

  }

}
