import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CoreHistoryComponent } from './components/core_history/core_history.component';
import { CoreHistoryModule } from './components/core_history/core_history.module';
import { CoreHistoryService } from './shared/core_history.service';
import { CoreUsageService } from './shared/core_usage.service';
import { HomeModule } from './components/home/home.module';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Web Top' }
  },
  {
    path: 'history',
    component: CoreHistoryComponent,
    data: { title: 'Core History' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    HomeModule,
    CoreHistoryModule
  ],
  providers: [
    CoreHistoryService,
    CoreUsageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
