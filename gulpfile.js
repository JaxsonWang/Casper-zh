var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');

var rename = require("gulp-rename");

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

var swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};

var nodemonServerInit = function () {
    livereload.listen(1234);
};

gulp.task('build', ['css', 'js'], function (/* cb */) {
    return nodemonServerInit();
});

gulp.task('generate', ['css', 'js']);

gulp.task('css', function () {
    var processors = [
        easyimport(),
        customProperties(),
        colorFunction(),
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];

    return gulp.src([
        'assets/css/casper.css',
        'assets/css/screen.css'])
        .on('error', swallowError)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.', {
            includeContent: true,
            sourceRoot: '/source/css/'
        }))
        .pipe(gulp.dest('assets/css/'))
        .pipe(livereload())
});

gulp.task('js', function () {
    var jsFilter = filter(['**/*.js'], {restore: true});

    return gulp.src([
        'assets/js/infinitescroll.js',
        'assets/js/jquery.fitvids.js',
        'assets/js/casper.js'
    ]).on('error', swallowError)
        .pipe(sourcemaps.init())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.', {
            includeContent: true,
            sourceRoot: '/source/js/'
        }))
        .pipe(gulp.dest('assets/js/'))
        .pipe(livereload())
});

gulp.task('watch', function () {
    gulp.watch('assets/css/casper.css', ['css']);
    gulp.watch('assets/js/casper.js', ['js']);
});

gulp.task('zip', ['css', 'js'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});
