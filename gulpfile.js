var gulp = require("gulp"),
    crLfReplace = require("gulp-cr-lf-replace"),
    concat = require("gulp-concat"),
    tsc = require("gulp-typescript"),
    del = require("del"),
    vinylPaths = require("vinyl-paths");

var paths = {
    ts: ["**/*.ts", "!node_modules/**/*.ts"],
    jsout: '_main.js',
    jswrapper: ['start.js', '_main.js', 'end.js'],
    jsresult: 'main.js'
};

gulp.task('clean', function () {
    return gulp.src([paths.jsout, paths.jsresult])
        .pipe(vinylPaths(del));
});

gulp.task('ts', function () {
    var tsResult = gulp.src(paths.ts)
      .pipe(tsc({
          out: paths.jsout,
          target: 'es5',
          module: 'commonjs',
          noExternalResolve: true,
          preserveConstEnums: true
      }));
    return tsResult.js
       .pipe(crLfReplace({ afterCode: 'CR+LF' }))
       .pipe(gulp.dest("."));
});

gulp.task("build", ["ts"], function () {
    return gulp.src(paths.jswrapper)
         .pipe(concat(paths.jsresult))
         .pipe(crLfReplace({ afterCode: 'CR+LF' }))
         .pipe(gulp.dest("."));
});

gulp.task("watch", function () {
    gulp.watch(paths.ts, ["build"]);
    console.log('watching directory:' + paths.ts.join(', '));
});

gulp.task('default', ['watch']);