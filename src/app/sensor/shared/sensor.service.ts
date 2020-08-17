import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '@app/shared/services/base.service';
import { ApiService } from '@app/shared/services';
import { SensorEndPoints } from '@app/shared/endpoints/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService extends BaseService<any> {

  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private sensorEndPoints: SensorEndPoints
  ) {
    super(
      httpClient,
      environment.api_aepistle_uri);
  }

  getAlaramDetails(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getAlarmsEndPoint)
      .pipe(map((data: any) => data));
  }
}
