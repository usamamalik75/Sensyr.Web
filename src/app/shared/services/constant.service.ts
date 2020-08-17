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
