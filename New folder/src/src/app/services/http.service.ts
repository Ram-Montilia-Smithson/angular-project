import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }
  private baseURL = 'https://kkl-forest-api.azurewebsites.net/api/'; 
  httpOptions: { headers: HttpHeaders; };
  get(formControlName: string,route:string,parameter: any = null): Observable<any> {
    
    if (parameter != null) {
    return this.httpClient.get(this.baseURL +formControlName+'/'+ route+'/'+parameter);
    }
    else{
      return this.httpClient.get(this.baseURL +formControlName+'/'+ route);
    }
  }
  post(formControlName: string,route: string, parameter: Object = null): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // 'Access-Control-Allow-Origin': '*'
      })
    };
    if (parameter instanceof (Object)) {
      
      return this.httpClient.post(this.baseURL +formControlName+ route, parameter );
    }
    else {
      return this.httpClient.post(this.baseURL + formControlName + route, parameter, this.httpOptions);
    }
  }
  delete(formControlName: string,route: string, parameter: Object = null): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // 'Access-Control-Allow-Origin': '*'
      })
    };
    if (parameter instanceof (Object)) {
      
      return this.httpClient.delete(this.baseURL +formControlName+ route, parameter);
    }
    else {
      return this.httpClient.delete(this.baseURL + formControlName + route, parameter);
    }
  }
}
