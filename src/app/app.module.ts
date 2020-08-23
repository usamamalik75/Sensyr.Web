import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from '@app/core/interceptors';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ControllerEndpoints } from '@app/shared/endpoints';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    HighchartsChartModule
  ],
  providers: [
    httpInterceptorProviders,
    ControllerEndpoints
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
