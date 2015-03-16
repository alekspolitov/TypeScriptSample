var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    ts = require("gulp-tsc"),
    clean = require("gulp-clean");

gulp.task('clean', function () {
    return gulp.src('_main.js', { read: false })
      .pipe(clean());
})
gulp.task('ts', ["clean"], function () {
    gulp.src(["**/*.ts", "!node_modules/**/*.ts"])
      .pipe(ts({
          out: '_main.js',
          target: 'ES5',
          module: 'commonjs'
      }))
        .pipe(gulp.dest("."));
});

gulp.task('default', ['ts']);