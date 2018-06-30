const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const brotli = require('gulp-brotli');
const webpackStream = require('webpack-stream');
const webpack2 = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackConfigProduction = require('./webpack.config.production.js');

gulp.task('sass', ['copy'], function () {
  gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10,
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));
});


gulp.task('sass-production', ['copy'], function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10,
    }))
    .pipe(autoprefixer())
    .pipe(cleanCss({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('compress', ['sass-production', 'webpack-production'], function () {
  return gulp.src('dist/**/*.{css,js,svg}')
    .pipe(brotli.compress({
      quality: 11,
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.{js,jsx,vue}', ['webpack']);
  gulp.watch(['src/images/**/*', 'src/fonts/**/*'], ['copy']);
});

gulp.task('copy', function () {
  return gulp.src(['src/images/**/*', 'src/fonts/**/*'], {base: 'src'})
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function () {
  gulp.src('src/js/script.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('webpack', function() {
  return gulp.src('src/js/**/*.{js,jsx}')
    .pipe(webpackStream(webpackConfig, webpack2))
    .on('error', function handleError() {
      this.emit('end');
    })
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('webpack-production', function() {
  return gulp.src('src/js/**/*.{js,jsx}')
    .pipe(webpackStream(webpackConfigProduction, webpack2))
    .pipe(gulp.dest('dist/js/'));
});


gulp.task('default', ['sass', 'watch', 'webpack']);

gulp.task('build', ['sass-production', 'compress', 'webpack-production']);
