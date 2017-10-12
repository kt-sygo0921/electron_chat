import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';

gulp.task('sass', () => {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./view/css'));
});
