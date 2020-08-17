import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { SensorAlarmTableComponent } from './sensor-alarm-table/sensor-alarm-table.component';


@NgModule({
  declarations: [SensorFormComponent, SensorAlarmTableComponent],
  imports: [
    CommonModule,
    SensorRoutingModule
  ]
})
export class SensorModule { }
