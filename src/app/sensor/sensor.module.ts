import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { SensorAlarmTableComponent } from './sensor-alarm-table/sensor-alarm-table.component';
import { SensorMachineTotalComponent } from './sensor-machine-total/sensor-machine-total.component';
import { SensorTableComponent } from './sensor-table/sensor-table.component';
import { SensorIndividualTableComponent } from './sensor-individual-table/sensor-individual-table.component';
import { SensorGroupTableComponent } from './sensor-group-table/sensor-group-table.component';
import { SharedModule } from '@app/shared/module/shared.module';
import { SensorGroupFormComponent } from './sensor-group-form/sensor-group-form.component';


@NgModule({
  declarations: [
    SensorFormComponent,
    SensorAlarmTableComponent,
    SensorMachineTotalComponent,
    SensorTableComponent,
    SensorIndividualTableComponent,
    SensorGroupTableComponent,
    SensorGroupFormComponent],
  imports: [
    CommonModule,
    SensorRoutingModule,
    SharedModule
  ],
  entryComponents: [
    SensorGroupFormComponent,
  ]
})
export class SensorModule { }
