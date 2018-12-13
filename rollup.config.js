'use strict';

const pkg = require('./package.json');

export default {
	input: 'dist/index.js',
	external: [
		'@angular/core',
		'@angular/common',
		'@angular/common/http',
		'@angular/router',
		'rxjs',
		'rxjs/operators'
	],
	output: {
		banner: `/*! ${pkg.name} - ${pkg.version} - ${pkg.copyright} + */`,
		file: `./dist/bundles/${pkg.artifactName}.js`,
		format: 'umd',
		globals: {
			'@angular/core': 'ng.core',
			'@angular/common': 'ng.common',
			'@angular/common/http': 'ng.common.http',
			'@angular/router': 'ng.router',
			'rxjs': 'Rx',
			'rxjs/operators': 'Rx.operators'
		},
		name: pkg.moduleName,
		sourcemap: true,
	},
	onwarn: ( warning, next ) => {
		if ( warning.code === 'THIS_IS_UNDEFINED' ) {
			return;
		}
		next( warning );
	}
};
