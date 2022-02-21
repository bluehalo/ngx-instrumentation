import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';

import { InstrumentationModule } from '../../../projects/ngx-instrumentation/src/lib/instrumentation.module';
import { InstrumentErrorHandler } from '../../../projects/ngx-instrumentation/src/lib/integrations/instrument-error-handler';
import { InstrumentHttpInterceptor } from '../../../projects/ngx-instrumentation/src/lib/integrations/instrument-http-interceptor';
import { ServerInstrumentationService } from '../../../projects/ngx-instrumentation/src/lib/server-instrumentation.service';
import { InstrumentationService } from '../../../projects/ngx-instrumentation/src/lib/instrumentation.service';

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
		{ provide: ErrorHandler, useFactory: errorHandlerFactory, deps: [ InstrumentationService ] },
		{ provide: HTTP_INTERCEPTORS, useClass: InstrumentHttpInterceptor, multi: true }
	]
})
export class InstrumentationDemoModule { }

export function serverInstrumentationServiceFactory(httpBackend: HttpBackend) {
	const svc = new ServerInstrumentationService(httpBackend);
	svc.url = '/api/metrics';

	return svc;
}

export function errorHandlerFactory(instrumentationService: InstrumentationService) {
	const handler = new InstrumentErrorHandler(instrumentationService);
	handler.logErrorsToConsole = true;

	return handler;
}
