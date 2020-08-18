import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { IndividualTableModel } from '../shared/alarm.model';
import { SensorStatusIdEnum } from '@app/shared/services';

@Component({
  selector: 'app-sensor-individual-table',
  templateUrl: './sensor-individual-table.component.html',
  styleUrls: ['./sensor-individual-table.component.scss']
})
export class SensorIndividualTableComponent implements OnInit {
  individualTableModel: IndividualTableModel[] = [];

  sensorStatusIdEnum: typeof SensorStatusIdEnum;

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.sensorStatusIdEnum = SensorStatusIdEnum;
    this.getIndividualSensors();
    // this.getTestDetail();
  }

  getIndividualSensors(){
    this.sensorService.getIndividualSensors().subscribe(
      data => {
        this.individualTableModel = data.Data;
        console.log(JSON.stringify(data));
      },
      error => {
      });
  }


  private getTestDetail() {
    this.sensorService.getTestDetail().subscribe(
      data => {
        this.individualTableModel = data;
      });
  }


}
