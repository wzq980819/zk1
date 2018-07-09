// 引入
var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    gulp = require('gulp'),
    es6 = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');
cleanCss = require('gulp-clean-css'),
    htmlMin = require('gulp-htmlmin'),
    server = require('gulp-webserver'),
    concat = require('gulp-concat'),
    data = require('./src/data/data');
// 创建服务器

gulp.task('server', ['scss'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathName = url.parse(req.url, true).pathname;
                if (pathName === '/favicon.ico') {
                    return false;
                }
                if (pathName === '/api/list') {
                    res.end(JSON.stringify(data.data));
                } else {
                    pathName = pathName === '/' ? 'index.html' : pathName;
                    res.end(fs.readFileSync(path.resolve('src', 'page', pathName)));
                }
            }
        }))
})

// 开发环境js

gulp.task('devJs', function() {
    gulp.src(['src/**/*.js', '!src/**/*.min.js'])
        .pipe(es6({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('src/js'));
})

// 开发环境css

gulp.task('devScss', function() {
    gulp.src('src/**/*.css')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('src/css'));
})

// 监听scss

gulp.task('watch', function() {
    gulp.watch('src/**/*.scss', ['devScss']);
})

// 开发环境

gulp.task('dev', ['devScss', 'devJs']);

// 线上环境scss

gulp.task('buildScss', function() {
    gulp.src('src/**/*.css')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('build/css'));
})

// 线上环境js

gulp.task('buildJs', function() {
    gulp.src(['src/**/*.js', '!src/**/*.min.js'])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'));
})


// 线上环境html

gulp.task('copyHtml', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlMin())
        .pipe(gulp.dest('build/html'));
})

// 线上环境 

gulp.task('build', ['buildScss', 'buildJs']);