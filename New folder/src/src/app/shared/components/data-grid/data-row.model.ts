import { DataCellModel } from "./data-cell.model";

export class DataRowModel {

  constructor(
    public key: string,
    public columns: DataCellModel[],
    public label?: string,
    public rows?: number | string,
    public divider?: boolean
  ) {
    this.divider = this.divider || false;
  }

  static create(options: DataRowModel) {
    return new DataRowModel(
      options.key,
      options.columns,
      options.label,
      options.rows,
      options.divider,
      );
  }
}
