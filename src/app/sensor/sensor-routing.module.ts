import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorFormComponent } from '@app/sensor/sensor-form/sensor-form.component';

const routes: Routes = [
  {
    path: '',
    component: SensorFormComponent,
    data: {
      breadcrumb: null
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorRoutingModule { }
