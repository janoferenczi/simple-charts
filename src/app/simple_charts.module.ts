import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SimplePieChartComponent } from './simple-pie-chart/simple-pie-chart.component';
import { SimpleBarChartComponent } from './simple-bar-chart/simple-bar-chart.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    SimplePieChartComponent,
    SimpleBarChartComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class SimpleChartsModule { }
