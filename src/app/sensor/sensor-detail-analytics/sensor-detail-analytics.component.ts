import { Component, OnInit, NgZone, Input, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as Highcharts from 'highcharts/highmaps';
import { Options } from 'highcharts';

@Component({
  selector: 'app-sensor-detail-analytics',
  templateUrl: './sensor-detail-analytics.component.html',
  styleUrls: ['./sensor-detail-analytics.component.scss']
})
export class SensorDetailAnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
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

  constructor(private zone: NgZone) { }

  _selectedTeam: any | null;

  @Input()
  set selectedTeam(team: any | null) {
    this._selectedTeam = team;
    if (team) {
      this.changeColorToBar(team.isocode, 'week_1', 1.0);
    }
  }

  selectTeam = (team, weekN) => {
    this._selectedTeam = team;
    if (team) {
      this.changeColorToBar(team.isocode, weekN, 1.0);
    }
  }

  chart: am4charts.XYChart;
  categoryAxis: any;
  valueAxis: any;
  currentBar: any;

  ngOnInit(): void {

  }


  grabBar(country, weekId = 0) {
    const totalSeries = this.chart.series.length;
    for (let i = 0; i < totalSeries; ++i) {
      const series = this.chart.series.getIndex(i);
      if (series.name === 'Week_' + weekId) {
        const totalColumns = series['columns'].length;
        for (let c = 0; c < totalColumns; ++c) {
          const column = series['columns'].getIndex(c);
          if (
            column.dataItem.dataContext.country === country
          ) {
            return column;
          }
        }
      }
    }

    // If you don't have access to the chart code in your angular scope,
    // use am4core global.
    // no reason to loop through ALL series/columns, just whipped this up quick
    // let foundBar: am4charts.XYSeries | null;
    // this.chart.series.each(series => {
    //   if (series.name == 'Week_2') {
    //     console.log(series.dataItem);
    //   }
    // });
    // return foundBar;
  }

  changeColorToBar(country, weekId, opacity) {
    let bar = this.grabBar(country, weekId);
    if (bar && bar !== this.currentBar) {
      if (this.currentBar) this.currentBar.fillOpacity = 0.5; // Default
      bar.fillOpacity = opacity;
      this.currentBar = bar;
    }
  }

  createSeries(field, name) {
    var series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'country';
    series.sequencedInterpolation = true;
    series.columns.template.fillOpacity = 0.5;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText =
      '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}';
    // console.log(series);

    return series;
  }

  drawWithData() {
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create('chartdiv2', am4charts.XYChart);
      let data = [
        { country: 'IT', week_0: 10, week_1: 15, week_2: 15, week_3: 22 },
        { country: 'DE', week_0: 20, week_1: 30, week_2: 40, week_3: 24 },
        { country: 'GR', week_0: 13, week_1: 10, week_2: 20, week_3: 15 }
        // new CountryItinerary('Italy', 'IT', [10, 15, 15, 22]),
        // new CountryItinerary('Germany', 'DE', [20, 30, 40, 24]),
        // new CountryItinerary('Greece', 'GR', [13, 10, 20, 15])
      ];

      this.chart.data = data;
      // this.chart.data = data.map((el) => {
      //   let newEl = { 'country': el.isocode }
      //   el.distances.forEach((item, index) => {
      //     newEl['week_' + index] = item
      //   })
      //   return newEl
      // })
      // console.log(this.chart.data);

      this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      this.categoryAxis.dataFields.category = 'country';
      this.categoryAxis.renderer.grid.template.location = 0;

      this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      this.valueAxis.renderer.inside = true;
      this.valueAxis.renderer.labels.template.disabled = true;
      this.valueAxis.min = 0;

      // let numberOfTrips = data[0].distances.length;
      let numberOfTrips = 4;
      for (let i = 0; i < numberOfTrips; i++) {
        this.createSeries('week_' + i, 'Week_' + i);
      }
      // console.log(this.chart.series);
    });
  }

  ngAfterViewInit() {
    // Avoid ExpressionChangedAfterItHasBeenCheckedError error
    // Credit:
    // @link https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4#8c66
    setTimeout(() => {
      this.drawWithData();
    }, 0);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }



}
