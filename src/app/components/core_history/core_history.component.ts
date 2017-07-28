import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoreHistoryService } from '../../shared/core_history.service';
import { CoreUsageService } from '../../shared/core_usage.service';

@Component({
  selector: 'app-root',
  templateUrl: './core_history.component.html',
  providers: [],
})

export class CoreHistoryComponent implements OnInit {
  private subscription;
  chartOptions: Object;
  chart: any;

  constructor(private coreHistoryService: CoreHistoryService, private coreUsageService: CoreUsageService) {
    this.chartOptions = {
      chart: {
        type: 'spline',
        width: 800,
        height: 600,
      },
      boost: {
        useGPUTranslations: true
      },
      title : {
        text: 'Core performance history'
      },
      xAxis: {
        title: {
          text: "Last 30 Seconds"
        }
      },
      yAxis: {
        title: {
          text: "Load"
        },
      },
      series: []
     };
  }

  saveInstance(chartInstance): void {
     this.chart = chartInstance;
  }

  ngOnInit() {
    this.subscription = this.coreHistoryService.coreHistory.subscribe((coresUsage) => {

      if (this.reachedMaxSegments()) {
        this.subscription.unsubscribe();
        return;
      }

      const numberOfCores = this.coreHistoryService.numberOfCores;
      this.setChartSeiesLabels(numberOfCores);

      const startPos = this.getSeriesDataLength();
      const series = Array.apply(null, Array(numberOfCores)).map(() => {
        return {data: []};
      });

      for (let i=startPos; i<coresUsage.length; i++) {
        let timeSegment = coresUsage[i];
        timeSegment.coreHistory.forEach((core, idx) => {
          this.chart.series[idx].addPoint([new Date(+timeSegment.insertTime), +core.toFixed(2)], false);
        });
      }

      this.chart.redraw();
    });

    this.coreUsageService.observeCupUsage();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setChartSeiesLabels(seriesCount) {
    if (this.isSeriesSet()) return;

    Array.apply(null, Array(seriesCount)).map((e, i) => {
      this.chart.addSeries({
          "name": "core-" +(i+1),
          data: []
        }, false);
      });

    this.chart.redraw();
  }

  private isSeriesSet() {
    return this.chart.series && this.chart.series.length;
  }

  private reachedMaxSegments() {
    return this.chart.series.data &&
      this.chart.series.data.length === this.coreHistoryService.totalSegments;
  }

  private getSeriesDataLength() {
    return this.chart.series[0].data.length;
  }
}
