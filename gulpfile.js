'use strict'
var gulp = require('gulp');
var sass= require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
 return gulp.src('./app/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss', ['sass']);
});