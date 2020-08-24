import { Component, OnInit, Input, Output, EventEmitter, Inject, NgZone, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { IndividualTableModel } from '../shared/alarm.model';
import { SensorStatusIdEnum } from '@app/shared/services';
import { Router } from '@angular/router';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sensor-group-form',
  templateUrl: './sensor-group-form.component.html',
  styleUrls: ['./sensor-group-form.component.scss']
})
export class SensorGroupFormComponent implements OnInit, AfterViewInit, OnDestroy {
  individualTableModel: IndividualTableModel[] = [];
  @Input() data;
  @Output() closeClick = new EventEmitter<any>();
  private chart: am4charts.XYChart;

  sensorStatusIdEnum: typeof SensorStatusIdEnum;

  constructor(
    private sensorService: SensorService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.sensorStatusIdEnum = SensorStatusIdEnum;
    this.getSensorsByGroupId();
    this.getSensorGroupSensorsPerformance();
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      const data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: 'name' + i, value: visits });
      }

      chart.data = data;
      // chart.mouseWheelBehavior = 'panX';
      chart.mouseWheelBehavior = 'zoomXY';

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}';

      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  getSensorsByGroupId() {
    this.sensorService.getSensorsByGroupId(this.data.MachineGroupId).subscribe(
      data => {
        this.individualTableModel = data.Data;
      },
      error => {
      });
  }

  sensorDetail(data) {
    this.closeClick.emit();
    this.router.navigate(['app', 'sensor', 'detail', data.SensorId, data.SensorTypeName]);
  }


  getSensorGroupSensorsPerformance() {
    this.sensorService.getSensorGroupSensorsPerformance(this.data.MachineGroupId).subscribe(
      data => {
        console.log(data.Data);
      },
      error => {
      });
  }


  // /api/Sensor/



}
