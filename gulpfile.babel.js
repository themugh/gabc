'use strict';

import gulp from 'gulp';
import del from 'del';
import less from 'gulp-less';
import path from 'path';

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('less', () => {
    return gulp.src('./less/clean-blog.less')
        .pipe(less({ paths: [path.join(__dirname, 'less', 'includes')] }))
        .pipe(gulp.dest('./css'));
});

gulp.task('copy', () => {
    gulp.src('./css/**/*.css', { dot: true }).pipe(gulp.dest('dist/css'));
    gulp.src('./fonts/**/*.*', { dot: true }).pipe(gulp.dest('dist/fonts'));
    gulp.src('./img/**/*.*', { dot: true }).pipe(gulp.dest('dist/img'));
    gulp.src('./js/**/*.*', { dot: true }).pipe(gulp.dest('dist/js'));
    gulp.src('./*.html', { dot: true }).pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
    gulp.watch('./less/clean-blog.less', ['less']);
});

gulp.task('build', ['clean', 'copy']);

gulp.task('default', ['less', 'watch']);