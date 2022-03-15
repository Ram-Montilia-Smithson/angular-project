export class CollectSeedsOrderInventoryModel{
    constructor(
        public id?:string|number,
        public seedWeigh?:string|number,
        public remainningWeigh?:string|number,
        public shelf?:string|number
    ){

    }
}