import { NgModule } from '@angular/core';
import { ProcesslistComponent } from './processlist.component';
import { GridModule } from '../../shared/grid/grid.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProcesslistComponent
  ],
  imports: [
    CommonModule,
    GridModule
  ],
  exports: [ProcesslistComponent]
})

export class ProcesslistModule { }
