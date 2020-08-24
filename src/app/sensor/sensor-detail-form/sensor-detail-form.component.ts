import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { SensorModel } from '../shared/alarm.model';
import { SharedService } from '@app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '@app/shared/components/confirm-dialog/confirm-dialog.service';

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
  sensorId: number;
  constructor(
    private sensorService: SensorService,
    public sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.sensorId = +this.activatedRoute.snapshot.params.sensorId;
    this.sensorTypeName = this.activatedRoute.snapshot.params.sensorTypeName;
    this.getSensorById(this.sensorId);
  }

  getSensorById(sensorId) {
    this.sensorService.getSensorById(sensorId).subscribe(
      data => {
        this.sensorModel = data.Data;
        // console.log(data);
      },
      error => {
      });
  }


  deleteSensor() {
    const result = confirm('Are you sure to delete?');
    if (result) {
      this.delete();
    }
  }

  delete() {
    this.sensorService.deleteSensor(this.sensorId).subscribe(
      data => {
        this.toastrService.info('Sensor has been deleted successfully!');
        this.router.navigate(['app', 'sensor']);
      },
      error => {
      });
  }

}
