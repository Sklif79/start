var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    liveServer = require("live-server"),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        img: 'build/assets/images/',
        fonts: 'build/assets/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/assets/js/main.js',
        jsLibs: 'src/assets/js/libs.js',
        style: 'src/assets/css/**/*.css',
        sass: 'src/assets/css/**/*.sass',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/css/**/*.css',
        sass: 'src/assets/css/**/*.sass',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    port: 8888,
    host: "127.0.0.1",
    root: "build/",
    open: true,
    wait: 300,
    mount: []
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('webserver', function () {
    liveServer.start(config);
});


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});








gulp.task('js:buildLibs', function () {
    gulp.src(path.src.jsLibs)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});







gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:buildLibs',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:buildLibs');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: "./build"
        },
        index: 'index-page.html',
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('mobile', ['build', 'browserSync', 'watch']);
