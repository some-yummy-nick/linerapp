var gulp = require('gulp'),
  path = require('path'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./css/style.css')
    .pipe(plumber({
      errorHandler: function (error) {
        gutil.log('Error: ' + error.message);
        this.emit('end');
      }
    }))
    .pipe(postcss([
      require('postcss-assets')({
        loadPaths: ['images/']
      }),
      require('postcss-font-magician')({
        variants: {
          'Open Sans': {
            '400': []
          }
        },
        formats: 'woff2 woff ttf'
      }),
      require('autoprefixer')(),
      require('postcss-easysprites')({
        imagePath: './images/sprite',
        spritePath: './images'
      }),
      require('postcss-filter-gradient'),//поддержка градиентов ниже ie9
      require("postcss-color-rgba-fallback"),//добавляет цвет если нет поддержки прозрачности
      require('postcss-rgb-plz'),//конвертирует hex в rgb
      require('css-mqpacker')({
        sort: true
      })
    ])
  )
    .pipe(gulp.dest('./css'));
});

gulp.task("watch", function () {
  gulp.watch('css/style.css', ['css']);
});


gulp.task("build", ['css']);

gulp.task("default", ["build", "watch"]);



