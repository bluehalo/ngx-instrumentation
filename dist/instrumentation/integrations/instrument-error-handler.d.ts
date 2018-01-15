import { ErrorHandler } from '@angular/core';
import { InstrumentationService } from '../instrumentation.service';
/**
 * Error Handler that passes errors to the instrumentation service implementation
 * that is injected. This handler will merely pass through the message and stack.
 */
export declare class InstrumentErrorHandler implements ErrorHandler {
    private instrumentationService;
    /**
     * Determines whether or not handled errors are logged to the client
     * console in addition to being passed to the instrumentation service
     *
     * @type {boolean}
     */
    logErrorsToConsole: boolean;
    constructor(instrumentationService: InstrumentationService);
    handleError(error: Error): void;
}
