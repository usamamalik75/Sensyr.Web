import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }
}


export enum SensorStatusEnum {
  warning = 'Warning',
  critical = 'Critical'
}


export enum SensorStatusIdEnum {
  critical = 1,
  warning = 2,
  inProgress = 3,
  stable = 4,
}
