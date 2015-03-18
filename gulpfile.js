var gulp = require("gulp"),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for 
        //config: 'package.json', // where to find the plugins, by default  searched up from process.cwd()  
        scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within 
        replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context 
        camelize: true, // if true, transforms hyphenated plugins names to camel case 
        lazy: true, // whether the plugins should be lazy loaded on demand 
        rename: {} // a mapping of plugins to rename 
    }),
    del = require("del");

var paths = {
    ts: ["**/*.ts", "!node_modules/**/*.ts"],
    jsout: '_main.js',
    jswrapper: ['start.js', '_main.js', 'end.js'],
    jsresult: 'main.js'
};
gulp.task("clean", function () {
    return gulp.src([paths.jsout, paths.jsresult], { read: false, force: true }) // much faster
    //.pipe(plugins.ignore('node_modules/**'))
    .pipe(plugins.rimraf());
})
//gulp.task('clean', function () {
//    return gulp.src([paths.jsout, paths.jsresult], { read: false })
//      .pipe(plugins.clean());
//})
gulp.task('ts', ["clean"], function () {
    gulp.src(paths.ts)
      .pipe(plugins.tsc({
          out: paths.jsout,
          target: 'ES5',
          module: 'commonjs'
      }))
      .pipe(gulp.dest("."));
});

gulp.task("concat", function () {
    gulp.src(paths.jswrapper)
        .pipe(plugins.concat(paths.jsresult))
        .pipe(gulp.dest("."));
});

gulp.task("watch", function () {
    gulp.watch(paths.ts, ["ts"]);
    console.log('watching directory:' + paths.ts.join(', '));

   // gulp.watch(paths.jswrapper, "concat");
   // console.log('watching directory:' + paths.jswrapper.join(', '));
});

gulp.task('default', ['watch']);