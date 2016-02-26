var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var live = false;

gulp.task('styles', function() {
    gulp.src('./src/styles/markup-ui-component-store-stock-checker.scss')
        .pipe($.if(!live, $.newer('./src/styles/*.scss')))
        .pipe($.if(!live, $.sourcemaps.init()))
        .pipe($.sass({
                sourceMap: true
            })
            .on('error', function(err) {
                $.util.log('Sass error: ', $.util.colors.red(err.message));
                $.util.beep();
                this.emit('end');
            }))
        .pipe($.if(!live, $.sourcemaps.write()))
        .pipe($.if(live, $.cssnano()))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});
