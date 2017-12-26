import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InstrumentationDemoModule } from './instrumentation/instrumentation-demo.module';


@NgModule({
	imports: [
		BrowserModule,
		InstrumentationDemoModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ ]
})
export class AppModule { }
