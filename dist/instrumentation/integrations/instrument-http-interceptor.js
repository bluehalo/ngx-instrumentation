import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { InstrumentationService } from '../instrumentation.service';
/**
 * HTTP Interceptor that till pass HTTP calls, their data, and associated performance metrics
 * to the Instrumentation Service. Calculated start/finish/elapsed time for calls and includes
 * the request information as well as response status.
 */
var InstrumentHttpInterceptor = /** @class */ (function () {
    function InstrumentHttpInterceptor(instrumentationService) {
        // Nothing here
        this.instrumentationService = instrumentationService;
        this.includeParams = false;
    }
    InstrumentHttpInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        // Store the request start time
        var started = Date.now();
        return next.handle(req)
            .do(function (res) {
            if (res instanceof HttpResponse) {
                // Grab the finish time
                var finished = Date.now();
                var event_1 = {
                    started: started,
                    finished: finished,
                    elapsed: finished - started,
                    method: req.method,
                    url: req.url,
                    status: res.status
                };
                if (_this.includeParams) {
                    event_1.body = req.body;
                    event_1.params = _this.extractParams(req.params);
                }
                // Pass the complete event to the instrumentation service
                // Pass the complete event to the instrumentation service
                _this.instrumentationService.handleEvent(event_1, 'http');
            }
        });
    };
    /**
     * Convert HttpParams to a map of literal values
     * @param {HttpParams} params
     * @returns {any} Map of key to array of literal values
     */
    /**
         * Convert HttpParams to a map of literal values
         * @param {HttpParams} params
         * @returns {any} Map of key to array of literal values
         */
    InstrumentHttpInterceptor.prototype.extractParams = /**
         * Convert HttpParams to a map of literal values
         * @param {HttpParams} params
         * @returns {any} Map of key to array of literal values
         */
    function (params) {
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