// 引入
var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    es6 = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css'),
    htmlMin = require('gulp-htmlmin'),
    server = require('gulp-webserver'),
    concat = require('gulp-concat');

// 创建服务器

gulp.task('server', function() {
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
                pathName = pathName === '/' ? 'index.html' : pathName;
                res.end(fs.readFileSync('src', 'page', pathName));
            }
        }))
})