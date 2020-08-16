import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor( private httpClient: HttpClient) { }

  getAlaramDetails(): Observable<any> {
    return this.httpClient.get(environment.api_aepistle_uri + 'Sensor/GetAlarms?Name=gvbngvb%20')
    .pipe(map((data: any) => data));
  }
}
