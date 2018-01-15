import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentRouterDirective } from './integrations/instrument-router.directive';
var InstrumentationModule = /** @class */ (function () {
    function InstrumentationModule() {
    }
    InstrumentationModule.forRoot = function () {
        return { ngModule: InstrumentationModule, providers: [] };
    };
    InstrumentationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        InstrumentRouterDirective
                    ],
                    exports: [
                        InstrumentRouterDirective
                    ],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    InstrumentationModule.ctorParameters = function () { return []; };
    return InstrumentationModule;
}());
export { InstrumentationModule };
//# sourceMappingURL=instrumentation.module.js.map