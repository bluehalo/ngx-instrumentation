import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRouterDirective } from './integrations/instrument-router.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		InstrumentRouterDirective
	],
	exports: [
		InstrumentRouterDirective
	],
	providers: []
})
export class InstrumentationModule {}
