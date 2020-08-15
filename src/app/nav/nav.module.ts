import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule,
    NavRoutingModule
  ]
})
export class NavModule { }
