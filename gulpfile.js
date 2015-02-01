// Include Gulp & tools

var gulp        = require('gulp');
var del         = require('del');
var jshint      = require('gulp-jshint');
var watch       = require('gulp-watch');
var haml        = require('gulp-haml');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var reload      = browserSync.reload;


// HAML

gulp.task('haml', function(){
  return gulp.src('app/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('./build'));
});


// SASS

gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./build/styles'));
});


// Lint JavaScript

gulp.task('hint', function(){
  return gulp.src('./app/js/**/*.js')
    .pipe(jshint())
    .pipe(gulp.dest('./build/js'))
    .pipe(jshint.reporter('default'));
});


// Copy bower_components

gulp.task('copy:bower_components', function(){
  return gulp.src('./app/bower_components/**/*')
    .pipe(gulp.dest('./build/bower_components'));
});


// Copy Data

gulp.task('copy:data', function(){
  return gulp.src('./app/data/**/*')
    .pipe(gulp.dest('./build/data'));
});


// Watch Files & Reload

gulp.task('serve', function(){
  browserSync({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch(['./app/index.haml'], ['haml', reload]);
  gulp.watch('./app/styles/**/*.scss', ['sass', reload]);
  gulp.watch('./app/js/**/*.js', ['hint', reload]);
});


// Clean the Build Output Directory

gulp.task('clean', function(){
 del(['build/*']);
});


// Build

gulp.task('build', ['clean'], function(){
  runSequence('haml', 'hint', 'sass', 'copy:bower_components', 'copy:data')
});


// Gulp Default

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});
