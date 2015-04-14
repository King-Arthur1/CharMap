var gulp = require('gulp'),
    browserify = require('browserify'),
    stringify = require('stringify'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify');
 
gulp.task('browserify', function() {
  return browserify('./src/script.js')
         .bundle()
         .pipe(source('bundle.js'))
         .pipe(gulp.dest('./build/'))
});

gulp.task('react-browserify', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('./react/reactApp.js');
  return b.bundle()
    .pipe(source('reactApp.js'))
    .pipe(gulp.dest('./build/react'))
});

gulp.task('react-copy', function() {
  return gulp.src('./react/index.html')
    .pipe(gulp.dest('./build/react'));
});

gulp.task('react', ['react-browserify', 'react-copy']); 
gulp.task('default', ['browserify']);
