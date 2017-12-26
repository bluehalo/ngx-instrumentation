import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';

import { InstrumentationModule } from '../../../instrumentation/instrumentation.module';
import { InstrumentErrorHandler } from '../../../instrumentation/integrations/instrument-error-handler';
import { InstrumentHttpInterceptor } from '../../../instrumentation/integrations/instrument-http-interceptor';
import { ServerInstrumentationService } from '../../../instrumentation/server-instrumentation.service';
import { InstrumentationService } from '../../../instrumentation/instrumentation.service';

import { InstrumentationDemoRoutingModule } from './instrumentation-demo-routing.module';
import { Module1Module } from './module1/module1.module';
import { Module2Module } from './module2/module2.module';

import { InstrumentationDemoComponent } from './instrumentation-demo.component';
import { DefaultComponent } from './default.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule,

		InstrumentationModule,

		InstrumentationDemoRoutingModule,
		Module1Module,
		Module2Module
	],
	declarations: [
		InstrumentationDemoComponent,
		DefaultComponent
	],
	exports: [
		InstrumentationDemoComponent
	],
	providers: [
		HttpClient,
		{ provide: InstrumentationService, useFactory: serverInstrumentationServiceFactory, deps: [ HttpBackend ] },
		{ provide: ErrorHandler, useClass: InstrumentErrorHandler },
		{ provide: HTTP_INTERCEPTORS, useClass: InstrumentHttpInterceptor, multi: true }
	]
})
export class InstrumentationDemoModule { }

export function serverInstrumentationServiceFactory(httpBackend: HttpBackend) {
	return new ServerInstrumentationService(httpBackend, '/api/metrics');
}
