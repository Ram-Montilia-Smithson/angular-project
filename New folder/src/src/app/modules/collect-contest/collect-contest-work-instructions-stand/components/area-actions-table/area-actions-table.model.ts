export class AreaActionsModel {
  public id?: number | string;
  public actionType?: string;
  public estimatedArea?: string;
  public plantType?: string;
  public modelDilution?: string;
  public requierdDensity?: string;
  constructor(oprtions?: {
    id?: string | number;
    actionType?: string;
    estimatedArea?: string;
    plantType?: string;
    modelDilution?: string;
    requierdDensity?: string;
  }) {
    this.id= this.id || '';
    this.actionType= this.actionType || '';
    this.estimatedArea= this.estimatedArea || '';
    this.plantType= this.plantType || '';
    this.modelDilution= this.modelDilution || '';
    this.requierdDensity= this.requierdDensity || '';
  }
}
