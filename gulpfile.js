const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-less');

const config = {
  src: '.',
  css: {
    watch: '/src/**/*.less',
    src: '/src/less/*.less',
    dest: '/assets/css'
  },
  html: {
    src: '/*.html'
  },
  js: {
    src: '/assets/js/*.js'
  }
};

gulp.task('build', function () {
  gulp.src(config.src + config.css.src)
    // .pipe(sourcemaps.init())
    .pipe(preproc())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.src + config.css.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync'], function () {
  gulp.watch(config.src + config.css.watch, ['build'], browserSync.reload);
  gulp.watch(config.src + config.html.src, browserSync.reload);
  gulp.watch(config.src + config.js.src, browserSync.reload);
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: config.src + '/'
    }
  });
});