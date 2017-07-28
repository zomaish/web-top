import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChange } from '@angular/core';
declare let Slick;

export interface GridCol {
   id: string,
   name: string,
   field: string,
   sortable: boolean
}

export interface GridOptions {
  enableCellNavigation: boolean,
  enableColumnReorder: boolean
}

@Component({
  selector: 'slick-grid',
  template: '<div style="width:800px;height:500px;font-size: 12px;" id="myGrid"></div>',
  styleUrls: ['grid.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class GridComponent implements OnInit, OnChanges {

  //we can create an interface for this. but no need for this scope
  @Input() columnDefinitions: GridCol[];
  @Input() dataRows: Object[];
  @Input() gridOptions: GridOptions;

  private grid: any;
  private lastSortCol: string;
  private isAsc: Boolean;


  ngOnInit() {
    this.grid = new Slick.Grid("#myGrid", this.dataRows, this.columnDefinitions, this.gridOptions);
    this.subscribeToGridEvents();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    let dataChanges = changes['dataRows'];
    this.dataRows = dataChanges.currentValue;
    if (this.grid)
      this.sortDataAndRender();
  }

  private sortDataAndRender() {
    if(this.lastSortCol)
      this.dataRows.sort((a, b) => {
        let sign = this.isAsc ? 1 : -1;
        if (a[this.lastSortCol] === b[this.lastSortCol]) return 0;
        return (a[this.lastSortCol] > b[this.lastSortCol] ? 1 : -1) * sign;
      });

    this.grid.setData(this.dataRows);
    this.grid.invalidate();
    this.grid.render();
  }

  private subscribeToGridEvents() {
    let that = this;

    this.grid.onSort.subscribe((e, args) => {
      that.isAsc = args.sortAsc;
      that.lastSortCol = args.sortCol.field;
      that.sortDataAndRender();
    });

    this.grid.onContextMenu.subscribe((e) => {
      e.preventDefault();
      let cell = that.grid.getCellFromEvent(e);

      let pid = that.grid.getDataItem(cell.row).pid;
      // this.killProcessWith(pid);
    });

  }
}
