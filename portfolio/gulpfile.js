// Include gulp
var gulp = require("gulp");

// Include Our Plugins
//локальный сервер
var browserSync = require("browser-sync");
//трансляция scss в css со сжатием
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
//склейка и сжатие скриптов js
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
// удаление папок и файлов
var del = require("del");
//js hint
var jshint = require("gulp-jshint");
// минификация картинок
var imagemin = require("gulp-imagemin");
// var moreCSS = require("gulp-more-css");
// var jade = require("gulp-jade");


// оптимизация изображений
gulp.task("imagemin", function () {
  return gulp.src("app/img/**/*")
  .pipe(imagemin())
  .pipe(gulp.dest("app/img"))
});

// Compile Our Sass
gulp.task("sass", function () {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(concat("main.min.css"))    
    .pipe(cssnano())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

// Lint Task
gulp.task("lint", function () {
  return gulp.src("app/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});
// Concatenate & Minify JS libs
gulp.task("scripts", function () {
  return gulp.src([
    "app/libs/jquery/dist/jquery.min.js",
    "app/libs/magnific-popup/dist/jquery.magnific-popup.min.js"
  ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});

//live Reload
gulp.task("liveServer", function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

//Clean
gulp.task("clean", function () {
  return del.sync("dist");
});

// Watch Files For Changes
gulp.task("watch", ["liveServer", "lint", "scripts"], function () {
  gulp.watch("app/scss/*.scss", ["sass"]);
  gulp.watch("app/*.html", browserSync.reload);
  gulp.watch("app/js/**/*.js", browserSync.reload);
});

//Build task
gulp.task("build", ["clean", "sass", "scripts"], function () {

  var build_css = gulp.src(["app/css/*"])
    .pipe(gulp.dest("dist/css"));

  var build_fonts = gulp.src("app/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
  
  var build_img = gulp.src("app/img/**/*")
    .pipe(gulp.dest("dist/img"));

  var build_js = gulp.src("app/js/**/*")
    .pipe(gulp.dest("dist/js"));

  var build_html = gulp.src("app/*.html")
    .pipe(gulp.dest("dist"));
});



// gulp.task("scripts", function() {
//   return gulp.src("app/js/**/*.js")
//     .pipe(rename("app.js"))
//     .pipe(uglify())
//     .pipe(gulp.dest("dist/js"));
// });

// gulp.task("jade", function() {
//   var locals = new Object();

//   gulp.src("app/*.jade")
//     .pipe(jade({
//       locals: locals
//     }))
//     .pipe(gulp.dest("dist/"))
// });
// gulp.task("watch", function() {
//   gulp.watch("app/js/*.js", ["lint", "scripts"]);
//   gulp.watch("app/scss/*.scss", ["sass"]);
//   gulp.watch("app/*.jade", ["jade"]);
// });

// Default Task
// gulp.task("default", ["lint", "sass", "scripts", "jade", "watch"]);