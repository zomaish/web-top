import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreHistoryComponent } from './core_history.component';
import { CoreUsageService } from '../../shared/core_usage.service';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}

// declare var require: any;

@NgModule({
  declarations: [
    CoreHistoryComponent
  ],
  imports: [
    CommonModule,
    ChartModule],
  providers: [CoreUsageService,
    {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
    }
  ],
  exports: [CoreHistoryComponent]
})

export class CoreHistoryModule { }
