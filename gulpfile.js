var gulp = require('gulp'),
  path = require('path'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  less = require('gulp-less'),
  browserSync = require('browser-sync').create(),
  postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./less/style.less')

    .pipe(plumber({
      errorHandler: function (error) {
        gutil.log('Error: ' + error.message);
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(postcss([
        require('postcss-assets')({
          loadPaths: ['img/']
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
          imagePath: './img/sprite',
          spritePath: './img'
        }),
        require('postcss-filter-gradient'),//поддержка градиентов ниже ie9
        require("postcss-color-rgba-fallback"),//добавляет цвет если нет поддержки прозрачности
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



