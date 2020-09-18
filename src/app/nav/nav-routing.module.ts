import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


const myChildren: any = [
  {
    path: 'sensor',
    loadChildren: () => import('@app/sensor/sensor.module').then(m => m.SensorModule),
    data: {
      breadcrumb: 'Sensors'
    },
  },
  {
    path: 'machine',
    loadChildren: () => import('@app/machine/machine.module').then(m => m.MachineModule),
    data: {
      breadcrumb: 'Assets'
    },
  }
];

const routes: Routes = [
  {
    path: '',
    component: NavMenuComponent,
    children: [...myChildren]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
