var Guid = /** @class */ (function () {
    function Guid() {
    }
    Guid.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    Guid.guid = function () {
        return Guid.s4() + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + Guid.s4() + Guid.s4();
    };
    return Guid;
}());
export { Guid };
//# sourceMappingURL=guid.js.map