import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { SensorStatusEnum } from '@app/shared/services';
@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.scss']
})
export class SensorFormComponent implements OnInit {
  alarmsStatuses: any;
  warning: any;
  inPrgress: any;
  critical: any;
  warningCount: string;
  inPrgressCount: string;
  criticalCount: string;

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.getAlarmsStatuses();
  }


  getAlarmsStatuses() {
    this.sensorService.getAlarmsStatuses().subscribe(
      data => {
        this.alarmsStatuses = data.Data;
        this.warning = data.Data.Items.find(x => x.AlarmStatusName === SensorStatusEnum.warning);
        this.inPrgress = data.Data.Items.find(x => x.AlarmStatusName === SensorStatusEnum.inProgress);
        this.critical = data.Data.Items.find(x => x.AlarmStatusName === SensorStatusEnum.critical);
        this.manageCount();
      },
      error => {
      });
  }

  manageCount() {
    const warningLength = this.warning.AlarmSensorStatusResponses.length;
    const inPrgressLength = this.inPrgress.AlarmSensorStatusResponses.length;
    const criticalLength = this.critical.AlarmSensorStatusResponses.length;
    if (warningLength && warningLength < 10) {
      this.warningCount = '0' + warningLength;
    } else {
      this.warningCount = '' + warningLength;
    }
    if (inPrgressLength && inPrgressLength < 10) {
      this.inPrgressCount = '0' + inPrgressLength;
    } else {
      this.inPrgressCount = '' + inPrgressLength;
    }
    if (criticalLength && criticalLength < 10) {
      this.criticalCount = '0' + criticalLength;
    } else {
      this.criticalCount = '' + criticalLength;
    }
  }

}
