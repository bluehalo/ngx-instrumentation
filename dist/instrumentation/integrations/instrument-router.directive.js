import { Directive } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { InstrumentationService } from '../instrumentation.service';
/**
 * Directive that will log all router events. Handles success and error.
 * Currently ignores Cancel events. For each handled event, will pass
 * the last successful event as previous and the current event as current.
 * Also, extracts the router state to include route params and urls.
 */
var InstrumentRouterDirective = /** @class */ (function () {
    function InstrumentRouterDirective(router, instrumentationService) {
        // Nothing here
        this.router = router;
        this.instrumentationService = instrumentationService;
    }
    InstrumentRouterDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Store the previous event
        var previous = null;
        // Subscribe to router events
        this.routerEventSubscription = this.router.events.subscribe(function (current) {
            var routerState = _this.router.routerState;
            var event = {
                type: null
            };
            // Process the ways a navigation can end
            if (current instanceof NavigationEnd) {
                // Successful navigation, log and store the current state as the previous
                event.type = 'success';
                event.current = _this.extractNavigationEndInfo(current);
                event.previous = _this.extractNavigationEndInfo(previous);
                previous = current;
            }
            else if (current instanceof NavigationError) {
                // Error navigation, so assume route didn't change
                event.type = 'error';
                // Current in this case is a Navigation Error event
                event.current = _this.extractNavigationErrorInfo(current);
                // Previous is always a Navigation End event
                event.previous = _this.extractNavigationEndInfo(previous);
            }
            else if (current instanceof NavigationCancel) {
                // Navigation cancel is if a guard cancels a route change
                // event.type = 'cancel';
            }
            // Only if it was a recognized navigation event type
            if (null != event.type) {
                // Construct the route snapshot
                var activatedRouteSnapshot = null;
                if (null != routerState && null != routerState.snapshot) {
                    activatedRouteSnapshot = routerState.snapshot.root;
                }
                event.activatedRouteSnapshot = _this.extractActivatedRouteSnapshot(activatedRouteSnapshot);
                _this.instrumentationService.handleEvent(event, 'route');
            }
        });
    };
    InstrumentRouterDirective.prototype.ngOnDestroy = function () {
        this.routerEventSubscription.unsubscribe();
    };
    InstrumentRouterDirective.prototype.extractNavigationErrorInfo = function (event) {
        return {
            id: event.id,
            url: event.url,
            error: {
                message: (null != event.error) ? event.error.message : '',
                stack: (null != event.error) ? event.error.stack : ''
            }
        };
    };
    InstrumentRouterDirective.prototype.extractNavigationEndInfo = function (event) {
        if (null == event) {
            return null;
        }
        return {
            id: event.id,
            url: event.url,
            urlAfterRedirects: event.urlAfterRedirects
        };
    };
    InstrumentRouterDirective.prototype.extractActivatedRouteSnapshot = function (snapshot, max) {
        var _this = this;
        if (max === void 0) { max = 20; }
        var toReturn = {};
        // Get the child snapshots
        if (null != snapshot.children) {
            // Only keep going if we haven't exceeded the max levels
            if (max > 0) {
                toReturn.children = snapshot.children.map(function (c) { return _this.extractActivatedRouteSnapshot(c, max--); });
            }
            else {
                toReturn.children = [];
            }
        }
        // Get the component name (if it exists)
        if (null != snapshot.component) {
            toReturn.component = snapshot.component.name;
        }
        if (null != snapshot.url) {
            toReturn.url = snapshot.url;
        }
        if (null != snapshot.params) {
            toReturn.params = snapshot.params;
        }
        if (null != snapshot.queryParams) {
            toReturn.queryParams = snapshot.queryParams;
        }
        return toReturn;
    };
    InstrumentRouterDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'routerInstrumentation'
                },] },
    ];
    /** @nocollapse */
    InstrumentRouterDirective.ctorParameters = function () { return [
        { type: Router, },
        { type: InstrumentationService, },
    ]; };
    return InstrumentRouterDirective;
}());
export { InstrumentRouterDirective };
//# sourceMappingURL=instrument-router.directive.js.map