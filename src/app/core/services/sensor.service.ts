import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  GetTotalMachinesGroupsSensors() : Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/Dashboard/GetTotalMachinesGroupsSensors';
    return this.http.get(url);
  }

  GetAlarms() : Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/Sensor/GetAlarms';
    return this.http.get(url);
  }

  GetIndividualSensors(BranchId: any) : Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/Sensor/GetIndividualSensors?BranchId=' + BranchId;
    return this.http.get(url);
  }

  GetSensorGroups(BranchId: any) : Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/Sensor/GetSensorGroup?BranchId=' + BranchId;
    return this.http.get(url);
  }

  GetSensorById(id:any) : Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/Sensor/GetSensorById?id=' + id;
    return this.http.get(url);
  }

}
