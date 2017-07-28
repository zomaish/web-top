import { Component, OnInit } from '@angular/core';
import { ProcesslistService } from './processlist.service';
import { Http, RequestOptions, Headers, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GridCol, GridOptions } from '../../shared/grid/grid.component';

declare let Slick;

@Component({
  selector: 'grid',
  template: '<slick-grid [columnDefinitions]="columnDefinitions" ' +
                         '[dataRows]="gridData" ' +
                         '[gridOptions]="gridOptions">' +
             '</slick-grid>',

  styleUrls: [],
  providers: [ProcesslistService]
})


export class ProcesslistComponent implements OnInit {

  grid: any;
  gridData: any;
  lastSortCol: string;
  isAsc: Boolean;
  private columnDefinitions: GridCol[];
  private gridOptions: GridOptions;


  constructor(private processlistService: ProcesslistService, private http: Http) {
    this.gridData = [];
  }

  ngOnInit() {

    var numberForatter = function(row, cell, value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let pid = {id: "pid", name: "PID", field: "pid", sortable: true};
    let user = {id: "user", name: "USER", field: "user", sortable: true};
    let virt = {id: "VIRT", name: "VIRT", field: "VIRT", sortable: true, formatter: numberForatter};
    let res = {id: "RES", name: "RES", field: "RES", sortable: true, formatter: numberForatter};
    let cpu =  {id: "CPU%", name: "CPU%", field: "CPU%", sortable: true};
    let mem = {id: "MEM%", name: "MEM%", field: "MEM%", sortable: true};
    let started = {id: "started", name: "Started", field: "started", sortable: true};
    let command = {id: "command", name: "Command", field: "command", sortable: true, width: 160};
    let nice = {id: "nice", name: "Nice", field: "nice", sortable: true};

    this.columnDefinitions = [
      pid, user, virt, res, cpu, mem, started, command, nice
    ];
    this.gridOptions = {
      enableCellNavigation: true,
      enableColumnReorder: false
    };

    this.processlistService.processlist.subscribe((processlist: Object[]) => {
      this.gridData = processlist;
    });

    this.processlistService.observeProcesslist();
  }
}
