import { ListItemModel } from "../list-item/list-item.model";

 type VALUE = string | Date | number | Object

export class DataCellModel  {

  constructor(
    public key?: string,
    public label?: string,
    public value?: VALUE,
    public type?: string,
    public rows?: number | string,
    public cols?: number,
    public custom?: boolean,

    public rowsSpan?: number,
    public colSpan?: number
  ) {
    this.type = this.type || 'text';
  }

  static create(options: DataCellModel) {
    return new DataCellModel(
      options.key,
      options.label,
      options.value,
      options.type,
      options.rows,
      options.cols,
    );
  }
}
