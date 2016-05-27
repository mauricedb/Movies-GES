var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

function pack(name){
    return gulp.src('./' + name + '/app.js')
        .pipe(plugins.webpack({
            output: {
                filename: name + '.js'
            }
		}))
        .pipe(gulp.dest('../../Dist/Angular1'));
}

gulp.task('jshint', function () {
    var input = ['./**/*.js', '!./node_modules/**//*.js', '!gulpfile.js'];
    return gulp.src(input)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

gulp.task('compile-director', function () {
    return pack('director-management');
});

gulp.task('compile-movie', function () {
    return pack('movie-management');
});

gulp.task('compile', ['compile-movie','compile-director']);

gulp.task('watch', function () {
    gulp.watch('./**/*.js', ['compile', 'jshint']);
});

gulp.task('default', ['compile', 'jshint', 'watch']);
