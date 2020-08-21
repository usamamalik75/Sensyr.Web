import { Component, OnInit, Input } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { IndividualTableModel } from '../shared/alarm.model';
import { SensorStatusIdEnum } from '@app/shared/services';

@Component({
  selector: 'app-sensor-group-form',
  templateUrl: './sensor-group-form.component.html',
  styleUrls: ['./sensor-group-form.component.scss']
})
export class SensorGroupFormComponent implements OnInit {
  individualTableModel: IndividualTableModel[] = [];
  @Input() data;
  sensorStatusIdEnum: typeof SensorStatusIdEnum;

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.sensorStatusIdEnum = SensorStatusIdEnum;
    this.getSensorsByGroupId();
    this.getSensorById();
  }

  getSensorsByGroupId() {
    this.sensorService.getSensorsByGroupId(this.data.MachineGroupId).subscribe(
      data => {
        this.individualTableModel = data.Data;
      },
      error => {
      });
  }

  getSensorById() {
    this.sensorService.getSensorById(1).subscribe(
      data => {
        console.log(data);
      },
      error => {
      });
  }

}
