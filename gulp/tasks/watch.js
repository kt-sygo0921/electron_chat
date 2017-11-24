import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

gulp.task('watch', ['server'], () => {
    gulp.watch(['./src/js/**/*.ts','./src/js/**/*.tsx'], () => {
        runSequence('js', browserSync.reload);
    });
    gulp.watch(['./src/sass/**/*.scss'], () => {
        runSequence('sass', 'css', browserSync.reload);
    });
    gulp.watch(['./src/ejs/**/*.ejs'], () => {
        runSequence('ejs', browserSync.reload);
    });
});

gulp.task('server', () => {
    browserSync({
        server: {
            baseDir: './view',
            directory: true,
            open: 'external'
        }
    });
});
