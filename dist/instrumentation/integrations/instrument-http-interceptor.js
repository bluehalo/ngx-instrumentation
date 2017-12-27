import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { InstrumentationService } from '../instrumentation.service';
var InstrumentHttpInterceptor = /** @class */ (function () {
    function InstrumentHttpInterceptor(instrumentationService) {
        this.instrumentationService = instrumentationService;
    }
    InstrumentHttpInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var started = Date.now();
        return next.handle(req)
            .do(function (res) {
            if (res instanceof HttpResponse) {
                var finished = Date.now();
                var event_1 = {
                    started: started,
                    finished: finished,
                    elapsed: finished - started,
                    method: req.method,
                    url: req.url,
                    body: req.body,
                    params: _this.extractParams(req.params),
                    status: res.status
                };
                _this.instrumentationService.handleEvent(event_1, 'http');
            }
        });
    };
    InstrumentHttpInterceptor.prototype.extractParams = function (params) {
        var toReturn = {};
        if (null != params) {
            params.keys().forEach(function (k) {
                toReturn[k] = params.getAll(k);
            });
        }
        return toReturn;
    };
    InstrumentHttpInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    InstrumentHttpInterceptor.ctorParameters = function () { return [
        { type: InstrumentationService, },
    ]; };
    return InstrumentHttpInterceptor;
}());
export { InstrumentHttpInterceptor };
//# sourceMappingURL=instrument-http-interceptor.js.map