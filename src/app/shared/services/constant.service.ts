import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  defaultPage: number;
  defaultItemPerPage: number;
  constructor() {
    this.defaultPage = 1;
    this.defaultItemPerPage = 10;
  }
}


export enum SensorStatusEnum {
  warning = 'Warning',
  critical = 'Critical',
  inProgress = 'In Progress'
}


export enum SensorStatusIdEnum {
  critical = 1,
  warning = 2,
  inProgress = 3,
  stable = 4,
}