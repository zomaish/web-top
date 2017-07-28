import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class CoreHistoryContract {
  constructor(public insertTime: Number, public coreHistory: Number[]){}
}

@Injectable()
export class CoreHistoryService  {
  constructor() {}

  // Observable coreHistory source
  private coreHistoryChangeSource: Subject<CoreHistoryContract[]> = new Subject<CoreHistoryContract[]>();
  coreHistory: Observable<CoreHistoryContract[]> = this.coreHistoryChangeSource.asObservable();

  private allCors: CoreHistoryContract[] = [];
  private currentIdx = 0;
  public totalSegments = 30;
  public numberOfCores = 0;

  public updateHistory(coresLoad) {
    if (this.currentIdx === this.totalSegments)
      this.currentIdx = 0;

    this.numberOfCores = coresLoad.length;
    this.allCors[this.currentIdx++] = new CoreHistoryContract(Date.now(), coresLoad);
    this.notifyObservers();
  }

  private notifyObservers() {
    //return a copy since we will be updating this array
    const sortedHistory = this.allCors.slice(this.currentIdx).concat(this.allCors.slice(0, this.currentIdx))
    this.coreHistoryChangeSource.next(sortedHistory);
  }
}
