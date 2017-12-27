/**
 * Default basic instrumentation service, logs events to console.
 */
export class InstrumentationService {

	handleEvent(event: any, type: string) {

		// tslint:disable-next-line
		console.log({ event, type });

	}

}
