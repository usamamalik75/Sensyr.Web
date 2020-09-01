import { Component, OnInit, NgZone, Input, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';
import { SensorService } from '../shared/sensor.service';
import { ActivatedRoute } from '@angular/router';
import { SensorStatusEnum } from '@app/shared/services';


@Component({
  selector: 'app-sensor-alarm-detail',
  templateUrl: './sensor-alarm-detail.component.html',
  styleUrls: ['./sensor-alarm-detail.component.scss']
})
export class SensorAlarmDetailComponent implements OnInit {

  alarmsStatuses: any;
  warning: any;
  inPrgress: any;
  critical: any;
  warningCount: string;
  inPrgressCount: string;
  criticalCount: string;

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
    am4core.useTheme(am4themes_animated);

    this.getAlarmsStatuses();
    this.getTotalAlarmsStatuses();
    this.subscribeMethod();
  }

  subscribeMethod() {
    this.sensorService.alarmCountEvent.subscribe(data => {
      this.getTotalAlarmsStatuses();
    });
  }
  // /api/Sensor/GetTotalAlarmsStatuses
  getTotalAlarmsStatuses() {
    this.sensorService.getTotalAlarmsStatuses().subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.critical = data.Data.Critical;
        this.warning = data.Data.Warning;
        this.inPrgress = data.Data.InProgress;
        this.manageCount();
      },
      error => {
      });
  }

  getAlarmsStatuses() {
    this.sensorService.getAlarmsStatuses().subscribe(
      data => {
        console.log(data.Data);
        const alarmsStatuses = data.Data;
        const warning = data.Data.Items.find(x => x.AlarmStatusName === SensorStatusEnum.warning);
        const inPrgress = data.Data.Items.find(x => x.AlarmStatusName === SensorStatusEnum.inProgress);
        const critical = data.Data.Items.find(x => x.AlarmStatusName === SensorStatusEnum.critical);
        if (critical && critical.AlarmSensorStatusResponses) {
          this.lineGraph(critical.AlarmSensorStatusResponses, '#E87A7A', '#ED3E3D', 'chartdiv');
        }
        if (warning && warning.AlarmSensorStatusResponses) {
          this.lineGraph(warning.AlarmSensorStatusResponses, '#f5ce7b', '#FFBD2F', 'chartdivWarning');
        }
        if (inPrgress && inPrgress.AlarmSensorStatusResponses) {
          this.lineGraph(inPrgress.AlarmSensorStatusResponses, '#81bfa7', '#5CB592', 'chartdivInProgress');
        }
        // this.manageCount();
      },
      error => {
      });
  }

  lineGraph(values, bg, color, div) {
    // Chart code goes in here
    this.browserOnly(() => {
      const chart = am4core.create(div, am4charts.XYChart);
      // chart.background.fill = am4core.color(bg);
      chart.background.opacity = 0.3;
      chart.paddingRight = 20;
      const data = [];
      for (let i = 0; i < values.length; i++) {
        data.push({ date: values[i].Datetime, name: 'name' + i, value: values[i].LiveValue });
      }
      chart.data = data;
      // Create axes
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

      // Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      dateAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      dateAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      // Create series
      const lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.valueY = 'value';
      lineSeries.dataFields.dateX = 'date';
      lineSeries.name = 'Sales';
      lineSeries.strokeWidth = 3;
      lineSeries.tensionX = 0.85;
      lineSeries.stroke = am4core.color(color);

      // Add simple bullet
      const bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      bullet.disabled = true;
      bullet.propertyFields.disabled = 'disabled';

      const secondCircle = bullet.createChild(am4core.Circle);
      secondCircle.radius = 6;
      secondCircle.fill = chart.colors.getIndex(8);


      bullet.events.on('inited', function (event) {
        animateBullet(event.target.circle);
      });


      function animateBullet(bullet) {
        const animation = bullet.animate([{ property: 'scale', from: 1, to: 5 }, { property: 'opacity', from: 1, to: 0 }], 1000, am4core.ease.circleOut);
        animation.events.on('animationended', function (event) {
          animateBullet(event.target.object);
        });
      }

      this.chart = chart;
    });
  }




  manageCount() {
    const warningLength = this.warning;
    const inPrgressLength = this.inPrgress;
    const criticalLength = this.critical;
    if (warningLength && warningLength < 10) {
      this.warningCount = '0' + warningLength;
    } else {
      this.warningCount = '' + warningLength;
    }
    if (inPrgressLength && inPrgressLength < 10) {
      this.inPrgressCount = '0' + inPrgressLength;
    } else {
      this.inPrgressCount = '' + inPrgressLength;
    }
    if (criticalLength && criticalLength < 10) {
      this.criticalCount = '0' + criticalLength;
    } else {
      this.criticalCount = '' + criticalLength;
    }
  }

}
