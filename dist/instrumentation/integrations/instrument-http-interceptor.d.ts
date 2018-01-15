import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { InstrumentationService } from '../instrumentation.service';
/**
 * HTTP Interceptor that till pass HTTP calls, their data, and associated performance metrics
 * to the Instrumentation Service. Calculated start/finish/elapsed time for calls and includes
 * the request information as well as response status.
 */
export declare class InstrumentHttpInterceptor implements HttpInterceptor {
    private instrumentationService;
    includeParams: boolean;
    constructor(instrumentationService: InstrumentationService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    /**
     * Convert HttpParams to a map of literal values
     * @param {HttpParams} params
     * @returns {any} Map of key to array of literal values
     */
    extractParams(params: HttpParams): any;
}
