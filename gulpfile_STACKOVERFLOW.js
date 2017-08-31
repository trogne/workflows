var gulp = require('gulp');

// define plug-ins
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter'); // 4.0.0+
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');

// Define paths variables
var dest_path =  'www';

// grab libraries files from bower_components, minify and push in /public
gulp.task('publish-components', function() {
  var jsFilter = gulpFilter('*.js', {restore: true}),
      cssFilter = gulpFilter('*.css', {restore: true}),
      fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'], {restore: true});

  return gulp.src(mainBowerFiles())

  // grab vendor js files from bower_components, minify and push in /public
  .pipe(jsFilter)
  .pipe(gulp.dest(dest_path + '/js/'))
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/js/'))
  .pipe(jsFilter.restore)

  // grab vendor css files from bower_components, minify and push in /public
  .pipe(cssFilter)
  .pipe(gulp.dest(dest_path + '/css'))
  .pipe(minifycss())
  .pipe(rename({
      suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/css'))
  .pipe(cssFilter.restore)

  // grab vendor font files from bower_components and push in /public
  .pipe(fontFilter)
  .pipe(flatten())
  .pipe(gulp.dest(dest_path + '/fonts'));
});
