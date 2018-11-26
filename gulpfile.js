const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const minify = require('gulp-minify');
const webserver = require('gulp-webserver');
const babel = require('gulp-babel');

gulp.task('default', ['webserver', 'sass', 'watch', 'compress']);

gulp.task('sass', function () {
  return gulp.src('assets/styles/**/*.scss')
    .pipe(concat('style.min.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('public/style/'))
    .pipe(livereload());
});

gulp.task('compress', function () {
  gulp.src('assets/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '-min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('public/scripts/'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('assets/styles/**/*.scss', ['sass']);
  gulp.watch('assets/scripts/*.js', ['compress']);
  gulp.watch('/*.html');
	livereload.listen();
});

gulp.task('webserver', ['watch'], function () {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
    }))
});