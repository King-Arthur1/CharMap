var gulp = require('gulp'),
    browserify = require('browserify'),
    stringify = require('stringify'),
    source = require('vinyl-source-stream');
 
gulp.task('browserify', function() {
  return browserify('./src/script.js')
         .bundle()
         .pipe(source('bundle.js'))
         .pipe(gulp.dest('./build/'))
});
 
gulp.task('default', ['browserify']);