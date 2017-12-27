import { InstrumentationService } from './instrumentation.service';
import { HttpBackend } from '@angular/common/http';
/**
 * Basic server logging for instrumentation service. Passes events as HTTP POST to
 * configured server endpoint. Uses the HttpBackend to avoid HTTPInterceptors.
 *
 * The format of the object passed to the server is:
 * {
 *    type: string,
 *    ts: number,
 *    clientSessionId: string,
 *    event: any
 * }
 */
export declare class ServerInstrumentationService implements InstrumentationService {
    private httpBackend;
    private url;
    sessionId: string;
    constructor(httpBackend: HttpBackend, url?: string);
    /**
     * The URL of the server endpoint to which to POST events
     * @param {string} url
     */
    setUrl(url: string): void;
    /**
     * Handle instrumentation events.
     * @param event The event to handle
     * @param {string} type The type of event to handle
     */
    handleEvent(event: any, type: string): void;
}
