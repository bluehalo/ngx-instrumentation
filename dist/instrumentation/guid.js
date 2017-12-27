/**
 * Basic implementation of a pseudo-random GUID
 */
var /**
 * Basic implementation of a pseudo-random GUID
 */
Guid = /** @class */ (function () {
    function Guid() {
    }
    // Generate a pseudo-random GUID
    // Generate a pseudo-random GUID
    Guid.s4 = 
    // Generate a pseudo-random GUID
    function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    Guid.guid = function () {
        return Guid.s4() + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + Guid.s4() + Guid.s4();
    };
    return Guid;
}());
/**
 * Basic implementation of a pseudo-random GUID
 */
export { Guid };
//# sourceMappingURL=guid.js.map