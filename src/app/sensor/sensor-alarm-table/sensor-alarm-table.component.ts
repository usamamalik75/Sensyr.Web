import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { AlarmModel } from '../shared/alarm.model';
import { SensorStatusEnum } from '@app/shared/services';

@Component({
  selector: 'app-sensor-alarm-table',
  templateUrl: './sensor-alarm-table.component.html',
  styleUrls: ['./sensor-alarm-table.component.scss']
})
export class SensorAlarmTableComponent implements OnInit {

  alarmModel: AlarmModel[] = [];
  sensorStatusEnum: typeof SensorStatusEnum;
  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.sensorStatusEnum = SensorStatusEnum;
    this.getAlaramDetails();
  }

  getAlaramDetails(){
    this.sensorService.getAlaramDetails().subscribe(
      data => {
        this.alarmModel = data.Data;
      },
      error => {
      });
  }

}
