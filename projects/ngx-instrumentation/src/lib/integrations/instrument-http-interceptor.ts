import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { InstrumentationService } from '../instrumentation.service';

/**
 * HTTP Interceptor that till pass HTTP calls, their data, and associated performance metrics
 * to the Instrumentation Service. Calculated start/finish/elapsed time for calls and includes
 * the request information as well as response status.
 */
@Injectable()
export class InstrumentHttpInterceptor implements HttpInterceptor {

	public includeParams: boolean = false;

	constructor(private instrumentationService: InstrumentationService) {
		// Nothing here
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		// Store the request start time
		const started = Date.now();

		return next.handle(req)
			.pipe(tap((res) => {

				if (res instanceof HttpResponse) {

					// Grab the finish time
					const finished = Date.now();

					const event: any = {
						started,
						finished,
						elapsed: finished - started,

						method: req.method,
						url: req.url,

						status: (res as HttpResponse<any>).status
					};

					if (this.includeParams) {
						event.body = req.body;
						event.params = this.extractParams(req.params);
					}

					// Pass the complete event to the instrumentation service
					this.instrumentationService.handleEvent(event, 'http');

				}

			}));

	}

	/**
	 * Convert HttpParams to a map of literal values
	 * @param {HttpParams} params
	 * @returns {any} Map of key to array of literal values
	 */
	extractParams(params: HttpParams) {

		const toReturn: any = {};

		if (null != params) {
			params.keys().forEach((k) => {
				toReturn[k] = params.getAll(k);
			});
		}

		return toReturn;

	}
}
