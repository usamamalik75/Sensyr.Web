import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '@app/shared/services/base.service';
import { ApiService } from '@app/shared/services';
import { SensorEndPoints, DashboardEndPoints } from '@app/shared/endpoints/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService extends BaseService<any> {

  private urlTest = 'assets/json/test.json';
  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private sensorEndPoints: SensorEndPoints,
    private dashboardEndPoints: DashboardEndPoints,
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    super(
      httpClient,
      environment.api_aepistle_uri);
  }

  getAlaramDetails(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getAlarmsEndPoint)
      .pipe(map((data: any) => data));
  }

  getTotalMachinesGroupsSensors(): Observable<any> {
    return this.get(this.apiService.dashboardApi + this.dashboardEndPoints.getTotalMachinesGroupsSensorsEndPoint)
      .pipe(map((data: any) => data));
  }

  getIndividualSensors(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getIndividualSensorsEndPoint)
      .pipe(map((data: any) => data));
  }

  getSensorGroups(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorGroupsEndPoint)
      .pipe(map((data: any) => data));
  }


  getTestDetail(): Observable<any> {
    this.http = new HttpClient(this.httpBackend);
    return this.http.get(this.urlTest);
  }

}
