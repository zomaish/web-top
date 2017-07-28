import { Component, OnInit } from '@angular/core';
import { UptimeContract, SystemLoadContract, SystemService } from './system.service';

@Component({
  selector: 'system-usage',
  templateUrl: './system.component.html',
  providers: [ SystemService ]
})

export class SystemComponent implements OnInit {

  uptime: String;
  sysLoad: Number;

  constructor(private systemService: SystemService) {}

  ngOnInit() {
    this.systemService.uptime.subscribe((uptime: UptimeContract[]) => {
      this.uptime = this.formatUptime(+uptime[0].uptime);
    });

    this.systemService.systemLoad.subscribe((sysLoad: SystemLoadContract[]) => {
      this.sysLoad = sysLoad[0].avgload;
    });

    this.systemService.observeUptime();
    this.systemService.observeSystemLoad();
  }

  private formatUptime(totalSec: number): String {

    let d = totalSec/(3600*24)|0;
    totalSec = totalSec - d*(3600*24);
    let h = (totalSec / 3600)|0;
    totalSec = totalSec - (h * 3600);
    let m = (totalSec / 60)|0;
    totalSec = totalSec - (m * 60);
    let s = totalSec;

    const hours = this.getHours(h)+"h ";
    const minutes = this.getMinutes(m)+"m ";
    const seconds = this.getSeconds(s) + "s"

    if (d)
      return d+" days " + hours + minutes + seconds;

    if (h)
      return hours + minutes + seconds;

      return  minutes + seconds
  }

  private getHours(h) {
    return h < 10 ? "0"+h : h;
  }

  private getMinutes(m) {
    return m < 10 ? "0"+m : m;
  }

  private getSeconds(s) {
    return s < 10 ? "0"+s : s;
  }
}
