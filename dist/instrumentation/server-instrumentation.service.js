import { Guid } from './guid';
import { HttpRequest } from '@angular/common/http';
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
    function ServerInstrumentationService(httpBackend) {
        // Nothing here
        this.httpBackend = httpBackend;
        /**
             * Determines the URL of the server instrumentation service endpoint
             * @type {string}
             */
        this.url = '/api/metrics';
        // simple uuid that represents the current browser tab/session
        this.sessionId = Guid.guid();
    }
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