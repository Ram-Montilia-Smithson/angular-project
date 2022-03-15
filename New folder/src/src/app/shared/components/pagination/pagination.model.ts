import { PaginationInstance } from "ngx-pagination";

export class PaginaitonModel {
  constructor(
    public paginate: boolean,
    public paginator: PaginationInstance,
  ) {

  }
}
