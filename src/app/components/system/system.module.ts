import { NgModule } from '@angular/core';
import { SystemComponent } from './system.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [SystemComponent]
})

export class SystemModule { }
