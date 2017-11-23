const gulp = require("gulp"),
  browserSync = require("browser-sync").create();

const $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

const onError = (err) => {
  console.log(err);
};

var NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task("css", function () {
  return gulp.src("less/style.less")
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.less())
    .pipe($.postcss([
        require("postcss-assets")({
          loadPaths: ["images/"]
        }),
        require("postcss-font-magician")({
          variants: {
            "Roboto": {
              "400": []
            }
          },
          formats: "woff2 woff ttf"
        }),
        require('postcss-image-inliner')({
          assetPaths: ["https://icongr.am"]
        }),
        require("autoprefixer")(),
        require("postcss-easysprites")({
          imagePath: "images/sprite",
          spritePath: "images"
        }),
        require("css-mqpacker")({
          sort: true
        })
      ])
    )
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());

});

gulp.task("webp", () => {
  gulp.src("images/*.{jpg,png,jpeg}")
    .pipe($.webp({
      quality: 80,
      preset: "photo",
      method: 6
    }))
    .pipe(gulp.dest("images"))
});

gulp.task('images', () => {
  return gulp.src('images/*.+(jpg|JPG|png|svg)')
    .pipe($.cache($.imagemin({
      svgo: {
        removeViewBox: true
      },
      optipng: {
        optimizationLevel: 5
      },
      jpegtran: {
        progressive: true,
      },
      imageminJpegRecompress: ({
        loops: 5,
        min: 65,
        max: 70,
        quality: 'medium'
      }),
      pngquant: [{
        quality: '65-70', speed: 5
      }],
      verbose: true
    })))
    .pipe(gulp.dest('images'))
});

gulp.task("server", ["css"], function () {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("watch", function () {
  gulp.watch("less/**/*.less", ["css"]);
  gulp.watch("images/*.+(jpg|JPG|png|svg)", ["images"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/*.js").on("change", browserSync.reload);
});

gulp.task("build", ["css", "images", "webp"]);

gulp.task("default", ["css", "watch", "server", "images"]);



