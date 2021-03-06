const {series, watch, src, dest, parallel} = require('gulp');
const pump = require('pump');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const zip = require('gulp-zip');
const uglify = require('gulp-uglify');
const beeper = require('beeper');

const rename = require("gulp-rename");

// postcss plugins
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const easyimport = require('postcss-easy-import');

function serve(done) {
  livereload.listen();
  done();
}

const handleError = (done) => {
  return function (err) {
    if (err) {
      beeper();
    }
    return done(err);
  };
};

function hbs(done) {
  pump([
    src(['*.hbs', 'partials/**/*.hbs', '!node_modules/**/*.hbs']),
    livereload()
  ], handleError(done));
}

function css(done) {
  const processors = [
    easyimport,
    customProperties({preserve: false}),
    colorFunction(),
    // autoprefixer({browsers: ['last 2 versions']}),
    autoprefixer(),
    cssnano()
  ];

  pump([
    src([
      'assets/css/screen.css'
    ], {sourcemaps: true}),
    postcss(processors),
    rename({suffix: '.min'}),
    dest('assets/css/', {sourcemaps: '.'}),
    livereload()
  ], handleError(done));
}

function js(done) {
  pump([
    src([
      'assets/js/infinitescroll.js',
      'assets/js/jquery.fitvids.js',
      'assets/js/casper.js'
    ], {sourcemaps: true}),
    uglify(),
    rename({suffix: '.min'}),
    dest('assets/js/', {sourcemaps: '.'}),
    livereload()
  ], handleError(done));
}

function zipper(done) {
  const targetDir = 'dist/';
  const themeName = require('./package.json').name;
  const filename = themeName + '.zip';

  pump([
    src([
      '**',
      '!node_modules', '!node_modules/**',
      '!dist', '!dist/**'
    ]),
    zip(filename),
    dest(targetDir)
  ], handleError(done));
}

const cssWatcher = () => watch(['assets/css/casper.css', 'assets/css/prism.css'], css);
const jsWatcher = () => watch(['assets/js/casper.js'], js);
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs', '!node_modules/**/*.hbs'], hbs);
const watcher = parallel(cssWatcher, jsWatcher, hbsWatcher);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;
