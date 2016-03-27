'use strict';

import gulp from 'gulp';
import less from 'gulp-less';
import path from 'path';



gulp.task('less', () => {
    return gulp.src('./less/clean-blog.less')
        .pipe(less({ paths: [path.join(__dirname, 'less', 'includes')] }))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', () => {
    gulp.watch('./less/clean-blog.less', ['less']);
    //gulp.watch(paths.html, ['jade']);
});

gulp.task('default', ['less', 'watch']);