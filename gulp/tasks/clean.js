const gulp = require('gulp');
const del = require('del');

const deleteFolder = [
    './view/js/*.js',
    './view/css/*.css',
    './view/html/*.html'
];

gulp.task('clean', () => {
    return del(deleteFolder);
});
