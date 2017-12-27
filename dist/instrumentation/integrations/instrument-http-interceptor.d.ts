import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { InstrumentationService } from '../instrumentation.service';
export declare class InstrumentHttpInterceptor implements HttpInterceptor {
    private instrumentationService;
    constructor(instrumentationService: InstrumentationService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    extractParams(params: HttpParams): any;
}
