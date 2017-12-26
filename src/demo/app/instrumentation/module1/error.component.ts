import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'error',
	template: 'module1/error'
})
export class ErrorComponent implements OnInit {

	ngOnInit() {
		throw new Error('Awww, I failed!');
	}

}
