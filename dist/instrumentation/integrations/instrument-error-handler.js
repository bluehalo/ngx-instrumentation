import { ErrorHandler, Injectable } from '@angular/core';
import { InstrumentationService } from '../instrumentation.service';
var InstrumentErrorHandler = /** @class */ (function () {
    function InstrumentErrorHandler(instrumentationService) {
        this.instrumentationService = instrumentationService;
    }
    InstrumentErrorHandler.prototype.handleError = function (error) {
        var event = {};
        if (null != error) {
            event.message = error.message;
            event.stack = error.stack;
        }
        this.instrumentationService.handleEvent(event, 'error');
    };
    InstrumentErrorHandler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    InstrumentErrorHandler.ctorParameters = function () { return [
        { type: InstrumentationService, },
    ]; };
    return InstrumentErrorHandler;
}());
export { InstrumentErrorHandler };
//# sourceMappingURL=instrument-error-handler.js.map