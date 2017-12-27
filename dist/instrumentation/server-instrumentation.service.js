import { InstrumentationService } from './instrumentation.service';
import { Guid } from './guid';
import { HttpBackend, HttpRequest } from '@angular/common/http';
var ServerInstrumentationService = /** @class */ (function () {
    function ServerInstrumentationService(httpBackend, url) {
        if (url === void 0) { url = '/api/metrics'; }
        // Nothing here
        this.httpBackend = httpBackend;
        this.url = url;
        // simple uuid
        this.sessionId = Guid.guid();
    }
    ServerInstrumentationService.prototype.setUrl = function (url) {
        this.url = url;
    };
    ServerInstrumentationService.prototype.handleEvent = function (event, type) {
        var e = {
            type: type,
            ts: Date.now(),
            clientSessionId: this.sessionId,
            event: event
        };
        var request = new HttpRequest('POST', this.url, e);
        // Send to server
        this.httpBackend.handle(request).subscribe();
    };
    return ServerInstrumentationService;
}());
export { ServerInstrumentationService };
//# sourceMappingURL=server-instrumentation.service.js.map