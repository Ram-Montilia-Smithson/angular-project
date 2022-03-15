import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchScreenService {

  constructor(private httpService:HttpService) { }
  getMerchavimList(){
   return this.httpService.get('Search','GetMerchavimList');
  }
  getYaarotList(){
  return this.httpService.get('Search','GetYaarotList');
  }
  getEzorimList(){
    return this.httpService.get('Search','GetEzorimList');
  }
  GetAllListForSearchScreen(){
    return this.httpService.get('Search','getAllListForSearchScreen');
  }
}
