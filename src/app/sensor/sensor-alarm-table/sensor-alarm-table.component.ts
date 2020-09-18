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
  isShowTable: boolean = true;
  totalCount: number;
  p: any;
  term: string;
  constructor(
    private sensorService: SensorService,
    private signalRService: SignalRService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized: boolean = false;
  ngOnInit(): void {
    this.sensorStatusEnum = SensorStatusEnum;
    this.getAlaramDetails();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
    };


  }


  rerender(model?): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
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
        this.newAlarmModel = data.Data;
        this.totalCount = this.alarmModel.length;
        // if (this.isDtInitialized) {
        //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //     dtInstance.destroy();
        //     this.dtTrigger.next();
        //   });
        // } else {
        //   this.isDtInitialized = true;
        //   this.dtTrigger.next();
        // }
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
          this.alarmModel = this.newAlarmModel;
          this.totalCount = this.alarmModel.length;

          // setTimeout(() => {
          //   document.getElementById('refreshbtn').click();
          // }, 100);

        } else {
          this.sensorService.updateSensor(sensor, data);
          if (data.shouldNotifyMessage) {
            this.sensorService.toastrMessage(data);
          }
        }
      }
      // console.log(data);
    });


    this.sensorService.alarmTableSelectEvent.subscribe(
      data => {
        if (data === '' || data == null) {
          this.alarmModel = this.newAlarmModel;
          this.totalCount = this.alarmModel.length;
        } else {
          this.alarmModel = this.newAlarmModel.filter(x => x.SensorStatusId === data);
          this.totalCount = this.alarmModel.length;
          this.p = 1;
        }
        document.getElementById('refreshbtn').click();
      });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // this.isShowTable = false;
    // this.dtTrigger.unsubscribe();
    // if (this.dtElement.dtInstance) {
    //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //     dtInstance.destroy();
    //   });
    // }
  }

  refreshTable() {
    this.rerender();
  }

  filter() {
    const values = this.newAlarmModel;
    let filter = this.term;
    const keyArray = ['SensorId', 'SensorName', 'MachineName', 'TimeElapsed', 'SensorTypeName', 'LiveValue', 'DayMin', 'DayMax'];
    if (!values || !values.length) { return []; }
    if (!filter) { return values; }

    filter = filter.toUpperCase();

    if (filter && Array.isArray(values)) {
      const keys = keyArray;
      this.alarmModel =  values.filter(v => v && keys.some(k => String(v[k]).toUpperCase().indexOf(filter) >= 0));
      this.totalCount = this.alarmModel.length;
    }
  }
}
