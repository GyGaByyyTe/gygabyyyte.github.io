// Include gulp
var gulp = require("gulp");
var debug = require("gulp-debug");
var notify = require('gulp-notify');

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
//проверка на обновленность файла
var newer = require("gulp-newer");

// var sourcemaps = require("gulp-sourcemaps");
// var moreCSS = require("gulp-more-css");
// var jade = require("gulp-jade");

// --------------------------------------------- ИЗОБРАЖЕНИЯ И ШРИФТЫ

  // оптимизация изображений
    var image_src = "app/img/**/*";
    var image_dest = "app/img";

    gulp.task("imagemin", function () {
      return gulp.src(image_src)
        .pipe(newer(image_dest))
        .pipe(imagemin())
        .pipe(gulp.dest(image_dest))
    });

// --------------------------------------------- CSS ФОРМИРОВАНИЕ
  var css_src = "app/scss/**/*.scss";
  var css_res = "styles.min.css";
  var css_dest = "app/css";

  var vendor_css_src = [
    "app/libs/normalize-css/normalize.css"
  ];
  var vendor_css_res = "vendor.min.css";
  var vendor_css_dest = "app/css";

  // Compile Our Sass
    gulp.task("cssSelf", function () {
      // все исходные стили компилятся из одного файла с импортами
      return gulp.src("app/scss/styles.scss")
        // .pipe(sourcemaps.init())
        // .pipe(debug({title:"scss"}))
        .pipe(sass().on('error', notify.onError(
          {
            message: "<%= error.message %>",
            title: "Sass Error!"
          }))
        )
        .pipe(concat(css_res))
        // .pipe(cssnano())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(css_dest))
        .pipe(browserSync.reload({ stream: true }));
    });

  // Таск для объединения и минификации CSS-файлов внешних библиотек
    gulp.task("vendorCSS", function () {
      return gulp.src(vendor_css_src)
        .pipe(concat(vendor_css_res))
        .pipe(cssnano())
        .pipe(gulp.dest(vendor_css_dest));
    });

// --------------------------------------------- JavaScript JS ФОРМИРОВАНИЕ
  var vendor_js_src = [
    "app/libs/jquery/dist/jquery.min.js"
  ];  
  var vendor_js_res = "vendor.min.js";
  var vendor_js_dest = "app/js";

  var js_src = "app/js/assets/**/*.js";
  var js_res = "self.min.js";
  var js_dest = "app/js";  

  // Таск для объединения и минификации JS-файлов внешних библиотек
    gulp.task("vendorJS", function () {
      return gulp.src(vendor_js_src)
        .pipe(concat(vendor_js_res))
        .pipe(uglify())
        .pipe(gulp.dest(vendor_js_dest))
    });

  // Lint Task
    gulp.task("lint", function () {
      return gulp.src(js_src)
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
    });

  // Concatenate & Minify self-JS
    gulp.task("scripts", ["lint"], function () {
      return gulp.src(js_src)
        .pipe(concat(js_res))
        //.pipe(uglify())
        .pipe(gulp.dest(js_dest))
        .pipe(browserSync.reload({ stream: true }));
    });

// --------------------------------------------- ЛАЙВ СЕРВЕР
  //live Reload
    gulp.task("server", function () {
      browserSync({
        server: {
          baseDir: 'app'
        },
        notify: false
      });
    });

// --------------------------------------------- ОСНОВНЫЕ ТАСКИ

  //Clean
    gulp.task("clean", function () {
      return del.sync("dist");
    });

  // Watch Files For Changes 
    gulp.task("watch", ["server", "vendorCSS", "vendorJS", "cssSelf", "scripts"], function () {
      gulp.watch(css_src, function (event, cb) {
        setTimeout(function () { gulp.start('cssSelf'); }, 500) // задача выполниться через 500 миллисекунд и файл успеет сохраниться на диске
      });
      gulp.watch("app/*.html", browserSync.reload);
      gulp.watch(js_src, ["scripts"]);
    });

  //Build task 
    gulp.task("build", ["clean","vendorCSS", "cssSelf", "vendorJS", "scripts", "imagemin"], function () {

      var build_css = gulp.src(["app/css/*"])
        .pipe(gulp.dest("dist/css"));

      var build_fonts = gulp.src("app/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));

      var build_img = gulp.src("app/img/**/*")
        .pipe(gulp.dest("dist/img"));

      var build_js = gulp.src("app/js/*.js")
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