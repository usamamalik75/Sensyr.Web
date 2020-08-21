import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { IndividualTableModel } from '../shared/alarm.model';
import { SensorStatusIdEnum } from '@app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensor-group-form',
  templateUrl: './sensor-group-form.component.html',
  styleUrls: ['./sensor-group-form.component.scss']
})
export class SensorGroupFormComponent implements OnInit {
  individualTableModel: IndividualTableModel[] = [];
  @Input() data;
  @Output() closeClick = new EventEmitter<any>();

  sensorStatusIdEnum: typeof SensorStatusIdEnum;

  constructor(
    private sensorService: SensorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sensorStatusIdEnum = SensorStatusIdEnum;
    this.getSensorsByGroupId();
  }

  getSensorsByGroupId() {
    this.sensorService.getSensorsByGroupId(this.data.MachineGroupId).subscribe(
      data => {
        this.individualTableModel = data.Data;
      },
      error => {
      });
  }

  sensorDetail(data) {
    this.closeClick.emit();
    this.router.navigate(['app', 'sensor', 'detail', data.SensorId, data.SensorTypeName]);
  }



}
