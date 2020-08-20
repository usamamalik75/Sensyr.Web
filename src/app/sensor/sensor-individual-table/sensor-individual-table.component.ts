import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { IndividualTableModel } from '../shared/alarm.model';
import { SensorStatusIdEnum, ConstantService } from '@app/shared/services';

@Component({
  selector: 'app-sensor-individual-table',
  templateUrl: './sensor-individual-table.component.html',
  styleUrls: ['./sensor-individual-table.component.scss']
})
export class SensorIndividualTableComponent implements OnInit, OnDestroy {
  individualTableModel: IndividualTableModel[] = [];
  sensorStatusIdEnum: typeof SensorStatusIdEnum;

  @Input() private searchClick: EventEmitter<any>;
  config = {
    itemsPerPage: this.constantSetvice.defaultItemPerPage,
    currentPage: this.constantSetvice.defaultPage,
    totalItems: 0,
    id: 'custom'
  };
  searchText: string;

  constructor(
    private sensorService: SensorService,
    private constantSetvice: ConstantService,
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
        this.searchText = data;
        this.config.currentPage = this.constantSetvice.defaultPage;
        this.config.itemsPerPage = this.constantSetvice.defaultItemPerPage;
        this.getIndividualSensors(this.searchText);
      }
    );
  }

  getIndividualSensors(search?) {
    this.sensorService.getIndividualSensors(this.config, search).subscribe(
      data => {
        this.individualTableModel = data.Data;
        this.config.totalItems = data.Data.TotalCount;
        // this.config.itemsPerPage = data.Data.ItemsPerPage;
        this.config.currentPage = data.Data.CurrentPage;
        // console.log(JSON.stringify(data));
      },
      error => {
      });
  }

  private getTestDetail() {
    this.sensorService.getTestDetail().subscribe(
      data => {
        this.individualTableModel = data.Data;
        this.config.totalItems = data.Data.TotalCount;
        // this.config.itemsPerPage = data.Data.ItemsPerPage;
        this.config.currentPage = data.Data.CurrentPage;
      });
  }

  ngOnDestroy() {
  }

  onPageChange(event){
    this.config.currentPage = event;
    this.getIndividualSensors(this.searchText);
  }

}
