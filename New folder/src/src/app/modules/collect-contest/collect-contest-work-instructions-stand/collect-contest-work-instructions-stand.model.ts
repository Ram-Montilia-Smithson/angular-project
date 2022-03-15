export class CollectContestWorkInstructionsStandModel {
  public id?: string | number;
  public portion?: string;
  public forest?: string;
  public section?: string;
  public area?: string;
  public areaSize?: string;
  public speciesAssemble?: string;
  public plantingYear?: string;
  public areaActions?: string;
  public density?: string;
  public treeEstimation?: string;
  public speacialAreaComments?: string;

  constructor(options: {
    id?:string| number;
    portion?: string;
    forest?: string;
    section?: string;
    area?: string;
    areaSize?: string;
    speciesAssemble?: string;
    plantingYear?: string;
    areaActions?: string;
    density?: string;
    treeEstimation?: string;
    speacialAreaComments?: string;
  }) {
    this.id= options.id ||'';
    this.portion= options.portion ||'';
    this.forest= options.forest ||'';
    this.section= options.section ||''; 
    this.area= options.area ||'';
    this.areaSize= options.areaSize ||'';
    this.speciesAssemble= options.speciesAssemble ||'';
    this.plantingYear= options.plantingYear ||'';
    this.areaActions= options.areaActions ||'';
    this.density= options.density ||'';
    this.treeEstimation= options.treeEstimation ||'';
    this.speacialAreaComments= options.speacialAreaComments ||'';
  }
}
