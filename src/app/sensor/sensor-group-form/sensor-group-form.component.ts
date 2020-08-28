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
  graphData: any;

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

    // this.getTestDetail();
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
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
        console.log(JSON.stringify(data.Data));
        this.lineGraph(data.Data);
      },
      error => {
      });
  }

  private getTestDetail() {
    this.sensorService.getTestDetail().subscribe(
      data => {
        this.graphData = data.Data;
        // this.lineGraph(data);
      });
  }


  lineGraph(values) {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      const chart = am4core.create('chartgroupdiv', am4charts.XYChart);
      chart.paddingRight = 20;
      const data = [];
      for (let i = 0; i < values.length; i++) {
        data.push({ date: new Date(values[i].DateTime), name: 'name' + i, value: values[i].Value });
      }
      chart.data = data;
      chart.mouseWheelBehavior = 'zoomXY';
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.baseInterval = {
        'timeUnit': 'minute',
        'count': 1
      };
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

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 3;
      bullet.circle.strokeOpacity = 0;
      bullet.tooltipText = '{valueY}';
      const bullethover = bullet.states.create('hover');
      bullethover.properties.scale = 1.5;

      bullet.adapter.add('fill', function (fill, target) {
        if (target.dataItem['valueY'] <= 20) {
          return am4core.color('#E87A7A');
        }
        else if (target.dataItem['valueY'] >= 21 && target.dataItem['valueY'] <= 40) {
          return am4core.color('#FFBD2F');
        }
        else if (target.dataItem['valueY'] >= 41 && target.dataItem['valueY'] <= 60) {

          return am4core.color('#5CB592');
        }

        else if (target.dataItem['valueY'] >= 61 && target.dataItem['valueY'] <= 80) {

          return am4core.color('#FFBD2F');
        }
        else {
          return am4core.color('#E87A7A');
        }
        return fill;
      })

      const range = valueAxis.createSeriesRange(series);
      range.value = 0;
      range.endValue = 20;
      range.contents.stroke = am4core.color('#E87A7A');
      range.contents.fill = range.contents.stroke;

      const range1 = valueAxis.createSeriesRange(series);
      range1.value = 21;
      range1.endValue = 40;
      range1.contents.stroke = am4core.color('#FFBD2F');
      range1.contents.fill = range1.contents.stroke;

      const range2 = valueAxis.createSeriesRange(series);
      range2.value = 41;
      range2.endValue = 60;
      range2.contents.stroke = am4core.color('#5CB592');
      range2.contents.fill = range2.contents.stroke;

      const range3 = valueAxis.createSeriesRange(series);
      range3.value = 61;
      range3.endValue = 80;
      range3.contents.stroke = am4core.color('#FFBD2F');
      range3.contents.fill = range3.contents.stroke;

      const range4 = valueAxis.createSeriesRange(series);
      range4.value = 81;
      range4.endValue = 1000;
      range4.contents.stroke = am4core.color('#E87A7A');
      range4.contents.fill = range4.contents.stroke;


      this.chart = chart;
    });
  }



}
