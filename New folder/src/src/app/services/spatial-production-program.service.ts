import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SpatialProductionProgramService {
listForTableForSpatialProductionProgram:any[]=[];
  constructor(private httpService:HttpService ) { }
 getSpatialProductionProgram(misparTochnit:number){
  return this.httpService.get('tochnitYitzurYaarMishkiNo21','getTochnitYitzurMerchavit/'+ misparTochnit);
 } 
 getTzmachimLeMishpachaMerchavit(misparTochnit:number, kodmishpacha: number){
  return this.httpService.get('tochnitYitzurYaarMishkiNo21','getTzmachimLeMishpachaMerchavit/'+ misparTochnit + '/' +kodmishpacha);
 } 
 editTochnit( objectToSave:any){
   return this.httpService.post('tochnitYitzurYaarMishkiNo21/','editTochnit/' ,objectToSave);
 }
 deleteMinHatzemachMerchavi(id:number){
  return this.httpService.get('tochnitYitzurYaarMishkiNo21','deleteMinHatzemachMerchavi/' +id);

 }
 saveTochnitYitzurMerchavit(minHatzemachMerchaviForSave : any){
  return this.httpService.post('tochnitYitzurYaarMishkiNo21','/saveTochnitYitzurMerchavit',minHatzemachMerchaviForSave );

 }
}


