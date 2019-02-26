var	gulp 		= require('gulp'),
	browserSync = require('browser-sync').create(),
	sass 		= require('gulp-sass'),
	notify		= require('gulp-notify'),
	plumber		= require('gulp-plumber'),
	pug			= require('gulp-pug'),
	uglify		= require('gulp-uglify'),
	svgSprite 	= require('gulp-svg-sprite'),
	svgmin		= require('gulp-svgmin'),
	cheerio 	= require('gulp-cheerio'),
	replace 	= require('gulp-replace');

gulp.task('server', ['sass', 'pug', 'uglify'], function() {
	browserSync.init({
		server: { baseDir: './dist/' }
	});
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/js/**/*.js', ['uglify']);
});

gulp.task('sass', function() {
	return gulp.src('./app/sass/styles.sass')
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('pug', function() {
	return gulp.src('./app/pug/2_pages/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'HTML',
					message: err.message
				}
			})
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream());
});

gulp.task('uglify', function() {
	return gulp.src('./app/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['server']);

gulp.task('svgSpriteBuild', function () {
	return gulp.src('./app/media/icons/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest:'../../../../app/sass/0_helpers/_sprite.scss',
							template: './app/sass/4_service/svg-template.scss'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('./dist/media/img/'));
});

gulp.task('svgSprite', ['svgSpriteBuild']);