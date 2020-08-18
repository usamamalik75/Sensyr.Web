import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { SensorStatusIdEnum } from '@app/shared/services';

@Component({
  selector: 'app-sensor-group-table',
  templateUrl: './sensor-group-table.component.html',
  styleUrls: ['./sensor-group-table.component.scss']
})
export class SensorGroupTableComponent implements OnInit {

  groupTableModel: any[] = [];

  sensorStatusIdEnum: typeof SensorStatusIdEnum;

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.sensorStatusIdEnum = SensorStatusIdEnum;
    this.getSensorGroups();
    // this.getTestDetail();
  }

  getSensorGroups() {
    this.sensorService.getSensorGroups().subscribe(
      data => {
        this.groupTableModel = data.Data;
        console.log(JSON.stringify(data));
      },
      error => {
      });
  }


  private getTestDetail() {
    this.sensorService.getTestDetail().subscribe(
      data => {
        this.groupTableModel = data;
      });
  }


}
