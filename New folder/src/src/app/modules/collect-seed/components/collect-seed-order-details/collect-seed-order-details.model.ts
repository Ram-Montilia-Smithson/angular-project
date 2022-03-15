export class CollectSeedOrderDetailsModel{
    constructor(
        public id?:string | number, 
        public hebNic?:string,
        public site?:string,
        public collectorName?:string,
        public lastPic?:string,
        public diaryEditorName?:string,
        public diaryDate?:string,
        public positionSourceType?:string,
        public comments?:string,
    ){}
}