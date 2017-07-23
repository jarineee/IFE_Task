/*
* @Author: VicyE
* @Date:   2017-07-23 16:09:01
* @Last Modified by:   VicyE
* @Last Modified time: 2017-07-23 17:26:27
*/

'use strict';
var gulp = require('gulp'),
	rev = require('gulp-rev-append');


gulp.task('dist', function(){
	gulp.src('./css/*.css')
		.pipe(gulp.dest('./dist/css'));
	gulp.src('./js/*.js')
		.pipe(gulp.dest('./dist/js'));
	gulp.src('./*.html')
		.pipe(rev())
		.pipe(gulp.dest('./dist'));
	gulp.src('./libs/**/*.*')
		.pipe(gulp.dest('./dist/libs'));
});

gulp.task('noderef', function(){
	gulp.src('./node_modules/angular/angular.min.js')
		.pipe(gulp.dest('./libs/angular'));
	gulp.src('./node_modules/todomvc-common/*.css')
		.pipe(gulp.dest('./libs/todomvc-common'));
	gulp.src('./node_modules/todomvc-app-css/*.css')
		.pipe(gulp.dest('./libs/todomvc-app-css'));
});