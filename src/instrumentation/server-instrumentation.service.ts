import { InstrumentationService } from './instrumentation.service';
import { Guid } from './guid';
import { HttpBackend, HttpRequest } from '@angular/common/http';

export class ServerInstrumentationService implements InstrumentationService {

	// simple uuid
	sessionId = Guid.guid();

	constructor(private httpBackend: HttpBackend, private url: string = '/api/metrics') {
		// Nothing here
	}

	setUrl(url: string) {
		this.url = url;
	}

	handleEvent(event: any, type: string) {

		const e = {
			type,
			ts: Date.now(),
			clientSessionId: this.sessionId,
			event
		};

		const request = new HttpRequest('POST', this.url, e);

		// Send to server
		this.httpBackend.handle(request).subscribe();

	}

}
