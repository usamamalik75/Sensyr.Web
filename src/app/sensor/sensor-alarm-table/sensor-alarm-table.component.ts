import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { AlarmModel } from '../shared/alarm.model';
import { SensorStatusEnum, SignalRService, SensorStatusIdEnum } from '@app/shared/services';
import { Subscription, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';

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
    private cd: ChangeDetectorRef
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
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtOptions = {
      //   pagingType: 'full_numbers',
      //   pageLength: 5,
      //   lengthMenu: [5, 10, 25],
      //   processing: true,
      // };
      this.alarmModel = this.newAlarmModel;
        this.dtTrigger.next();
      //       setTimeout(() => {
      //       this.getAlaramDetails();
      //   //     this.alarmModel = model;
      //   // this.dtTrigger.next();
      // }, 100);

    });
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
            setTimeout(() => {
          },10);
        } else {
          this.sensorService.updateSensor(sensor, data);
          if (data.shouldNotifyMessage) {
            this.toastrService.info(data.notifyMessage);
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

  refreshTable(){
    this.rerender();
  }
}
