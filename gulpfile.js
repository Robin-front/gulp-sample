var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifycss = require('gulp-minify-css');

var del = require('del');

var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var cache = require('gulp-cached');
var less = require('gulp-less');
var sass = require('gulp-sass');
var px2rem = require('postcss-px2rem');
// var rev = require('gulp-rev');
// var revReplace = require('gulp-rev-replace');
var connect = require('gulp-connect'); //文件服务器
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var opn = require('opn');

const fs = require('fs');
const path = require('path');
const postcssPlugins = require('./configs/postcss.config.js');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const changed = require('gulp-changed');
const isMobile = process.env.NODE_ENV === 'mobile';

var basePath = path.resolve(__dirname);
console.log('path', basePath);
console.log('isMobile', isMobile);

var paths = {
  scripts: path.resolve(basePath, './src/js/**/*.js'),
  font: path.resolve(basePath, './src/font/**/*'),
  imgs: path.resolve(basePath, './src/imgs/**/*'),
  css: path.resolve(basePath, './src/css/**/*.scss'),
  html: path.resolve(basePath, './src/**/*.html')
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('imgs', function() {
  return gulp.src(paths.imgs)
    .pipe(changed(path.resolve(basePath, './build/imgs')))
    .pipe(imagemin([
      	imagemin.gifsicle({interlaced: true}),
      	imagemin.jpegtran({progressive: true}),
      	imagemin.optipng({optimizationLevel: 5}),
      	imagemin.svgo({
      		plugins: [
      			{removeViewBox: true},
      			{cleanupIDs: false}
      		]
      	})
      ]))
    .pipe(gulp.dest(path.resolve(basePath, './build/imgs')))
    .pipe(connect.reload());
});

const csspipe = lazypipe()
    .pipe(sass)
    .pipe(postcss, postcssPlugins.plugins)
    // .pipe(rev);
    .pipe(minifycss);

const jspipe = lazypipe()
    // .pipe(babel, {
    //   "presets": ['env'],
    //   "plugins": ["transform-runtime"]
    // })
    // .pipe(browserify, { insertGlobals : true,})
    .pipe(uglify);

gulp.task('html', ['imgs'], function() {
  return gulp.src(paths.html)
    .pipe(useref())
    .pipe(changed(path.resolve(basePath, './build/')))
    .pipe(cache('useref'))
    .pipe(gulpif('*.js', jspipe()))
    .pipe(gulpif('*.css', csspipe()))
    .pipe(gulp.dest(path.resolve(basePath, './build/')))
    .pipe(connect.reload());
});

gulp.task('font', function(){
  return gulp.src(paths.font)
    .pipe(changed(path.resolve(basePath, './build/font')))
    .pipe(gulp.dest(path.resolve(basePath, './build/font')));
});

gulp.task('watchme', function() {
  gulp.watch(paths.scripts, ['html']);
  // gulp.watch(paths.imgs, ['html']);
  gulp.watch(paths.css, ['html']);
  gulp.watch(paths.html, ['html']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function() {
    connect.server({
        root: path.join(basePath, 'build'),
        livereload: true,
        port: 8080,
    });
    opn('http://localhost:8080');
});


gulp.task('build', ['imgs', 'font', 'html']);

gulp.task('watch', ['connect', 'watchme']);
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function(){
  gulp.start(['build']);
});
