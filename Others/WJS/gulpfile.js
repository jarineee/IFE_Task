
'use strict';
//nodejs下加载插件require()方法；
var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	revAppend = require('gulp-rev-append');

//创建一个gulp任务。gulp.task('tskname', fn)
//1.插入bs插件 browserSync（{}）方法，传入一个对象。
//2.该对象含有server对象，server对象里面有baseDir的属性，{server：{}}
//3. 对server对象的baseDir属性进行编辑{baseDir: '项目根目录'}
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
});

//创建gulp任务2，gulp.task()
//将bower安装的框架同步到项目文件夹libs上
//1.gulp.src选择源文件路径
//2.链式编程.pipe(对文件执行的操作)，这里的操作是使用gulp.dest('输出路径')输出到终点路径，
//3.不同的source文件需要继续往下添加
gulp.task('refBowerComponents', function () {
	gulp.src('./bower_components/bootstrap/dist/fonts/*.*')
		.pipe(gulp.dest('./libraries/bootstrap/fonts'));
	gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('./libraries/bootstrap/css'));
	gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')
		.pipe(gulp.dest('./libraries/bootstrap/js'));
	gulp.src('./bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('./libraries/jquery'));
});

//创建gulp任务，用于bs的自动刷新页面功能加载
//1.调用browserSync插件的reload()方法；
gulp.task('bs-reload', function () {
	browserSync.reload();
});

//创建files数组，存储需要监视的文件列表
var files = ['./images/*.*', './scripts/*.js', './*.*', './styles/*.css', './html/*.html'];

//创建任务，监视文件列表文件一旦发生改变，就调用bs-reload方法，刷新浏览器页面
gulp.task('default', ['browser-sync'], function () {
	gulp.watch(files, ['bs-reload']);
});


//创建任务，用于完成后输出到dist文件夹
//插件gulp-rev-append在输出之前将文件内部引用的路径转换为md5（文件不发生变化引用就不发生错误）
//images文件，fonts文件夹，libraries文件夹，scripts文件夹，styles文件夹，
gulp.task('dist', function () {
	gulp.src('./fonts/**/*.*')
		.pipe(gulp.dest('./dist/fonts'));
	gulp.src('./images/*.*')
		.pipe(gulp.dest('./dist/images'));
	gulp.src('./styles/*.css')
		.pipe(revAppend())
		.pipe(gulp.dest('./dist/styles'));
	gulp.src('./libraries/**/*.*')
		.pipe(revAppend())
		.pipe(gulp.dest('./dist/libraries'));
	gulp.src('./scripts/*.*')
		.pipe(revAppend())
		.pipe(gulp.dest('./dist/scripts'));
	gulp.src('./*.html')
		.pipe(revAppend())
		.pipe(gulp.dest('./dist'));
	gulp.src(['./*.js', '!gulpfile.js'])
		.pipe(revAppend())
		.pipe(gulp.dest('./dist'));
	gulp.src('./*.css')
		.pipe(revAppend())
		.pipe(gulp.dest('./dist'));
});