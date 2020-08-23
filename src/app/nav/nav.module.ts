import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BreadcrumbComponent } from '@app/shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    NavRoutingModule
  ]
})
export class NavModule { }
