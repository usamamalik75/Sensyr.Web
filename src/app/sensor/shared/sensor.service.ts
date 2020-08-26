import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '@app/shared/services/base.service';
import { ApiService } from '@app/shared/services';
import { SensorEndPoints, DashboardEndPoints } from '@app/shared/endpoints/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService extends BaseService<any> {

  private urlTest = 'assets/json/test.json';
  public SelectedUser$: BehaviorSubject<any> = new BehaviorSubject({} as any);
  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private sensorEndPoints: SensorEndPoints,
    private dashboardEndPoints: DashboardEndPoints,
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private constantService: HttpBackend,
  ) {
    super(
      httpClient,
      environment.api_aepistle_uri);
  }

  getAlaramDetails(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getAlarmsEndPoint)
      .pipe(map((data: any) => data));
  }

  getTotalAlarmsStatuses(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getTotalAlarmsStatusesEndPoint)
      .pipe(map((data: any) => data));
  }

  getAlarmsStatuses(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getAlarmsStatusesEndPoint)
      .pipe(map((data: any) => data));
  }

  getSensorsByGroupId(id){
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorsByGroupIdEndPoint + '?Id=' + id)
    .pipe(map((data: any) => data));
  }

  getSensorGroupSensorsPerformance(id){
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorGroupSensorsPerformanceEndPoint + '?GroupId=' + id + '&PerPage=10000&Page=1')
    .pipe(map((data: any) => data));
  }
  getSensorById(id){
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorByIdEndPoint + '?Id=' + id)
    .pipe(map((data: any) => data));
  }

  getSensorDetailAnalyticsPerformance(id){
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorDetailAnalyticsPerformanceEndPoint + '?Id=' + id)
    .pipe(map((data: any) => data));
  }

  getSensorDetailAnalyticsStatus(id){
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorDetailAnalyticsStatusEndPoint + '?Id=' + id)
    .pipe(map((data: any) => data));
  }


  getTotalMachinesGroupsSensors(): Observable<any> {
    this.get(this.apiService.dashboardApi + this.dashboardEndPoints.getTotalMachinesGroupsSensorsEndPoint)
    .subscribe(data => {
      this.SelectedUser$.next(data);
    });
    return this.SelectedUser$;
      // .pipe(map((data: any) => data));
  }

  getIndividualSensors(config: any, search?: any): Observable<any> {
    let endPoint = this.sensorEndPoints.getIndividualSensorsEndPoint + '?Page=' + config.currentPage + '&PerPage' + config.itemsPerPage;
    if (search) {
      endPoint = endPoint + '&Search=' + search;
    }
    return this.get(this.apiService.sensorApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getSensorGroups(search?): Observable<any> {
    let endPoint = this.sensorEndPoints.getSensorGroupsEndPoint;
    if (search) {
      endPoint = this.sensorEndPoints.getSensorGroupsEndPoint + '?Search=' + search;
    }
    return this.get(this.apiService.sensorApi + endPoint)
      .pipe(map((data: any) => data));
  }


  getTestDetail(): Observable<any> {
    this.http = new HttpClient(this.httpBackend);
    return this.http.get(this.urlTest);
  }

  deleteSensor(id) {
    return this.delete(0, this.apiService.sensorApi + this.sensorEndPoints.deleteSensorsEndPoint + '?Ids=' + id)
      .pipe(map((data: any) => data));
  }

  deleteSensors(idsArray) {
    return this.delete(0, this.apiService.sensorApi + this.sensorEndPoints.deleteSensorsEndPoint + idsArray)
      .pipe(map((data: any) => data));
  }

  // http://198.12.229.152/api/Sensor/DeleteSensors?Ids=1&Ids=2&Ids=3
}
