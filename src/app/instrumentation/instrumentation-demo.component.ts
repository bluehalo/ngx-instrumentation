import { Component } from '@angular/core';

import './instrumentation-demo.component.css';

@Component({
	selector: 'instrumentation-demo',
	templateUrl: './instrumentation-demo.component.html'
})
export class InstrumentationDemoComponent {
	param: string = 'parameter';
}
