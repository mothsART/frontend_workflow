const gulp = require('gulp');

const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssbeautify = require('gulp-cssbeautify');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const plugins = require('gulp-load-plugins')();

const css_source = './app/css/';
const js_source = './app/js/';
const destination = './output';

// QA
gulp.task('css_qa', function () {
    return gulp.src(css_source + '*.css')
    .pipe(plugins.csscomb())
    .pipe(cssbeautify({indent: '  '}))
    .pipe(gulp.dest(css_source));
});

gulp.task('js_qa', function () {
    return gulp.src(js_source)
    pipe(gulp.dest(js_source));
});

// Build
gulp.task('css', function () {
    var processors = [
        require("postcss-import")(),
        require("postcss-url")(),
        require("postcss-cssnext")(),
        require("postcss-browser-reporter")(),
        require("postcss-reporter")(),
        autoprefixer({browsers: ['last 1 version']}),
        cssnano(),
    ];
    return gulp.src(css_source)
    .pipe(postcss(processors))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destination + '*.css'));
});

gulp.task('js', function () {
    gulp.src(js_source)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination + '*.js'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(css_source, ['css']);
    gulp.watch(js_source, ['js']);
});

gulp.task('qa', ['css_qa', 'js_qa']);
gulp.task('default', ['css', 'js']);
