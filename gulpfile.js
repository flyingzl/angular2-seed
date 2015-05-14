'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var traceur = require('gulp-traceur');
var connect = require('gulp-connect');
var open = require('gulp-open');
var port = 3456;


var NG_PATH = './node_modules/angular2/es6/dev/';
var RTT_PATH = './node_modules/rtts_assert/';




gulp.task('build:ng', shell.task([
    'npm install',
    'node ./es5build.js -s . -d ../../../../lib/angular'
  ], {
    cwd: NG_PATH
  })
);

gulp.task('build:rtts', shell.task([
    'npm install',
    'node ./es6/es5build.js -d ./../../lib/rtts_assert'
  ], {
    cwd: RTT_PATH
  })
);

gulp.task('build:angular', ['build:ng', 'build:rtts']);

gulp.task('build', function () {
  return gulp.src('./js/**/*.js')
    .pipe(traceur({
      sourceMaps: 'inline',
      modules: 'instantiate',
      annotations: true,
      memberVariables: true,
      typeAssertions: true,
      typeAssertionModule: './lib/rtts_assert',
      types: true
    }))
    .pipe(gulp.dest('./dev'));
});

gulp.task('watch', function () {
  gulp.watch('./js/**', ['build']);
});


gulp.task('connect', function() {
  connect.server({
    root: __dirname,
    port: port,
    livereload: true
  });
});

gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port,
  };
  gulp.src('./index.html')
  .pipe(open('', options));
});


gulp.task('serve', ['connect', 'open']);

gulp.task('default', ['build:angular', 'build']);
