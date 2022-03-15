import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPlantsCompleteService {
listofTableOrderPlantsComplete:any[]=[];
listofTableOrderPlantsCompleteByMashtelot:any[]=[];
expandableTableDataArray:any[]=[]
treeTypes:any[]=[];
idOfMishpacha:number
secondTreeTypes:any[]=[];
plants:any[]=[]
  constructor(private httpService: HttpService) { }

  getTochnitYitzurYaarMishki(misparTochnit,id) {
    return this.httpService.get('tochnitYitzurYaarMishkiNo21', 'getTochnitYitzurYaarMishki/'+ misparTochnit + '/' + id);
  }
  getTzmachimLeMishpacha(misparTochnit, kodMishpacha) {
    return this.httpService.get('tochnitYitzurYaarMishkiNo21', 'getTzmachimLeMishpacha', misparTochnit + '/' + kodMishpacha);
  }
  getTzmachimByMashtelot(misparTochnit, id) {
    return this.httpService.get('tochnitYitzurYaarMishkiNo21', 'getTzmachimByMashtelot', misparTochnit + '/' + id);
  }
  getTochnitYitzurMishkiMashtelotFiltered(misparTochnit, id) {
    return this.httpService.get('tochnitYitzurYaarMishkiNo21', 'getTochnitYitzurMishkiMashtelotFiltered', misparTochnit + '/' + id);
  }
  editTochnitYaarMishki(misparTochnit, onatNetia, status) {
    return this.httpService.get('tochnitYitzurYaarMishkiNo21', 'editTochnitYaarMishki', misparTochnit + '/' + onatNetia + '/' + status);
  }
  getTochnitYitzurMishkiMashtelot(misparTochnit,kodMishpacha){
    return this.httpService.get('tochnitYitzurYaarMishkiNo21', 'getTochnitYitzurMishkiMashtelot', misparTochnit + '/' + kodMishpacha);
  }
  saveMinHatzemachMashtelaYaarMishki(objectToUpdateInDB){
return this.httpService.post('tochnitYitzurYaarMishkiNo21/','saveMinHatzemachMashtelaYaarMishki',objectToUpdateInDB)
  }
}

