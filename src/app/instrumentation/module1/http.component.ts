import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
	selector: 'http',
	template: 'module1/http: {{status}}'
})
export class HttpComponent implements OnInit {

	status = 'pending';

	constructor(private httpClient: HttpClient) {
	}

	ngOnInit() {

		let params = new HttpParams();
		params = params.append('param1', 'value1');
		params = params.append('param2', 'value2');

		this.httpClient.get(
				'https://www.google.com/maps/vt/pb=!1m5!1m4!1i12!2i2348!3i3123!4i128!2m2!1e1!3i748!3m9!2sen!3sus!5e1105!12m1!1e4!12m1!1e47!12m1!1e3!4e0!5m1!1e0',
				{ params, responseType: 'blob' }
			).subscribe(() => {
				this.status = 'complete';
			});

	}

}
