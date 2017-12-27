import { ErrorHandler } from '@angular/core';
import { InstrumentationService } from '../instrumentation.service';
export declare class InstrumentErrorHandler implements ErrorHandler {
    private instrumentationService;
    constructor(instrumentationService: InstrumentationService);
    handleError(error: Error): void;
}
