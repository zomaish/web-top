import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { CoreUsageModule } from '../core_usage/core_usage.module';
import { MemUsageModule } from '../mem_usage/mem_usage.module';
import { SystemModule } from '../system/system.module';
import { ProcesslistModule } from '../processlist/processlist.module';
import { HomeComponent } from './home.component';
import { HttpModule } from '@angular/http';

const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CoreUsageModule,
    MemUsageModule,
    SystemModule,
    ProcesslistModule,
    SocketIoModule.forRoot(config),
    HttpModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
