import { Component, OnInit, NgZone, Input, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as Highcharts from 'highcharts/highmaps';
import { Options } from 'highcharts';
import { isPlatformBrowser } from '@angular/common';
import { SensorService } from '../shared/sensor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensor-detail-analytics',
  templateUrl: './sensor-detail-analytics.component.html',
  styleUrls: ['./sensor-detail-analytics.component.scss']
})
export class SensorDetailAnalyticsComponent implements OnInit, OnDestroy {

  chart: am4charts.XYChart;
  categoryAxis: any;
  valueAxis: any;
  currentBar: any;
  sensorId: number;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId,
    private sensorService: SensorService,
    private activatedRoute: ActivatedRoute
  ) { }


  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {
    this.sensorId = +this.activatedRoute.snapshot.params.sensorId;
    this.getSensorDetailAnalyticsPerformance();
    // this.getSensorDetailAnalyticsStatus();
    this.getTestDetail();

  }

  getSensorDetailAnalyticsPerformance() {
    this.sensorService.getSensorDetailAnalyticsPerformance(this.sensorId).subscribe(
      data => {
        this.lineGraph(data.Data);
      },
      error => {
      });
  }

  getSensorDetailAnalyticsStatus() {
    this.sensorService.getSensorDetailAnalyticsStatus(this.sensorId).subscribe(
      data => {
        console.log(JSON.stringify(data.Data));
        this.drawWithData(data);
      },
      error => {
      });
  }

  private getTestDetail() {
    this.sensorService.getTestDetail().subscribe(
      data => {
        this.drawWithData(data);
      });
  }


  lineGraph(values) {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.paddingRight = 20;
      const data = [];
      for (let i = 0; i < values.length; i++) {
        data.push({ date: new Date(values[i].DateTime), name: 'name' + i, value: values[i].Value });
      }
      chart.data = data;
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



  createSeries(field, name) {
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'DateTime';
    series.sequencedInterpolation = true;
    series.columns.template.fillOpacity = 0.5;

    series.stacked = true;

    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText =
      '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}';

    return series;
  }

  drawWithData(data) {
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create('chartdiv2', am4charts.XYChart);
      this.chart.data = data;

      this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      this.categoryAxis.dataFields.category = 'DateTime';
      this.categoryAxis.renderer.grid.template.location = 0;

      this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      this.valueAxis.renderer.inside = true;
      this.valueAxis.renderer.labels.template.disabled = true;
      this.valueAxis.min = 0;

      this.createSeries("WarningValue", "Warning");
      this.createSeries("CriticalValue", "Critical");
    });
  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });

  }



}
