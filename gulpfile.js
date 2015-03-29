var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

function pack(name){
    return gulp.src('./Movies-GES/Movies-GES.Web/app/' + name + '/app.js')
        .pipe(plugins.webpack({
		            output: {
                filename: name + '.js'
            }
		}))
        .pipe(gulp.dest('./Movies-GES/Movies-GES.Web/dist/'));
}

gulp.task('compile', function () {
    return pack('movie-management');
});

gulp.task('watch', function () {
    gulp.watch('./Movies-GES/Movies-GES.Web/app/**/*.js*', ['compile']);
});

gulp.task('default', ['compile', 'watch']);
