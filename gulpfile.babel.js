'use strict';

import gulp from 'gulp';
import del from 'del';
import less from 'gulp-less';
import path from 'path';
import useref from 'gulp-useref';
import gulpIf from 'gulp-if';
import cssnano from 'gulp-cssnano';
import runSequence from 'run-sequence';
var browserSync = require('browser-sync').create();

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('less', () => {
    return gulp.src('less/site.less')
        .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('useref', () => {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', () => {
    gulp.src('css/**/*.css', {dot: true}).pipe(gulp.dest('dist/css'));
    gulp.src('fonts/**/*.*', {dot: true}).pipe(gulp.dest('dist/fonts'));
    gulp.src('img/**/*.*', {dot: true}).pipe(gulp.dest('dist/img'));
    gulp.src('js/**/*.*', {dot: true}).pipe(gulp.dest('dist/js'));
    // gulp.src('./*.html', { dot: true }).pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
    gulp.watch('less/site.less', ['less']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/*.js', browserSync.reload);
});

gulp.task('build', () => {
    runSequence(['clean', 'useref', 'copy']);
});

gulp.task('default', () => {
    runSequence(['less', 'browser-sync', 'watch']);
});