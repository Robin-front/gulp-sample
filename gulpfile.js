var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// var minifycss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
// var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var base64 = require('gulp-base64');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var cache = require('gulp-cached');
var less = require('gulp-less');
var pxtorem = require('postcss-pxtorem');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var connect = require('gulp-connect'); //文件服务器
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var paths = {
  scripts: ['jilisaibao/js/**/*.js'],
  font: 'jilisaibao/font/**/*',
  imgs: 'jilisaibao/imgs/**/*',
  css: 'jilisaibao/css/**/*.less',
  html: 'jilisaibao/**/*.html'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    // .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

gulp.task('imgs', function() {
  return gulp.src(paths.imgs)
    .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            // progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            // multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant({quality: 70})] //使用pngquant深度压缩png图片的imagemin插件
        }))
    .pipe(gulp.dest('build/imgs'))
    .pipe(connect.reload());
});

var processors = [
        autoprefixer({
            browsers: ['> 1%', 'IE 7', 'IE 8', 'ios 7', 'ios 8', 'android 4'],// css兼容的浏览器类型或平台
        }),
        // pxtorem({
        //     rootValue: 20,
        //     replace: true,
        //     selectorBlackList: [/^html$/],
        //     propWhiteList: [],
        // })
    ];
var csspipe = lazypipe()
    .pipe(less)
    .pipe(postcss, processors)
    // .pipe(autoprefixer, {
    //     browsers: ['> 1%', 'IE 7', 'IE 8', 'ios 7', 'ios 8', 'android 4'],// css兼容的浏览器类型或平台
    //     cascade: false
    //   })
    .pipe(base64, {
        baseDir: 'build/imgs/',
        maxImageSize: 15*1024, // 小于15K的图片转成base64,
        extensions: ['svg', 'png', /\.jpg#datauri$/i],
        // exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
        // deleteAfterEncoding: false,
        debug: true
      })
    // .pipe(rev);
    // .pipe(cleanCSS, {compatibility: 'ie8'});

gulp.task('css', ['imgs'], function() {
  return gulp.src(paths.css)
    // .pipe(sourcemaps.init())
    .pipe(concat('app.min.css'))
    .pipe(csspipe())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

gulp.task('html', ['imgs'], function() {
  return gulp.src(paths.html)
    .pipe(useref())
    .pipe(cache('useref'))
    // .pipe(gulpif('*.js', uglify()))
    // .pipe(gulpif('*.js', rev()))
    .pipe(gulpif('*.css', csspipe()))
    // .pipe(revReplace())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('font', function(){
  return gulp.src(paths.font)
    .pipe(gulp.dest('build/font'));
});

// gulp.task('build', ['scripts', 'imgs', 'css', 'html']);
gulp.task('build', ['imgs', 'font', 'html']);

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['html']);
  gulp.watch(paths.imgs, ['html']);
  gulp.watch(paths.css, ['html']);
  gulp.watch(paths.html, ['html']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 8888,
    });
});


gulp.task('watchme', ['connect', 'watch']);
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function(){
  gulp.start(['build']);
});
gulp.task('default:watch', ['clean'], function(){
  gulp.start(['watch', 'build']);
});
