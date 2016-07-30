'use strict';

let gulp = require('gulp');
let jshint = require('gulp-jshint');
let watch = require('gulp-watch');
let watchify = require('watchify');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let gutil = require('gulp-util');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let Server = require('karma').Server;

let handleError = function(task) {
  return function(err) {

    notify.onError({
      message: task + ' failed, check the logs..',
      sound: false
    })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

/*
  JSHINT section
  based on the real life gulpfile.js from Steve Brownlee's MJD Resource
  */

gulp.task('lint', function() {
  return gulp
    .src([
      // 'gulpfile.js',
      'js/**/*.js',
      'test/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function() {}
  );
});

/*
  Browserify section
  */

let customOpts = {
  entries: ['js/main.js'],
  debug: true
};
let opts = Object.assign({}, watchify.args, customOpts);
let bundler = watchify(browserify(opts));
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}
gulp.task('browserify', bundle);

/*
  SASS SECTION
 */
gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
    // sourcemaps + sass + error handling
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceComments: true,
      outputStyle: 'compressed'  // nested || compressed
    }))
    .on('error', handleError('SASS'))
    // generate .maps
    .pipe(sourcemaps.write({
      'includeContent': false,
      'sourceRoot': '.'
    }))
    .pipe(sourcemaps.write({
      'includeContent': true
    }))
    // write sourcemaps to a specific directory
    // give it a file and save
    .pipe(gulp.dest('./dist/css'));
});

/*
  Watch section
  Karma is started in this area via the return statement
  */

gulp.task('watch', function() {
  gulp.watch(['js/**/*.js', 'test/**/*.js'], ['lint']);
  gulp.watch('./sass/**/*.scss', ['sass']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
  return Server.start({
    configFile: __dirname + '/karma.conf.js'
  });
});

gulp.task('default', ['lint', 'watch', 'sass'], bundle);
