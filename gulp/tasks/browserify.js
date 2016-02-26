/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var browserSync  = require('browser-sync');

gulp.task('browserify', function() {

	var bundler = browserify({
		// Required watchify args
		cache: {}, packageCache: {}, fullPaths: true,
		// Browserify Options
		// Specify the entry point of your app
		entries: ['./src/js/index.js'],
		extensions: ['.js'],
		debug: true
	});

	var bundle = function() {
		// Log when bundling starts
		bundleLogger.start();

		return bundler
			.bundle()
			.on('error', handleErrors)
			// Use vinyl-source-stream to make the
			// stream gulp compatible. Specify the
			// desired output filename here.
			.pipe(source('main.js'))
			.pipe(gulp.dest('./build/'))
			.pipe(browserSync.stream())
			.on('end', bundleLogger.end);
	};

	if(global.isWatching) {
		bundler = watchify(bundler);
		bundler.on('update', bundle);
	}

	return bundle();
});
