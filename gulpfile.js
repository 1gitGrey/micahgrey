var gulp = require('gulp'),
       coffee = require('gulp-coffee'),
       concat = require('gulp-concat'),
       gutil = require('gulp-util'),
       compass = require('gulp-compass'),
       connect = require('gulp-connect'),
       browserify = require('gulp-browserify');

var htmlSources = ['builds/development/*.html'];

//jjvar coffeeSources = ['components/coffee/*.coffee'];
//var jsSources = ['components/scripts/rclick.js',
//		   'components/scripts/pixgrid.js',
//		   'components/scripts/tagline.js'];
var sassSources = ['components/sass/style.scss'];
var jsSources = ['components/scripts/*.js']
//gulp.task('coffee', function() {
	//jgulp.src(coffeeSources)
	//	.pipe(coffee({  bare: true  })
	//		.on('error', gutil.log))
//		.pipe(gulp.dest('components/scripts'))
	//});

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
			})
		.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'))
	.pipe(connect.reload())}
);

gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/development/js'))
	.pipe(connect.reload())
});

gulp.task('connect', function() {
	connect.server({
			root: 'builds/development/',
			livereload: true })
	});

gulp.task('watch', function() {
//	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['sass']);
	gulp.watch(htmlSources, ['html'])
	});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(connect.reload())
	})
gulp.task('build', ['js', 'sass']);

gulp.task('default', ['build', 'watch', 'connect']);
