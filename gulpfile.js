const gulp = require("gulp"),
  browserSync = require('browser-sync').create();

const $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

const onError = (err) => {
  console.log(err);
};

gulp.task('images', () =>
  gulp.src('images/*.{jpg,png,jpeg}')
    .pipe($.webp({
      quality: 80,
      preset: 'photo',
      method: 6
    }))
    .pipe(gulp.dest('images'))
);

gulp.task('css', function () {
  return gulp.src('./less/style.less')
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.less())
    .pipe($.postcss([
        require('postcss-assets')({
          loadPaths: ['images/']
        }),
        require('postcss-font-magician')({
          variants: {
            'Roboto': {
              '700': []
            }
          },
          formats: 'woff2 woff ttf'
        }),
        require('autoprefixer')(),
        require('postcss-easysprites')({
          imagePath: './images/sprite',
          spritePath: './images'
        }),
        require('css-mqpacker')({
          sort: true
        })
      ])
    )
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('server', ['css'], function () {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: './'
    }
  });
});


gulp.task("watch", function () {
  gulp.watch('**/*/*.less', ['css']);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("js/*.js").on('change', browserSync.reload);
});

gulp.task("build", ['css']);

gulp.task("default", ["build", "watch", "server"]);



