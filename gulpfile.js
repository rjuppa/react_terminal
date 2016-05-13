"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');			// run local server
var open = require('gulp-open');				// open web browser
var browserify = require('browserify');			// bundle js
var reactify = require('reactify');				// JSX to js
var source = require('vinyl-source-stream');	// needs Gulp
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');

var config = {
	port: 3000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/*.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.css',
            'node_modules/toastr/build/toastr.css',
			'./src/terminal.css'
		],
        images: './src/images/*',
		dist: './dist',
		mainJs: './src/main.js'
	}
};


gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('flask', shell.task([
  'python server.py'
]));

gulp.task('open', [], function(){
	gulp.src('dist/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function(){
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src(config.paths.css)
		//.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('images', function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(eslint({'config': 'eslint.config.json'}))
		.pipe(eslint.format());
});


gulp.task('watch', function(){
    console.log('----watch----');
	gulp.watch(config.paths.html, ['html']);
	gulp.watch('./src/{,**/}*.js', ['lint', 'js']);
});

gulp.task('default', ['html', 'js', 'lint', 'css', 'images', 'open', 'watch']);

