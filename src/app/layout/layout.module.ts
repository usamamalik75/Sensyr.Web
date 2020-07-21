import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout-component/layout.component';
import { SharedModule } from '../core';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
