import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { Options } from 'highcharts';

@Component({
  selector: 'app-sensor-detail-analytics',
  templateUrl: './sensor-detail-analytics.component.html',
  styleUrls: ['./sensor-detail-analytics.component.scss']
})
export class SensorDetailAnalyticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options = {
    mapNavigation: {
      enabled: true,
      enableButtons: true,
    },
    series: [{
      data: [1, 2, 11, 25, 3, 19, 16, 17, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      type: 'line'
    }
    ],

  };

  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit(): void {

  }



}
