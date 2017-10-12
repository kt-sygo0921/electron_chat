import gulp from 'gulp';
import ejs from 'gulp-ejs';
import beautify from 'gulp-html-beautify';

// beautify options
const beautifyOptions = {
    'indent_size': 4,
    'indent_char': '',
    'eol': '\n',
    'indent_level': 0,
    'indent_with_tabs': false,
    'preserve_newlines': true,
    'max_preserve_newlines': 0,
    'jslint_happy': false,
    'space_after_anon_function': false,
    'brace_style': 'collapse',
    'keep_array_indentation': false,
    'keep_function_indentation': false,
    'space_before_conditional': true,
    'break_chained_methods': false,
    'eval_code': false,
    'unescape_strings': false,
    'wrap_line_length': 0,
    'wrap_attributes': 'auto',
    'wrap_attributes_indent_size': 4,
    'end_with_newline': false
};

gulp.task('ejs', () => {
    return gulp.src(['./src/ejs/**/*.ejs', '!' + './src/ejs/**/_*.ejs'])
        .pipe(ejs({}, {}, {'ext': '.html'}))
        .pipe(beautify(beautifyOptions))
        .pipe(gulp.dest('./view/html/'));
});
