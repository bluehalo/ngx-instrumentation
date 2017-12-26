import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { InstrumentationService } from '../instrumentation.service';

@Injectable()
export class InstrumentHttpInterceptor implements HttpInterceptor {

	constructor(private instrumentationService: InstrumentationService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const started = Date.now();

		return next.handle(req)
			.do((res) => {

				if (res instanceof HttpResponse) {
					const finished = Date.now();

					const event = {
						started,
						finished,
						elapsed: finished - started,

						method: req.method,
						url: req.url,
						body: req.body,
						params: this.extractParams(req.params),

						status: (res as HttpResponse<any>).status
					};

					this.instrumentationService.handleEvent(event, 'http');

				}

			});

	}

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
