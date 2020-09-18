import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorFormComponent } from '@app/sensor/sensor-form/sensor-form.component';
import { SensorDetailFormComponent } from '@app/sensor/sensor-detail-form/sensor-detail-form.component';

const routes: Routes = [
  {
    path: '',
    component: SensorFormComponent,
    data: {
      breadcrumb: ''
    },
  },
  {
    path: 'detail/:sensorId/:sensorTypeName/:breadcrumbName',
    component: SensorDetailFormComponent,
    data: {
      breadcrumb: 'Sensors Detail',
      breadcrumbName : true
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorRoutingModule { }
