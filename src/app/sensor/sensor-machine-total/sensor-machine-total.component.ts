import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { TotalMachineSensor } from '../shared/alarm.model';

@Component({
  selector: 'app-sensor-machine-total',
  templateUrl: './sensor-machine-total.component.html',
  styleUrls: ['./sensor-machine-total.component.scss']
})
export class SensorMachineTotalComponent implements OnInit {

  totalMachineSensor: TotalMachineSensor[] = [];
  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.getTotalMachinesGroupsSensors();
  }

  getTotalMachinesGroupsSensors(){
    this.sensorService.getTotalMachinesGroupsSensors().subscribe(
      data => {
        this.totalMachineSensor = data.Data;
      },
      error => {
      });
  }


}
