import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoreUsageContract, CoreUsageService } from '../../shared/core_usage.service';
import { UsageBar } from '../../shared/usage_bar/usage_bar.component';

@Component({
  selector: 'core-usage',
  templateUrl: './core_usage.component.html',
  styleUrls: ['./core_usage.component.css'],
  providers: []
})

export class CoreUsageComponent implements OnInit {

  cores: UsageBar[];
  private subscription;

  constructor(private coreUsageService: CoreUsageService) {}

  ngOnInit() {
    this.subscription = this.coreUsageService.cpuUsage.subscribe((coresUsage: CoreUsageContract[]) => {
        this.cores = coresUsage.map((coreUsage) => {
          let used: Number = coreUsage.usage || 0;
          const numberOfPipes = new Array(Math.round(+used));
          numberOfPipes.map((x,i)=>i);

          return new UsageBar(coreUsage.coreId + "", used+"%", numberOfPipes);
        });
      });

    this.coreUsageService.observeCupUsage();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
