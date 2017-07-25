/*
* @Author: VicyE
* @Date:   2017-07-23 16:09:01
* @Last Modified by:   VicyE
* @Last Modified time: 2017-07-24 11:53:34
*/

'use strict';
//加载nodejs插件
var gulp = require('gulp'),
	rev = require('gulp-rev-append'),
	browserSync = require('browser-sync').create();

//输出到发布目录
gulp.task('dist', function () {
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

// 依赖框架文件写入libs文件夹
gulp.task('noderef', function () {
	gulp.src('./node_modules/angular/angular.min.js')
		.pipe(gulp.dest('./libs/angular'));
	gulp.src('./node_modules/todomvc-common/*.css')
		.pipe(gulp.dest('./libs/todomvc-common'));
	gulp.src('./node_modules/todomvc-app-css/*.css')
		.pipe(gulp.dest('./libs/todomvc-app-css'));
	gulp.src('./node_modules/todomvc-common/*.js')
		.pipe(gulp.dest('./libs/todomvc-common'));
});

// browsersync创建server
gulp.task('bs-init', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

// bs插件刷新所有浏览器任务
gulp.task('bs-reload', function () {
	browserSync.reload();
});

//创建监视任务，自动刷新浏览器
var files = ['./index.html', './gulpfile.js'];
gulp.task('default', ['bs-init'],  function () {
	gulp.watch(files, ['bs-reload'])
});