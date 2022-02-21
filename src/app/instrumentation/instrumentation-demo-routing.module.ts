import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';
import { Module1Component } from './module1/module1.component';
import { ErrorComponent } from './module1/error.component';
import { HttpComponent } from './module1/http.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'default'
			},
			{
				path: 'default',
				component: DefaultComponent
			},
			{
				path: 'param/:param',
				component: Module1Component
			},
			{
				path: 'error',
				component: ErrorComponent
			},
			{
				path: 'http',
				component: HttpComponent
			}

		], { useHash: true })
	],
	exports: [
		RouterModule
	]
})
export class InstrumentationDemoRoutingModule { }
