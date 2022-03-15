
export class StatusModel {

  public statusName  : string
  public status  : number

  constructor(
    options: {
      statusName?: string,
      status?: number,
    }
  ) {
    this.statusName = options?.statusName;
    this.status = options?.status;
  }

  static create(status: StatusModel) {
    return new StatusModel({
      statusName: status.statusName,
      status: status.status,
    })
  }

}
