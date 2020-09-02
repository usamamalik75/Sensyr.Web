import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { AlarmModel } from '../shared/alarm.model';
import { SensorStatusEnum, SignalRService, SensorStatusIdEnum } from '@app/shared/services';
import { Subscription, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensor-alarm-table',
  templateUrl: './sensor-alarm-table.component.html',
  styleUrls: ['./sensor-alarm-table.component.scss']
})
export class SensorAlarmTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  alarmModel: AlarmModel[] = [];
  sensorStatusEnum: typeof SensorStatusEnum;
  isAlarmModel: boolean;
  newAlarmModel: any;
  constructor(
    private sensorService: SensorService,
    private signalRService: SignalRService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.sensorStatusEnum = SensorStatusEnum;
    this.getAlaramDetails();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      // processing: true,
    };
  }

  rerender(model?): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.alarmModel = this.newAlarmModel;
      this.dtTrigger.next();
    });
  }


  sensorDetail(data) {
    this.router.navigate(['app', 'sensor', 'detail', data.SensorId, data.SensorTypeName, data.SensorName]);
  }

  ngAfterViewInit() {
    this.subscribeMethod();
  }

  getAlaramDetails() {
    this.alarmModel = [];
    this.sensorService.getAlaramDetails().subscribe(
      data => {
        const stableData = data.Data.filter(x => x.SensorStatusId === SensorStatusIdEnum.stable);
        stableData.forEach(item => {
          const index = data.Data.findIndex(x => x.SensorId === item.SensorId);
          if (index > -1) {
            data.Data.splice(index, 1);
          }
        });
        this.alarmModel = data.Data;
        this.dtTrigger.next();
      },
      error => {
      });
  }


  subscribeMethod() {
    this.signalRService.alarmTableSubject.subscribe(data => {
      if (data && data != null) {
        const sensor = this.alarmModel.find(x => x.SensorId === data.sensorId);
        if (!sensor || data.sensorStatusId === 4) {
          const model = JSON.parse(JSON.stringify(this.alarmModel));
          this.sensorService.addRemoveSensor(sensor, data, model);
          this.newAlarmModel = model;
          document.getElementById('refreshbtn').click();

        } else {
          this.sensorService.updateSensor(sensor, data);
          if (data.shouldNotifyMessage) {
            this.sensorService.toastrMessage(data);
          }
        }
      }
      // console.log(data);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refreshTable() {
    this.rerender();
  }
}
