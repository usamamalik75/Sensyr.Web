import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { MachineFormComponent } from './machine-form/machine-form.component';


@NgModule({
  declarations: [MachineFormComponent],
  imports: [
    CommonModule,
    MachineRoutingModule
  ]
})
export class MachineModule { }
