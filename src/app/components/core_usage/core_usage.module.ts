import { NgModule } from '@angular/core';
import { CoreUsageComponent } from './core_usage.component';
import { UsageBarModule } from '../../shared/usage_bar/usage_bar.module'
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CoreUsageComponent
  ],
  imports: [
    CommonModule,
    UsageBarModule
  ],
  exports: [CoreUsageComponent]
})

export class CoreUsageModule { }
