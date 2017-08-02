var gulp = require('gulp');
var lessImport = require('gulp-less-import');
var less = require('gulp-less');
var path = require('path');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

var imgSrc = 'src/img/**';
var imgDest = 'public/img'

gulp.task('init', ['styles','images','scripts']);

gulp.task('serve', function() {
    browserSync.init({
      server: './'
    });

    gulp.watch('src/less/custom/**/*.less', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch(imgSrc, ['images']);

    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src('src/less/custom/*.less')
    .pipe(lessImport('main.less'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(browserSync.stream())
    .pipe(notify('Styles updated!'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function() {
    return gulp.src(imgSrc)
      .pipe(newer(imgDest))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDest))
      .pipe(browserSync.stream())
      .pipe(notify('Images comppublicsed!'))
});

gulp.task('scripts', function() {
    gulp.src('src/js/libs/**/*.js')
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('public/js/'));

    gulp.src('src/js/dev/**/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('public/js/'))
      .pipe(browserSync.stream())
      .pipe(notify('Scripts updated!'));
});

gulp.task('default', ['init', 'serve']);
