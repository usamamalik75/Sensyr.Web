import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-table',
  templateUrl: './sensor-table.component.html',
  styleUrls: ['./sensor-table.component.scss']
})
export class SensorTableComponent implements OnInit {
  isSensorGroup: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  SensorGroup(){
    this.isSensorGroup = true;
  }
}
