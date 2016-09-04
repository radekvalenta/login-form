'use strict';

/* eslint-disable no-console */

const gulp = require('gulp');
const connect = require('gulp-connect'); // local server
const open = require('gulp-open'); // auto open URl in browser
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const vinyl = require('vinyl-source-stream');
const babelify = require('babelify'); // transforms ES6 to ES5
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const config = {
	port: 	8080,
	devURL: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		sass: './src/scss/**/*.scss',
		dist: './dist',
		mainJS: './src/main.js'
	}
};

gulp.task('apply-node-env', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
});

// start local dev server
gulp.task('server', () => {
	connect.server({
		root: 		['dist'],
		port: 		config.port,
		base: 		config.devURL,
		livereload: true
	});
});

gulp.task('open', ['server'], () => {
	gulp.src('dist/index.html')
		.pipe(open({
			uri: config.devURL + ':' + config.port + '/'
		}));
});

gulp.task('html', () => {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('sass', () => {
	gulp.src(config.paths.sass)
		.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('js', () => {
	browserify(config.paths.mainJS)
		.transform(babelify, {presets: ['es2015', 'react']})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(vinyl('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('lint', () => {
  return gulp.src(config.paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.sass, ['sass']);
	gulp.watch(config.paths.js, ['apply-node-env', 'js']);
});

gulp.task('default', ['html', 'sass', 'apply-node-env', 'js', 'open', 'watch']);
