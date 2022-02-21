import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Module2RoutingModule } from './module2-routing.module';

import { Module2Component } from './module2.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		Module2RoutingModule,
	],
	declarations: [
		Module2Component
	],
	exports: [
	]
})
export class Module2Module { }
