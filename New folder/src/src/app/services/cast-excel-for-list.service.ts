import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CastExcelForListService {
  data: unknown[];

  constructor() { }
  castExcelForList(files:any){
    //const target1: DataTransfer = <DataTransfer>(e.target);
    if(files){   
      const reader: FileReader = new FileReader();
    reader.readAsBinaryString(files.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws)); 
      // to get 2d array pass 2nd parameter as object {header: 1}
      // Data will be logged in array format containing objects
      alert(this.data);
    }
  }
  }
}
