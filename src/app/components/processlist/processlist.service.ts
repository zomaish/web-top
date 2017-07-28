import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProcesslistService  {

  constructor(private socket: Socket) { }

  // Observable processlist source
  private processlistChange: Subject<Object[]> = new Subject<Object[]>();

   processlist: Observable<Object[]> = this.processlistChange.asObservable();

  public observeProcesslist() : void {
    this.socket.on("processes", (processes) => {
      this.notifyObservers(processes);
    });
  }

  private notifyObservers(processlist: Object[]) {
    this.processlistChange.next(processlist);
  }
}
