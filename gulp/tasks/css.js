import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import uglify from 'gulp-uglifycss';
import mqpacker from 'css-mqpacker';
import rename from 'gulp-rename';

const processors = [
    autoprefixer({
        browsers: [ 'ie >= 9', 'Edge >= 12', 'ff >= 50', 'chrome >= 56', 'Safari >= 7', 'ios_saf >= 8', 'Android >= 4' ]
    }),
    mqpacker
];

gulp.task('css', () => {
    return gulp.src(['./view/css/**/*.css','!./view/css/**/*.min.css'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./view/css/'))
        .pipe(rename((path) => {
            path.extname = '.min.css';
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./view/css/'));
});
