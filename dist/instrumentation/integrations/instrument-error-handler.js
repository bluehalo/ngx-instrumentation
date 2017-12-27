import { ErrorHandler, Injectable } from '@angular/core';
import { InstrumentationService } from '../instrumentation.service';
/**
 * Error Handler that passes errors to the instrumentation service implementation
 * that is injected. This handler will merely pass through the message and stack.
 */
var InstrumentErrorHandler = /** @class */ (function () {
    function InstrumentErrorHandler(instrumentationService) {
        // Nothing here
        this.instrumentationService = instrumentationService;
    }
    InstrumentErrorHandler.prototype.handleError = function (error) {
        if (null != error) {
            // Call the instrumentation service to handle the error event
            this.instrumentationService.handleEvent({
                message: error.message,
                stack: error.stack
            }, 'error');
        }
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