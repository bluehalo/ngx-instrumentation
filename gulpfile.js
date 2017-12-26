'use strict';

let
	chalk = require('chalk'),
	glob = require('glob'),
	gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	ngc = require('@angular/compiler-cli/src/main').main,
	merge = require('merge2'),
	path = require('path'),
	rollup = require('rollup'),
	runSequence = require('run-sequence'),
	through = require('through2'),
	webpack = require('webpack'),
	webpackDevServer = require('webpack-dev-server'),

	plugins = gulpLoadPlugins(),
	pkg = require('./package.json'),
	assets = require('./config/assets');


// Banner to append to generated files
let bannerString = `/*! ${pkg.name} - ${pkg.version} - ${pkg.copyright} + */`;

/**
 * ENV Tasks
 */
let BUILD = false;
gulp.task('env:BUILD', () => {
	BUILD = true;
});


/**
 * Validation Tasks
 */

gulp.task('validate-ts', () => {

	return gulp.src(assets.src.allTs)
		// Lint the Typescript
		.pipe(plugins.tslint({
			formatter: 'prose'
		}))
		.pipe(plugins.tslint.report({
			summarizeFailureOutput: true,
			emitError: BUILD
		}));

});


/**
 * Build
 */

// Build JS from the TS source
gulp.task('build-ts', () => {
	let configPath = './tsconfig-aot.json';

	return gulp.src(configPath)
		.pipe(through.obj((file, encoding, callback) => {
			ngc([ '-p', configPath ], (error) => {
				let err = (null == error)
					? null
					: new plugins.util.PluginError(
						'ngc',
						`${plugins.util.colors.red('Compilation error.')}\nSee details in the ngc output`,
						{fileName: file.path});

				callback(err, file);
			});
		}));
});

// Bundle the generated JS (rollup and then uglify)
gulp.task('build-js', ['rollup-js'], () => {

	// Uglify
	return gulp.src(path.posix.join(assets.dist.bundleDir, `${pkg.artifactName}.js`))
		.pipe(plugins.uglify({ output: { comments: 'license' } }))
		.on('error', (err) => { plugins.util.log(plugins.util.colors.red('[Uglify]'), err.toString()); })
		.pipe(plugins.rename(pkg.artifactName + '.min.js'))
		.pipe(gulp.dest(assets.dist.bundleDir));

});

// Rollup the generated JS
gulp.task('rollup-js', () => {

	return rollup.rollup({
			input: path.posix.join(assets.dist.dir, '/index.js'),
			external: [
				'@angular/core'
			],
			onwarn: (warning) => {
				if ('THIS_IS_UNDEFINED' === warning.code) {
					return;
				}
				plugins.util.log(warning.message);
			}
		})
		.then((bundle) => {
			return bundle.write({
				file: path.posix.join(assets.dist.bundleDir, `${pkg.artifactName}.js`),
				format: 'umd',
				name: pkg.moduleName,
				sourcemap: true,
				banner: bannerString,
				globals: {
					'@angular/core': 'ng.core'
				}
			});
		});

});


/**
 * Develop
 */
gulp.task('webpack-dev-server', (done) => {
	// Start a webpack-dev-server
	let webpackConfig = require('./config/webpack.config.js')();
	let compiler = webpack(webpackConfig);
	let port = 9000;
	let serverPort = 9001;

	new webpackDevServer(compiler, {
		stats: {
			modules: false,
			colors: true
		},
		watchOptions: {
			aggregateTimeout: 500,
			poll: 1000
		},
		proxy: {
			'/api/*': {
				'target': `http://localhost:${serverPort}` ,
				'pathRewrite': {'^/api': '' },
				'secure': false,
				'logLevel': 'debug'
			}
		}
	}).listen(port, 'localhost', (err) => {
		if(err) throw new plugins.util.PluginError('webpack', err);

		// Server listening
		plugins.util.log('[webpack]', `http://localhost:${port}/webpack-dev-server/index.html`);
	});


	// Launch the dev REST server
	const app = require('express')();
	app.use(require('body-parser').json());

	app.post('/metrics', (req, res) => {
		console.log(req.body);
		return res.status(200).end();
	});

	app.listen(serverPort, () => console.log(`Metrics logging server running on port: ${serverPort}`));
});

gulp.task('watch-ts', () => {
	gulp.watch(assets.src.allTs, ['validate-ts']);
});

/**
 * --------------------------
 * Main Tasks
 * --------------------------
 */

gulp.task('dev', (done) => { runSequence('validate-ts', [ 'webpack-dev-server', 'watch-ts' ], done); } );

gulp.task('build', (done) => { runSequence('env:BUILD', 'validate-ts', 'build-ts', 'build-js', done); } );

// Default task builds
gulp.task('default', [ 'build' ]);
