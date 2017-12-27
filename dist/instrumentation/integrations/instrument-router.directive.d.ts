import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { InstrumentationService } from '../instrumentation.service';
/**
 * Directive that will log all router events. Handles success and error.
 * Currently ignores Cancel events. For each handled event, will pass
 * the last successful event as previous and the current event as current.
 * Also, extracts the router state to include route params and urls.
 */
export declare class InstrumentRouterDirective implements OnDestroy, OnInit {
    private router;
    private instrumentationService;
    routerEventSubscription: Subscription;
    constructor(router: Router, instrumentationService: InstrumentationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected extractNavigationErrorInfo(event: NavigationError): any;
    protected extractNavigationEndInfo(event: NavigationEnd | null): any;
    protected extractActivatedRouteSnapshot(snapshot: ActivatedRouteSnapshot, max?: number): any;
}
