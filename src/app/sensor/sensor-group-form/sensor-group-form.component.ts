import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sensor-group-form',
  templateUrl: './sensor-group-form.component.html',
  styleUrls: ['./sensor-group-form.component.scss']
})
export class SensorGroupFormComponent implements OnInit {

  @Input() data;
  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
