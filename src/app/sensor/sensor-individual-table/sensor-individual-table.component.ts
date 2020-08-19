import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { IndividualTableModel } from '../shared/alarm.model';
import { SensorStatusIdEnum } from '@app/shared/services';

@Component({
  selector: 'app-sensor-individual-table',
  templateUrl: './sensor-individual-table.component.html',
  styleUrls: ['./sensor-individual-table.component.scss']
})
export class SensorIndividualTableComponent implements OnInit, OnDestroy {
  individualTableModel: IndividualTableModel[] = [];
  sensorStatusIdEnum: typeof SensorStatusIdEnum;

  @Input() private searchClick: EventEmitter<any>;
  constructor(
    private sensorService: SensorService,
  ) { }




  ngOnInit(): void {
    this.sensorStatusIdEnum = SensorStatusIdEnum;
    this.getIndividualSensors();
    // this.getTestDetail();
    this.searchEvent();
  }

  searchEvent() {
    this.searchClick.subscribe(
      data => {
        this.getIndividualSensors(data);
      }
    );
  }


  getIndividualSensors(search?) {
    this.sensorService.getIndividualSensors(search).subscribe(
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

  ngOnDestroy() {
  }

}
