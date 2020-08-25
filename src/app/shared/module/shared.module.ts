import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@app/shared/_modal/modal.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { ConfirmDialogModule } from '@app/shared/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    HighchartsChartModule,
    ConfirmDialogModule,
  ],
  exports: [
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    ModalModule,
    HighchartsChartModule,
    ConfirmDialogModule,
  ]
})
export class SharedModule {

}
