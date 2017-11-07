const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  rimraf = require('rimraf'),
  path = require('path'),
  through = require('through2');

const $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

const onError = (err) => {
  console.log(err);
};

var NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task("css", function () {
  return gulp.src("./less/style.less")
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
        require("autoprefixer")(),
        require("postcss-easysprites")({
          imagePath: "./images/sprite",
          spritePath: "./images"
        }),
        require("css-mqpacker")({
          sort: true
        })
      ])
    )
    .pipe($.webpcss({}))
    .pipe($.if(NODE_ENV === 'cache',
      $.rev()
    ))
    .pipe(gulp.dest("./css"))
    .pipe($.if(NODE_ENV === 'cache',
      $.rev.manifest()
    ))
    .pipe($.if(NODE_ENV === 'cache',
      gulp.dest('./')
    ))
});

gulp.task('update', ["css"], function () {
  return gulp.src(['./rev-manifest.json', './*.html'])
    .pipe($.revCollector({
      replaceReved: true,
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

function cleaner() {
  return through.obj(function (file, enc, cb) {
    rimraf(path.resolve((file.cwd || process.cwd()), file.path), function (err) {
      if (err) {
        this.emit('error', new $.util.PluginError('Cleanup old files', err));
      }
      this.push(file);
      cb();
    }.bind(this));
  });
}

gulp.task('clean', ["update"], function () {
  gulp.src(['./css/**/*.*'], {read: false})
    .pipe($.revOutdated(1)) // leave 1 latest asset file for every file name prefix.
    .pipe(cleaner());

  return;
});

gulp.task('rev-all', ["css", "update", "clean"]);

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
    .pipe($.imagemin({
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
    }))
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
  gulp.watch("./less/**/*.less", ["css"]);
  gulp.watch("images/*.+(jpg|JPG|png|svg)", ["images", "webp"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/*.js").on("change", browserSync.reload);
});

gulp.task("cache-clean", ["rev-all", "images", "webp", "watch", "server"]);

gulp.task("build", ["css", "images", "webp"]);

gulp.task("default", ["css", "watch", "server", "images", "webp"]);



