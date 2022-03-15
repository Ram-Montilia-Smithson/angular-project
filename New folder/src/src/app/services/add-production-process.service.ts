import { Injectable } from '@angular/core';
import { findProductionProcess } from '../Models/findProductionProcess';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductionProcessService {
  addTochnitYezur:any= {};
  TochnitYitzurMerchavit:any;
  TochnitYitzurMireDvorim: any;
  TochnitYitzurMishkit:any;
  TochnitYetzurMerchav:any;
  tochnitYezurToFind:findProductionProcess= new findProductionProcess();
  listForTablesprocessForm:any[]=[];
  status:any[]=[]
  onaotNetia:any[]=[]
  
  constructor(private httpService:HttpService) {}
  getTochnitYezurToFind(){
    return this.tochnitYezurToFind;
  }
    GetAllListForTochniyotYitzur(){
      return this.httpService.get('generic','getAllListForTochniyotYitzur');
    }
    getTochnitYezur(findTochniyotYezur){
      return this.httpService.get('tochniyotYitzurNo1','getTochniyot' ,findTochniyotYezur );
    }
    deleteTochnitYetzur(idOfTochnitYezur){
     return this.httpService.get('tochniyotYitzurNo1','deleteTochnitYitzur' ,idOfTochnitYezur );
   }
   addTochnitYitzurMishkit(addTochnitYitzurMishkitToSave){
     return this.httpService.post('tochniyotYitzurNo1/','addTochnitYitzurMishkit' ,addTochnitYitzurMishkitToSave );
   }
   addTochnitYitzurMireDvorim(addTochnitYitzurMireDvorimToSave)
   {
     return this.httpService.post('tochniyotYitzurNo1/','addTochnitYitzurMireDvorim' ,addTochnitYitzurMireDvorimToSave );
   }
   addTochnitYitzurMerchavit (addTochnitYitzurMerchavitToSave)
   {
     return this.httpService.post('tochniyotYitzurNo1/','addTochnitYitzurMerchavit' ,addTochnitYitzurMerchavitToSave );
   }
  
}
