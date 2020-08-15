import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import { SensorFormComponent } from './sensor-form/sensor-form.component';


@NgModule({
  declarations: [SensorFormComponent],
  imports: [
    CommonModule,
    SensorRoutingModule
  ]
})
export class SensorModule { }
