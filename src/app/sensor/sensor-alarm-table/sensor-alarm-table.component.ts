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

  public data = [
    { name: 'Ajay', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
  ];
  dtOptions: any = {};
  dtOptions2: any = {};
  ngOnInit(): void {
    this.sensorStatusEnum = SensorStatusEnum;
    this.getAlaramDetails();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };
  }

  getAlaramDetails() {
    this.sensorService.getAlaramDetails().subscribe(
      data => {
        this.alarmModel = data.Data;
      },
      error => {
      });
  }






}
