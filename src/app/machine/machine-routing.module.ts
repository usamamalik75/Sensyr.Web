import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachineFormComponent } from './machine-form/machine-form.component';

const routes: Routes = [
  {
    path: '',
    component: MachineFormComponent,
    data: {
      breadcrumb: null
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineRoutingModule { }
