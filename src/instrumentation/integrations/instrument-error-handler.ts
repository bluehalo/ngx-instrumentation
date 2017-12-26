import { ErrorHandler, Injectable } from '@angular/core';

import { InstrumentationService } from '../instrumentation.service';

@Injectable()
export class InstrumentErrorHandler implements ErrorHandler {

	constructor(private instrumentationService: InstrumentationService) {
	}

	handleError(error: Error) {

		const event: any = {};

		if (null != error) {
			event.message = error.message;
			event.stack = error.stack;
		}

		this.instrumentationService.handleEvent(event, 'error');
	}

}
