import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MemUsageContract, MemUsageService } from './mem_usage.service';
import { UsageBar } from '../../shared/usage_bar/usage_bar.component';

@Component({
  selector: 'memory-usage',
  templateUrl: './mem_usage.component.html',
  styleUrls: ['mem_usage.component.css'],
  providers: [ MemUsageService ],
  encapsulation: ViewEncapsulation.None
})

export class MemUsageComponent implements OnInit {

  mems: UsageBar[];

  constructor(private memUsageService: MemUsageService) {}

  ngOnInit() {
    this.memUsageService.memUsage.subscribe((memUsage: MemUsageContract[]) => {
      this.mems = new Array(2);
      memUsage.forEach((mem) => {

        const memUsed = this.bytesToSize(mem["used"]);
        const memTotal = this.bytesToSize(mem["total"]);

        const numberOfPipes = new Array(((+mem["used"]/+mem["total"])*100)|0);
        numberOfPipes.map((x,i)=>i);
        const usedLoad = memUsed.size + memUsed.label + "/" + memTotal.size + memTotal.label;


        const swpUsed = this.bytesToSize(mem["swapused"]);
        const swpTotal = this.bytesToSize(mem["swaptotal"]);

        const swpPipes = new Array(((+mem["swapused"]/+mem["swaptotal"])*100)|0);
        swpPipes.map((x,i)=>i);
        const swpLoad = swpUsed.size + swpUsed.label + "/" + swpTotal.size + swpTotal.label;

        this.mems[0] = new UsageBar('Mem', usedLoad, numberOfPipes);
        this.mems[1] = new UsageBar('Swp', swpLoad, swpPipes);
      });
    });

    this.memUsageService.observeMemUsage();
  }

  private bytesToSize(bytes) {
    const sizes = ['Bytes', 'K', 'M', 'G', 'T'];
    const ret = {
      size: 0,
      label: sizes[0]
    };
    if (bytes == 0) return ret;
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    ret.size = +(bytes / Math.pow(1024, i)).toFixed(2);
    ret.label = sizes[i];

    return ret;
  };

}
