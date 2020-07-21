import { PipesModule } from './../../../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [NavbarComponent, SidebarComponent],
  exports: [NavbarComponent, SidebarComponent]
})
export class SharedModule { }
