var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('production', ['ts', 'css', 'fonts', 'ko', 'ng', 'winjs', 'js', 'react', 'uglifyJs']);
