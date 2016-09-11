/**
 * System configuration for Angular 2 RC2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'lib/@angular',
        'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
        'rxjs': 'lib/rxjs',

        'lodash': 'lib/lodash',
        'angular2-toaster': 'lib/angular2-toaster',
        //,'ng2-select': 'lib/ng2-select/bundles',
        'moment': 'lib/moment',
        'ng2-datetime': 'lib/ng2-datetime/',
        //,'ng2-bootstrap': 'lib/ng2-bootstrap/ng2-bootstrap.min.js'
        //'ng2-datetime-picker': 'lib/ng2-datetime-picker'

    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        '@angular/forms': { main: 'index.js', defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },

        'lodash': { main: 'index.js', defaultExtension: 'js' },
        'angular2-toaster': { main: 'angular2-toaster.js', defaultExtension: 'js' }
        //,'ng2-select': { main: 'ng2-select.min.js', defaultExtension: 'js' },
        ,'moment': { main: 'moment.min.js', defaultExtension: 'js' }
        ,'ng2-datetime': { main: 'index.js', defaultExtension: 'js' },
        //,'ng2-bootstrap': { main: 'ng2-bootstrap.min.js', defaultExtension: 'js' }
        //'ng2-datetime-picker': { main: 'index.js', defaultExtension: 'js'}

    };
    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      //'router-deprecated',
      'upgrade'

    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };
    
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);

/*
(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs',
        'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
        '@angular': 'lib/@angular',
        'lodash': 'lib/lodash',
        'angular2-toaster': 'lib/angular2-toaster'
        //,'ng2-select': 'lib/ng2-select'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' },
        'lodash': { main: 'index.js', defaultExtension: 'js' },
        'angular2-toaster': { main: 'angular2-toaster.js', defaultExtension: 'js' }
        //,'ng2-select': { main: 'ng2-select.js', defaultExtension: 'js' }
    };

    var packageNames = [
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@angular/router-deprecated',
      '@angular/testing',
      '@angular/upgrade',
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);
*/