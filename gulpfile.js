'use strict';

var gulp = require('gulp'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur');


var connect = require('gulp-connect'),
    open = require('gulp-open'),
    port = 3456;

var PATHS = {
    src: {
        js: 'src/**/*.js',
        html: 'src/**/*.html'
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/angular2/node_modules/rx/dist/rx.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/zone.js/dist/long-stack-trace-zone.js',
        '!node_modules/systemjs/dist/*.src.js',
        'node_modules/systemjs/dist/*.js'
    ],
    dist: 'dist',
    distLib : 'dist/lib'
};


gulp.task('watch', function() {
    gulp.watch(PATHS.src.js, ['js']);
    gulp.watch(PATHS.src.html, ['html']);
});

gulp.task('js', function() {
    return gulp.src(PATHS.src.js)
        .pipe(rename({
            extname: ''
        })) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(traceur({
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({
            extname: '.js'
        })) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('html', function() {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('angular2', function() {

    return gulp
        .src([
            '!node_modules/angular2/node_modules/**',
            '!node_modules/angular2/es6/**',
            '!node_modules/angular2/ts/**',
            '!node_modules/angular2/angular2.api.js',
            '!node_modules/angular2/angular2_sfx.js',
            '!node_modules/angular2/angular2.api.js',
            'node_modules/angular2/**/*.js'
        ])
        .pipe(gulp.dest(PATHS.distLib + '/angular2'));
});

gulp.task('libs', ['angular2'], function() {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest(PATHS.distLib));
});



gulp.task('connect', function() {
    connect.server({
        root: __dirname + '/dist',
        port: port,
        livereload: true
    });
});

gulp.task('open', function() {
    var options = {
        url: 'http://localhost:' + port,
    };
    gulp.src('./index.html')
        .pipe(open('', options));
});

gulp.task('build', ['js', 'html']);
gulp.task('default', ['build', 'libs']);
gulp.task('serve', ['connect', 'open']);
gulp.task('clean', function(done) {
    del(['dist'], done);
});
