var gulp = require('gulp');
var eslint = require('gulp-eslint');

var live = false;

gulp.task('lint', function() {
    return gulp.src(['src/**/*.js', 'test/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        // Brick on failure to be super strict
        .pipe(eslint.failOnError());
});
