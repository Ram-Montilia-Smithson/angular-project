import { Injectable } from '@angular/core';
import { AllSearchUnitsForWorkDilution } from '../Models/AllSearchUnitsForWorkDilution';
import { ObjectForWorkUnit } from '../Models/ObjectForWorkUnit';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GridScreenService {

  constructor(private httpService:HttpService) { }
  workUnitToSend:AllSearchUnitsForWorkDilution= new AllSearchUnitsForWorkDilution();
  objectForWorkUnitAfterSearch:ObjectForWorkUnit= new ObjectForWorkUnit();
  getAllSearchUnitsWorkForDilution(workUnitToSearch:AllSearchUnitsForWorkDilution){
    return this.httpService.post('Search/','GetAllSearchUnitsWork',workUnitToSearch);
  }
 GetAllObjectForWorkUnitsAfterSearch(workUnitChoosen:any){
  return this.httpService.post('GridScreen/','GetSpecificObjectForWorkUnit',workUnitChoosen);
 }
}
