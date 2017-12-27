import { InstrumentationService } from './instrumentation.service';
import { Guid } from './guid';
import { HttpBackend, HttpRequest } from '@angular/common/http';
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
var /**
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
ServerInstrumentationService = /** @class */ (function () {
    function ServerInstrumentationService(httpBackend, url) {
        if (url === void 0) { url = '/api/metrics'; }
        // Nothing here
        this.httpBackend = httpBackend;
        this.url = url;
        // simple uuid that represents the current browser tab/session
        this.sessionId = Guid.guid();
    }
    /**
     * The URL of the server endpoint to which to POST events
     * @param {string} url
     */
    /**
         * The URL of the server endpoint to which to POST events
         * @param {string} url
         */
    ServerInstrumentationService.prototype.setUrl = /**
         * The URL of the server endpoint to which to POST events
         * @param {string} url
         */
    function (url) {
        this.url = url;
    };
    /**
     * Handle instrumentation events.
     * @param event The event to handle
     * @param {string} type The type of event to handle
     */
    /**
         * Handle instrumentation events.
         * @param event The event to handle
         * @param {string} type The type of event to handle
         */
    ServerInstrumentationService.prototype.handleEvent = /**
         * Handle instrumentation events.
         * @param event The event to handle
         * @param {string} type The type of event to handle
         */
    function (event, type) {
        var e = {
            type: type,
            ts: Date.now(),
            clientSessionId: this.sessionId,
            event: event
        };
        var request = new HttpRequest('POST', this.url, e);
        // Send to server
        this.httpBackend.handle(request).subscribe(function () {
            // Don't need to do anything on success
        }, function (error) {
            // Just log to console on error
            // tslint:disable-next-line
            console.error(error);
        });
    };
    return ServerInstrumentationService;
}());
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
export { ServerInstrumentationService };
//# sourceMappingURL=server-instrumentation.service.js.map