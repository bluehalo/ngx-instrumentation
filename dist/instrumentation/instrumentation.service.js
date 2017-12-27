/**
 * Default basic instrumentation service, logs events to console.
 */
var /**
 * Default basic instrumentation service, logs events to console.
 */
InstrumentationService = /** @class */ (function () {
    function InstrumentationService() {
    }
    InstrumentationService.prototype.handleEvent = function (event, type) {
        // tslint:disable-next-line
        console.log({ event: event, type: type });
    };
    return InstrumentationService;
}());
/**
 * Default basic instrumentation service, logs events to console.
 */
export { InstrumentationService };
//# sourceMappingURL=instrumentation.service.js.map