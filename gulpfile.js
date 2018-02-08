const gulp = require("gulp");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const minifycss = require("gulp-minify-css");
const del = require("del");
const useref = require("gulp-useref");
const gulpif = require("gulp-if");
const lazypipe = require("lazypipe");
const cache = require("gulp-cached");
const connect = require("gulp-connect"); //文件服务器
const postcss = require("gulp-postcss");
const opn = require("opn");
const fs = require("fs");
const path = require("path");
const changed = require("gulp-changed");

// const babel = require('gulp-babel');
// const browserify = require('gulp-browserify');
const postcssPlugins = require("./configs/postcss.config.js");
const isMobile = process.env.NODE_ENV === "mobile";

const basePath = path.resolve(__dirname);
console.log("isMobile", isMobile);

const paths = {
  scripts: path.resolve(basePath, "./src/js/**/*.js"),
  font: path.resolve(baPath, "./src/font/**/*"),
  imgs: path.resolve(basePath, "./src/imgs/**/*"),
  css: path.resolve(basePath, "./src/css/**/*.css"),
  html: path.resolve(basePath, "./src/**/*.html")
};

gulp.task("clean", function() {
  return del(["build"]);
});

gulp.task("imgs", function() {
  return gulp
    .src(paths.imgs)
    .pipe(changed(path.resolve(basePath, "./build/imgs")))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(path.resolve(basePath, "./build/imgs")))
    .pipe(connect.reload());
});

const csspipe = lazypipe()
  .pipe(postcss, postcssPlugins.plugins)
  .pipe(minifycss);

const jspipe = lazypipe()
  // .pipe(babel, {
  //   "presets": ['env'],
  //   "plugins": ["transform-runtime"]
  // })
  // .pipe(browserify, { insertGlobals : true,})
  .pipe(uglify);

gulp.task("html", ["imgs"], function() {
  return gulp
    .src(paths.html)
    .pipe(useref())
    .pipe(changed(path.resolve(basePath, "./build/")))
    .pipe(cache("useref"))
    .pipe(gulpif("*.js", jspipe()))
    .pipe(gulpif("*.css", csspipe()))
    .pipe(gulp.dest(path.resolve(basePath, "./build/")))
    .pipe(connect.reload());
});

gulp.task("font", function() {
  return gulp
    .src(paths.font)
    .pipe(changed(path.resolve(basePath, "./build/font")))
    .pipe(gulp.dest(path.resolve(basePath, "./build/font")));
});

gulp.task("watchme", function() {
  gulp.watch(paths.scripts, ["html"]);
  gulp.watch(paths.css, ["html"]);
  gulp.watch(paths.html, ["html"]);
});

//使用connect启动一个Web服务器
gulp.task("connect", function() {
  connect.server({
    root: path.join(basePath, "build"),
    livereload: true,
    port: 8080
  });
  opn("http://localhost:8080");
});

gulp.task("build", ["imgs", "font", "html"]);
gulp.task("watch", ["connect", "watchme"]);
gulp.task("default", ["clean"], function() {
  gulp.start(["build"]);
});
