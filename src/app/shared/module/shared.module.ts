import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule
  ],
  exports: [
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class SharedModule { }
