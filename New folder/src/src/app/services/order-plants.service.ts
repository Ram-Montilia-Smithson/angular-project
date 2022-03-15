import { Injectable } from '@angular/core';
import { orderPlants } from '../Models/orderPlants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPlantsService {
  objectWithListOfOrderPlants:orderPlants;
  constructor(private httpService:HttpService) { }
  getTochnitYitzurYaarMishki(misparTochnit)
 {
return this.httpService.get('tochnitYitzurYaarMishkiNo21','getTochnitYitzurYaarMishki/'+ misparTochnit);
 }
 saveTochnitYitzurYaarMishki(objectOfOrderPlantsToSave){
return this.httpService.post('tochnitYitzurYaarMishkiNo21/','saveTochnitYitzurYaarMishki',objectOfOrderPlantsToSave)
 }
 deleteMinHatzemach(idOfRow){
  return this.httpService.get('tochnitYitzurYaarMishkiNo21','deleteMinHatzemach/'+ idOfRow)
  }
  saveMinHatzemachYaarMishki(objectMinHatzemachYaarMishkiToSave){
return this.httpService.post('tochnitYitzurYaarMishkiNo21/','saveMinHatzemachYaarMishki',objectMinHatzemachYaarMishkiToSave)

  }
}
