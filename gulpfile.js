var gulp = require('gulp'),
    path = require("path");

var PATHS = {
    src: 'src/**/*.ts',
    typings: 'node_modules/angular2/bundles/typings/**/*.d.ts',

    libs: [
        "node_modules/angular2/bundles/angular2.dev.js",
        "node_modules/angular2/bundles/angular2-polyfills.js",
        "node_modules/angular2/bundles/router.dev.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/rxjs/bundles/Rx.js",
    ],

    html: 'src/**/*.html',

    dist:  "dist"
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task("libs", function(){
    gulp.src(PATHS.libs).pipe(gulp.dest(PATHS.dist + "/libs"));
})

gulp.task("html", function(){
    gulp.src(PATHS.html).pipe(gulp.dest(PATHS.dist) );
})

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tsResult = gulp.src([PATHS.src, PATHS.typings])
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    return tsResult.js.pipe(gulp.dest(PATHS.dist));
});


gulp.task('play', ['html', 'libs', 'ts2js'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src, ['ts2js']);
    gulp.watch(PATHS.html, ['html']);

    app = connect().use( serveStatic(path.join(__dirname, PATHS.dist)) );
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});
