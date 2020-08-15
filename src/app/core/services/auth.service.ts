import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(obj:any) : Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '';
    return this.http.post(url, obj);
  }
}
