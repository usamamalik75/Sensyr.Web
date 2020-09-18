import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly sensorApi: string = 'Sensor/';
  readonly dashboardApi: string = 'Dashboard/';
  readonly authApi: string = 'Auth/';

  constructor() { }


}
