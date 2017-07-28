import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CoreHistoryService } from './core_history.service';

export class CoreUsageContract {
  constructor(public coreId: Number, public usage: Number){}
}

@Injectable()
export class CoreUsageService  {

  constructor(private socket: Socket, private coresHistory: CoreHistoryService) { }

  // Observable cpuUsage source
  private cpuUsageChangeSource: Subject<CoreUsageContract[]> = new Subject<CoreUsageContract[]>();
  private observing: Boolean = false;

  cpuUsage: Observable<CoreUsageContract[]> = this.cpuUsageChangeSource.asObservable();


  public observeCupUsage() : void {
    if (this.observing)
      return;

    this.observing = true;
    this.socket.on("currentLoad", (currentLoad) => {
      this.notifyObservers(currentLoad.cpus);
    });
  }

  private notifyObservers(coresUsageStats: Object[]) {
    const res = new Array(coresUsageStats.length);
    const coresLoad: number[] = coresUsageStats.map((cs) => {
      return cs['load'];
    });

    this.coresHistory.updateHistory(coresLoad);

    coresLoad.forEach((coreLoad, i) => {
      res[i] = new CoreUsageContract(i+1, parseFloat(coreLoad.toFixed(2)));
    });

    this.cpuUsageChangeSource.next(res);
  }
}
