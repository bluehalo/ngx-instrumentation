import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Event, NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import { InstrumentationService } from '../instrumentation.service';

@Directive({
	selector: 'routerInstrumentation'
})
export class InstrumentRouterDirective implements OnDestroy, OnInit {

	routerEventSubscription: Subscription;

	constructor(
		private router: Router,
		private instrumentationService: InstrumentationService) { }

	ngOnInit() {

		// Store the previous event
		let previous: Event = null;

		// Subscribe to router events
		this.routerEventSubscription = this.router.events.subscribe((current: Event) => {

			const routerState = this.router.routerState;

			const event: any = {
				type: null
			};

			// Process the ways a navigation can end
			if (current instanceof NavigationEnd) {

				// Successful navigation, log and store the current state as the previous
				event.type = 'success';

				event.current = this.extractNavigationEndInfo(current as NavigationEnd);
				event.previous = this.extractNavigationEndInfo(previous as NavigationEnd);

				previous = current;

			}
			else if (current instanceof NavigationError) {

				// Error navigation, so assume route didn't change
				event.type = 'error';

				event.current = this.extractNavigationErrorInfo(current as NavigationError);
				event.previous = this.extractNavigationErrorInfo(previous as NavigationError);

			}
			else if (current instanceof NavigationCancel) {

				// Navigation cancel is if a guard cancels a route change
				// event.type = 'cancel';

			}

			if (null != event.type) {

				let activatedRouteSnapshot = null;
				if (null != routerState && null != routerState.snapshot) {
					activatedRouteSnapshot = routerState.snapshot.root;
				}

				event.activatedRouteSnapshot = this.extractActivatedRouteSnapshot(activatedRouteSnapshot);
				this.instrumentationService.handleEvent(event, 'route');

			}

		});
	}

	ngOnDestroy() {
		this.routerEventSubscription.unsubscribe();
	}

	protected extractNavigationErrorInfo(event: NavigationError): any {

		return {
			id: event.id,
			url: event.url,
			error: event.error
		};

	}

	protected extractNavigationEndInfo(event: NavigationEnd | null): any {

		if (null == event) {
			return null;
		}

		return {
			id: event.id,
			url: event.url,
			urlAfterRedirects: event.urlAfterRedirects
		};

	}

	protected extractActivatedRouteSnapshot(snapshot: ActivatedRouteSnapshot, max: number = 0) {

		const toReturn: any = {};

		// Get the child snapshots
		if (null != snapshot.children) {
			toReturn.children = snapshot.children.map((c) => this.extractActivatedRouteSnapshot(c, max++));
		}

		// Get the component name (if it exists)
		if (null != snapshot.component) {
			toReturn.component = (snapshot.component as any).name;
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

	}

}
