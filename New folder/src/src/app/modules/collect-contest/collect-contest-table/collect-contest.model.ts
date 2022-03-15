import { status } from "src/app/Models/status";
import { statuscollectContest } from "src/app/Models/statuscollectContest";

export class ContestTableModel{
    constructor(
        public tenderID?: string|number,
        public subTenderYear?: number,
        public subTenderID?: number,
        public subTenderName?: string,
        public stDistrictName?: string,
        public stRegionName?: string,
        // public contractNumber?: number|string,
        public status?: string,
    ){}
}