import { ErrorHandler, Injectable } from '@angular/core';

import { InstrumentationService } from '../instrumentation.service';

/**
 * Error Handler that passes errors to the instrumentation service implementation
 * that is injected. This handler will merely pass through the message and stack.
 */
@Injectable()
export class InstrumentErrorHandler implements ErrorHandler {

	constructor(private instrumentationService: InstrumentationService) {
		// Nothing here
	}

	handleError(error: Error) {

		if (null != error) {

			// Call the instrumentation service to handle the error event
			this.instrumentationService.handleEvent({
				message: error.message,
				stack: error.stack
			}, 'error');

		}

	}

}
