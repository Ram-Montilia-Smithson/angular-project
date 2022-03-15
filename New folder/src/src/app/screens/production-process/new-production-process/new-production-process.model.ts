export class NewProductionProcessTableModel{
    constructor(
        public id?:number|string,
        public sugTochnit?:string,
        public onatNetia?:{text:string,isShmita:boolean},
        public mashtela?:string,
        public status?:string,
        public modifiedDate?:string,
    ){}
}