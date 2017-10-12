import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', () => {
    runSequence('clean', 'sass', 'css', 'ejs', 'js');
});
