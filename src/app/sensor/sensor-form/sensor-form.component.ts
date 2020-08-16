import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.scss']
})
export class SensorFormComponent implements OnInit {

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.getAlaramDetails();
  }

  getAlaramDetails(){
    this.sensorService.getAlaramDetails().subscribe(
      data => {
        console.log(JSON.stringify(data));
      },
      error => {
      });
  }

}
