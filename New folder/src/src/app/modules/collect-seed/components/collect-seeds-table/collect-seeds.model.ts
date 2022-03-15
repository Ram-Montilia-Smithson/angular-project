export interface status {
    statusName: string,
    status: number
}

export class CollectSeedsModel {
    constructor(
        public id?: string | number,
        public objectid?: number,
        public hebNic?: string,
        public site?: string,
        public collectorName?: string,
        public lastPic?: Date,
        public diaryDate?: Date,
        public seedsKg?: String,
        public status?: status,
        public siteID?: string,
        public siteSize?: string,
        public treeID?: string,
        public treeIDText?: string,
        public comments?:any,
        public creationDate?:Date,
        public creator?:string,
        public editDate?:Date, 
        public editor?:string,
        public familyHeb?:string,
        public filesAttachments?:any[],
        public globalID_2?:string,
        public kmhr?:any,
        public lat?:any,
        public latinNam?:string,
        public long?:any,
        public picSeason?:any,
        public waze?:string,
        public year?:number,


    ) { }
}


export class ContestTableModel {
    constructor(
        public id?: string | number,
        public contractNumber?: number | string,
        public contestYear?: number,
        public contestNumber?: number,
        public contestName?: string,
        public area?: string,
        public location?: string,
        public status?: string,
    ) { }
}