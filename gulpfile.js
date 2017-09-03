var gulp = require('gulp'),
  path = require('path'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  postcss = require('gulp-postcss'),
  purify = require('gulp-purifycss');

let processors = [
  require('autoprefixer')(),
  require('postcss-easysprites')({
    imagePath: './images/sprite',
    spritePath: './images'
  }),
  require('postcss-fontpath')({
    formats: [
      { type: 'woff2', ext: 'woff2' },
      { type: 'woff', ext: 'woff' },
      { type: 'truetype', ext: 'ttf' }
    ]
  }),
  require('postcss-filter-gradient'),//поддержка градиентов ниже ie9
  require("postcss-color-rgba-fallback"),//добавляет цвет если нет поддержки прозрачности
  require('postcss-rgb-plz'),//конвертирует hex в rgb
  require('css-mqpacker')({
    sort: true
  })
];

gulp.task('css', function () {
  return gulp.src('./css/style.css')
    .pipe(plumber({
      errorHandler: function (error) {
        gutil.log('Error: ' + error.message);
        this.emit('end');
      }
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'))
});

gulp.task("watch", function () {
  gulp.watch('css/style.css', ['css']);
});


gulp.task("build", ['css']);

gulp.task("default", ["build", "watch"]);



