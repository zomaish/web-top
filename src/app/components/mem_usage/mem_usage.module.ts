import { NgModule } from '@angular/core';
import { MemUsageComponent } from './mem_usage.component';
import { UsageBarModule } from '../../shared/usage_bar/usage_bar.module'
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MemUsageComponent
  ],
  imports: [
    CommonModule,
    UsageBarModule
  ],
  exports: [MemUsageComponent]
})

export class MemUsageModule { }
