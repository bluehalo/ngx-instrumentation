import { ErrorHandler, Injectable } from '@angular/core';
import { InstrumentationService } from '../instrumentation.service';
/**
 * Error Handler that passes errors to the instrumentation service implementation
 * that is injected. This handler will merely pass through the message and stack.
 */
var InstrumentErrorHandler = /** @class */ (function () {
    function InstrumentErrorHandler(instrumentationService, logErrorsToConsole) {
        if (logErrorsToConsole === void 0) { logErrorsToConsole = false; }
        // Nothing here
        this.instrumentationService = instrumentationService;
        this.logErrorsToConsole = logErrorsToConsole;
    }
    InstrumentErrorHandler.prototype.handleError = function (error) {
        if (null != error) {
            // Log errors to console
            if (this.logErrorsToConsole) {
                // tslint:disable-next-line:no-console
                console.error(error);
            }
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
        null,
    ]; };
    return InstrumentErrorHandler;
}());
export { InstrumentErrorHandler };
//# sourceMappingURL=instrument-error-handler.js.map