import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { SensorModel } from '../shared/alarm.model';
import { SharedService } from '@app/shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensor-detail-form',
  templateUrl: './sensor-detail-form.component.html',
  styleUrls: ['./sensor-detail-form.component.scss']
})
export class SensorDetailFormComponent implements OnInit {

  sensorTypeName: string;
  sensorModel: SensorModel = {
    SensorId: null,
    SensorName: null,
    MachineName: null,
    DataTypeName: null,
    MachineId: null,
    SensorTypeId: null,
    FrequencyNumber: null,
    CriticalMin: null,
    CriticalMax: null,
    WarningMin: null,
    WarningMax: null,
    DataTypeId: null,
    CustomEquation: null,
    GatewayId: null,
    PortNumber: null,
    SleepStart: null,
    SleepEnd: null,
    DigitalAlarm: null,
    DateCreated: null,
    DigitalLowMin: null,
    DigitalLowMax: null,
    DigitalHighMin: null,
    DigitalHighMax: null,
    DateModified: null,
    LastModifiedBy: null,
    CreatedBy: null,
    SensorTemplateId: null,
    VoltageCriticalMin: null,
    VoltageCriticalMax: null,
    VoltageWarningMin: null,
    VoltageWarningMax: null,
    LastValue: null,
  };
  constructor(
    private sensorService: SensorService,
    public sharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const sensorId = this.activatedRoute.snapshot.params.sensorId;
    this.sensorTypeName = this.activatedRoute.snapshot.params.sensorTypeName;
    this.getSensorById(sensorId);
  }

  getSensorById(sensorId) {
    this.sensorService.getSensorById(sensorId).subscribe(
      data => {
        this.sensorModel = data.Data;
        console.log(data);
      },
      error => {
      });
  }

}
