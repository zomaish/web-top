import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CoreHistoryService } from '../../shared/core_history.service';

export class MemUsageContract {
  constructor(public used: Number,
    public total: Number,
    public free: Number,
    public swapused: Number,
    public swaptotal: Number,
    public swapfree: Number)
    {}
}

@Injectable()
export class MemUsageService  {

  constructor(private socket: Socket, private coreHistory: CoreHistoryService) { }

  // Observable memUsage source
  private memUsageChangeSource: Subject<MemUsageContract[]> = new Subject<MemUsageContract[]>();

  memUsage: Observable<MemUsageContract[]> = this.memUsageChangeSource.asObservable();

  public observeMemUsage() : void {
    this.socket.on("memory", (memory) => {
      this.notifyObservers(memory);
    });
  }

  private notifyObservers(memUsageStats: Object) {
    let res: MemUsageContract;

    res = new MemUsageContract(
      memUsageStats["used"],
      memUsageStats["total"],
      memUsageStats["free"],
      memUsageStats["swapused"],
      memUsageStats["swaptotal"],
      memUsageStats["swapfree"]
    );

    this.memUsageChangeSource.next([res]);
  }
}
