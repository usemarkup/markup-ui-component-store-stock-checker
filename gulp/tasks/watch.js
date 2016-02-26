var gulp = require('gulp');

gulp.task('watch', ['setWatch','browserSync'], function() {
	gulp.watch('src/styles/**', ['styles']);
	// Note: The browserify task handles js recompiling with watchify
});
