import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Module1Component } from './module1.component';
import { HttpComponent } from './http.component';
import { ErrorComponent } from './error.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		Module1Component,
		HttpComponent,
		ErrorComponent
	],
	exports: [
		Module1Component,
		HttpComponent,
		ErrorComponent
	]
})
export class Module1Module { }
