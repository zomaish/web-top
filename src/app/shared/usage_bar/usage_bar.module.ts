import { NgModule } from '@angular/core';
import { UsagebarComponent } from './usage_bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UsagebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [UsagebarComponent]
})

export class UsageBarModule { }
