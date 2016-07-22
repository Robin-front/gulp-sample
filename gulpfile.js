var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var base64 = require('gulp-base64');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var cache = require('gulp-cached');
var less = require('gulp-less');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var paths = {
  scripts: ['example/js/**/*.js'],
  font: 'example/font/**/*',
  imgs: 'example/imgs/**/*',
  css: 'example/css/**/*.less',
  html: 'example/**/*.html'
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
    .pipe(gulp.dest('build/js'));
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
    .pipe(gulp.dest('build/imgs'));
});


var csspipe = lazypipe()
    .pipe(less)
    .pipe(autoprefixer, {
        browsers: ['last 2 versions', 'ios 7', 'ios 8', 'android 4'],// css兼容的浏览器类型或平台
        cascade: false
      })
    .pipe(base64, {
        baseDir: 'build/imgs/',
        maxImageSize: 15*1024, // 小于15K的图片转成base64,
        extensions: ['svg', 'png', /\.jpg#datauri$/i],
        // exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
        // deleteAfterEncoding: false,
        debug: true
      })
    // .pipe(rev);
    .pipe(minifycss);

gulp.task('css', ['imgs'], function() {
  return gulp.src(paths.css)
    // .pipe(sourcemaps.init())
    .pipe(concat('app.min.css'))
    .pipe(csspipe())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', ['imgs'], function() {
  return gulp.src(paths.html)
    .pipe(useref())
    .pipe(cache('useref'))
    .pipe(gulpif('*.js', uglify()))
    // .pipe(gulpif('*.js', rev()))
    .pipe(gulpif('*.css', csspipe()))
    // .pipe(revReplace())
    .pipe(gulp.dest('build/'));
});

gulp.task('font', function(){
  return gulp.src(paths.font)
    .pipe(gulp.dest('build/font'));
});

// gulp.task('build', ['scripts', 'imgs', 'css', 'html']);
gulp.task('build', ['imgs', 'font', 'html']);

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.imgs, ['imgs']);
  gulp.watch(paths.css, ['css']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function(){
  gulp.start(['build']);
});
gulp.task('default:watch', ['clean'], function(){
  gulp.start(['watch', 'build']);
});
