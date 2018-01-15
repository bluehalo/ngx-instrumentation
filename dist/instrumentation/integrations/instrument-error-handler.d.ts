import { ErrorHandler } from '@angular/core';
import { InstrumentationService } from '../instrumentation.service';
/**
 * Error Handler that passes errors to the instrumentation service implementation
 * that is injected. This handler will merely pass through the message and stack.
 */
export declare class InstrumentErrorHandler implements ErrorHandler {
    private instrumentationService;
    logErrorsToConsole: boolean;
    constructor(instrumentationService: InstrumentationService, logErrorsToConsole?: boolean);
    handleError(error: Error): void;
}
