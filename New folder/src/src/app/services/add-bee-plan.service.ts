import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AddBeePlanService {
  constructor(private httpService:HttpService) {}
objectWithTheListOfAddBee:any={};
listOfAddBeePlan:any[]=[];
degelofAddBeeComplete:boolean=false;
degelOfOrderPlanComplete:boolean=false
degelOfOrderPlanCompleteByMashtelot:boolean=false;
  getTochnitYitzurMireDvorim(misparTochnit)
{
return this.httpService.get('tochnitYitzurYaarMishkiNo21','getTochnitYitzurMireDvorim/'+ misparTochnit);
}
saveTochnitYitzurMireDvorim(listTosave){
  return this.httpService.post('tochnitYitzurYaarMishkiNo21/','saveTochnitYitzurMireDvorim',listTosave);
}
deleteMinHatzemach(idOfRow){
return this.httpService.get('tochnitYitzurYaarMishkiNo21','deleteMinHatzemach/'+ idOfRow);
}
saveMinHatzemachMireDvorim(idOfRow,Kamut){
return this.httpService.get('tochnitYitzurYaarMishkiNo21','saveMinHatzemachMireDvorim/' + idOfRow + '/'+ Kamut);
}
saveMinHatzemachMashtelaYaarMishki(objectToUpdate){
  return this.httpService.post('tochnitYitzurYaarMishkiNo21/','saveMinHatzemachMashtelaYaarMishki' ,objectToUpdate );
  }
}
