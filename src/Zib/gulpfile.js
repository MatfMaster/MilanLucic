"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf");

var paths = {};
paths.webroot = "wwwroot/";
paths.npmSrc = "./node_modules/";
paths.npmLibs = paths.webroot + "lib/";

gulp.task("clean", function (cb) {
  rimraf(paths.npmLibs, cb);
});

gulp.task("lib:jquery", function () {
    return gulp.src([paths.npmSrc + '/jquery/dist/jquery.min.js'], { base: paths.npmSrc + '/jquery/dist/' })
         .pipe(gulp.dest(paths.npmLibs));
});

gulp.task("lib:zone", function () {
    return gulp.src([paths.npmSrc + '/zone.js/dist/zone.js'], { base: paths.npmSrc + '/zone.js/dist/' })
         .pipe(gulp.dest(paths.npmLibs));
});

gulp.task("lib:reflect", function () {
    return gulp.src([paths.npmSrc + '/reflect-metadata/Reflect.js'], { base: paths.npmSrc + '/reflect-metadata/' })
         .pipe(gulp.dest(paths.npmLibs));
});

gulp.task("lib:system", function () {
    return gulp.src([paths.npmSrc + '/systemjs/dist/system.src.js'], { base: paths.npmSrc + '/systemjs/dist/' })
         .pipe(gulp.dest(paths.npmLibs));
});

gulp.task("lib:toaster", function () {
    return gulp.src([paths.npmSrc + '/angular2-toaster/**/*', "!" + paths.npmSrc + '/angular2-toaster/**/*.ts'], { base: paths.npmSrc + '/angular2-toaster/' })
         .pipe(gulp.dest(paths.npmLibs + '/angular2-toaster/'));
});

gulp.task("lib:lodash", function () {
    return gulp.src(paths.npmSrc + '/lodash/**/*', { base: paths.npmSrc + '/lodash/' })
         .pipe(gulp.dest(paths.npmLibs + '/lodash/'));
});

gulp.task("lib:bootstrap", function () {
    return gulp.src(paths.npmSrc + '/bootstrap/dist/**/*', { base: paths.npmSrc + '/bootstrap/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/bootstrap/'));
});

gulp.task("lib:angular2", function () {
    return gulp.src(paths.npmSrc + '/@angular/**/*', { base: paths.npmSrc + '/@angular2/' })
         .pipe(gulp.dest(paths.npmLibs + '/@angular/'));
});

gulp.task("lib:rxjs", function () {
    return gulp.src([paths.npmSrc + '/rxjs/**/*', "!" + paths.npmSrc + '/rxjs/**/*.ts'], { base: paths.npmSrc + '/rxjs/' })
         .pipe(gulp.dest(paths.npmLibs + '/rxjs/'));
});

gulp.task("lib:ng2bootstrap", function () {
    return gulp.src(paths.npmSrc + '/ng2-bootstrap/bundles/**/*', { base: paths.npmSrc + '/ng2-bootstrap/bundles/' })
         .pipe(gulp.dest(paths.npmLibs + '/ng2-bootstrap/'));
});

gulp.task("lib:moment", function () {
    return gulp.src(paths.npmSrc + '/moment/min/*.js', { base: paths.npmSrc + '/moment/min/' })
         .pipe(gulp.dest(paths.npmLibs + '/moment/'));
});

// gulp.task("lib:ng2datetime", function () {
//     return gulp.src(paths.npmSrc + '/ng2-datetime/**/*', { base: paths.npmSrc + '/ng2-datetime/' })
//          .pipe(gulp.dest(paths.npmLibs + '/ng2-datetime/'));
// });

// gulp.task("lib:bootstrap-datepicker", function () {
//     return gulp.src(paths.npmSrc + '/bootstrap-datepicker/dist/**/*', { base: paths.npmSrc + '/bootstrap-datepicker/dist/' })
//          .pipe(gulp.dest(paths.npmLibs + '/bootstrap-datepicker/'));
// });

// gulp.task("lib:bootstrap-timepicker", function () {
//     return gulp.src(paths.npmSrc + '/bootstrap-timepicker/**/*', { base: paths.npmSrc + '/bootstrap-timepicker/' })
//          .pipe(gulp.dest(paths.npmLibs + '/bootstrap-timepicker/'));
// });

gulp.task("lib:ng2-datetime-picker", function () {
    return gulp.src(paths.npmSrc + '/ng2-datetime-picker/dist/**/*', { base: paths.npmSrc + '/ng2-datetime-picker/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/ng2-datetime-picker/'));
});


gulp.task("lib", [
    "lib:jquery",
    'lib:bootstrap',
    'lib:lodash',
    'lib:toaster',
    'lib:zone',
    'lib:reflect',
    'lib:system',
    'lib:angular2',
    'lib:rxjs',
    'lib:moment',
    //'lib:ng2bootstrap',

    // 'lib:ng2datetime',
    // 'lib:bootstrap-datepicker',
    // 'lib:bootstrap-timepicker'
    'lib:ng2-datetime-picker'
]);



// /// <binding Clean='clean' />
// "use strict";

// var gulp = require("gulp"),
//     rimraf = require("rimraf"),
//     concat = require("gulp-concat"),
//     cssmin = require("gulp-cssmin"),
//     uglify = require("gulp-uglify");

// var webroot = "./wwwroot/";

// var paths = {
//     js: webroot + "js/**/*.js",
//     minJs: webroot + "js/**/*.min.js",
//     css: webroot + "css/**/*.css",
//     minCss: webroot + "css/**/*.min.css",
//     concatJsDest: webroot + "js/site.min.js",
//     concatCssDest: webroot + "css/site.min.css"
// };

// gulp.task("clean:js", function (cb) {
//     rimraf(paths.concatJsDest, cb);
// });

// gulp.task("clean:css", function (cb) {
//     rimraf(paths.concatCssDest, cb);
// });

// gulp.task("clean", ["clean:js", "clean:css"]);

// gulp.task("min:js", function () {
//     return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
//         .pipe(concat(paths.concatJsDest))
//         .pipe(uglify())
//         .pipe(gulp.dest("."));
// });

// gulp.task("min:css", function () {
//     return gulp.src([paths.css, "!" + paths.minCss])
//         .pipe(concat(paths.concatCssDest))
//         .pipe(cssmin())
//         .pipe(gulp.dest("."));
// });

// gulp.task("min", ["min:js", "min:css"]);
