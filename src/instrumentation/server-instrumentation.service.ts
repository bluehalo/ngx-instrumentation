import { InstrumentationService } from './instrumentation.service';
import { Guid } from './guid';
import { HttpBackend, HttpRequest } from '@angular/common/http';

/**
 * Basic server logging for instrumentation service. Passes events as HTTP POST to
 * configured server endpoint. Uses the HttpBackend to avoid HTTPInterceptors.
 *
 * The format of the object passed to the server is:
 * {
 *    type: string,
 *    ts: number,
 *    clientSessionId: string,
 *    event: any
 * }
 */
export class ServerInstrumentationService implements InstrumentationService {

	// simple uuid that represents the current browser tab/session
	sessionId = Guid.guid();

	constructor(private httpBackend: HttpBackend, private url: string = '/api/metrics') {
		// Nothing here
	}

	/**
	 * The URL of the server endpoint to which to POST events
	 * @param {string} url
	 */
	setUrl(url: string) {
		this.url = url;
	}

	/**
	 * Handle instrumentation events.
	 * @param event The event to handle
	 * @param {string} type The type of event to handle
	 */
	handleEvent(event: any, type: string) {

		const e = {
			type,
			ts: Date.now(),
			clientSessionId: this.sessionId,
			event
		};

		const request = new HttpRequest('POST', this.url, e);

		// Send to server
		this.httpBackend.handle(request).subscribe(
			() => {
				// Don't need to do anything on success
			},
			(error: Error) => {
				// Just log to console on error
				// tslint:disable-next-line
				console.error(error);
			});

	}

}
