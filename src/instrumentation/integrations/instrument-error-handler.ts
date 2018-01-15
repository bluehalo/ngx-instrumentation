import { ErrorHandler, Injectable } from '@angular/core';

import { InstrumentationService } from '../instrumentation.service';

/**
 * Error Handler that passes errors to the instrumentation service implementation
 * that is injected. This handler will merely pass through the message and stack.
 */
@Injectable()
export class InstrumentErrorHandler implements ErrorHandler {

	constructor(private instrumentationService: InstrumentationService, public logErrorsToConsole: boolean = true) {
		// Nothing here
	}

	handleError(error: Error) {

		if (null != error) {

			// Log errors to console
			if (this.logErrorsToConsole) {

				// tslint:disable-next-line:no-console
				console.error(error);
			}

			// Call the instrumentation service to handle the error event
			this.instrumentationService.handleEvent({
				message: error.message,
				stack: error.stack
			}, 'error');

		}

	}

}
