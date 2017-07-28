import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class SystemLoadContract {
  constructor(public avgload: Number){}
}

export class UptimeContract {
  constructor(public uptime: Number){}
}

@Injectable()
export class SystemService  {

  constructor(private socket: Socket) { }

  // Observable systemUsage source
  private systemLoadChangeSource: Subject<SystemLoadContract[]> = new Subject<SystemLoadContract[]>();
  private uptimeChangeSource: Subject<UptimeContract[]> = new Subject<UptimeContract[]>();

  systemLoad: Observable<SystemLoadContract[]> = this.systemLoadChangeSource.asObservable();
  uptime: Observable<UptimeContract[]> = this.uptimeChangeSource.asObservable();

  public observeSystemLoad() : void {
    this.socket.on("load", (avgload) => {
      this.notifyLoadObservers(avgload[2]);
    });
  }

  private notifyLoadObservers(avgload: number) {
    const res: SystemLoadContract = new SystemLoadContract(Number(avgload.toFixed(2)));
    this.systemLoadChangeSource.next([res]);
  }

  public observeUptime() : void {
    this.socket.on("uptime", (uptime) => {
      this.notifyUptimeObservers(uptime);
    });
  }

  private notifyUptimeObservers(uptime: number) {
    const res: UptimeContract = new UptimeContract(uptime);
    this.uptimeChangeSource.next([res]);
  }
}
