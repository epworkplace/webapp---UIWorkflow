 // Include gulp and plugins
 var
	gulp = require('gulp'),
	del = require('del'),
	pkg = require('./package.json'),
	$ = require('gulp-load-plugins')({ lazy: true }),
	browserSync = require('browser-sync').create(),
  htmlInjector = require('bs-html-injector'),
	reload = browserSync.reload;

// file locations
var
	devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

	source = './',
	dest = devBuild ? 'builds/development/' : 'builds/production/',

	html = {
		in: source + '*.html',
		watch: [source + '*.html', source + '_partials/**/*'],
		out: dest,
		context: {
			devBuild: devBuild,
			author: pkg.author,
			version: pkg.version
		}
	},

	images = {
		in: source + 'lbd/img/**/*',
		out: dest + 'lbd/img/'
	},

	css = {
		in: [source + 'lbd/sass/light-bootstrap-dashboard.scss'],
		watch: [source + 'lbd/sass/**/*.scss'],
		out: dest + 'lbd/css/',
    pluginCSS: {
      in: [source + 'lbd/css/**/*'],
      watch: [source + 'lbd/css/**/*.css'],
      out: dest + 'lbd/css/'
    },
		sassOpts: {
			outputStyle: devBuild ? 'compressed' : 'compressed',
			imagePath: '../img',
			precision: 3,
			errLogToConsole: true
		},
		pleeeaseOpts: {
			"autoprefixer": { browsers: ['last 2 versions', '> 2%'] },
			"rem": ['16px'],
			"sass": false,
			"import": true,
			"sourcemaps": false,
			"pseudoElements": true,
			"mqpacker": true,
			"minifier": !devBuild
		}
	},

	fonts = {
		in: source + 'lbd/fonts/*.*',
		out: dest + 'lbd/fonts/'
	},

	js = {
		in: source + 'lbd/js/**/*',
		out: dest + 'lbd/js/'
		// filename: 'main.js'
	},

  jsLibs = {
    in: source + 'lbd/lib/**/*',
    out: dest + 'lbd/lib/'
    // filename: 'main.js'
  },

	syncOpts = {
		server: {
			baseDir: dest,
			index: 'index.html'
		},
		open: false,
    // files: [
    //         source + '**/*.html',
    //         '!' + source + 'builds/**/*',
    //         '!' + source + 'node_modules/**/*',
    //         '!' + css.in,
    //         '!' + css.out + 'maps/**/*',
    //         '!' + css.out + 'images/**/*',
    //         css.out + '**/*.css'
    //     ],
    injectChanges: true,
    reloadDelay: 0,
		notify: true
	};

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// clean the build folder
gulp.task('clean', function() {
	del([
		dest + '*'
	]);
});

// build HTML files
gulp.task('html', function() {
	var page = gulp.src(html.in)
						 // .pipe($.newer(html.out))
						 .pipe($.preprocess({ context: html.context }));
	if (!devBuild) {
		  page = page
			.pipe($.size({ title: 'HTML in' }))
			.pipe($.htmlclean())
			.pipe($.size({ title: 'HTML out' }));
	}
	return page
		 // .pipe($.indent({
	  //       tabs:true,
		 //    amount:1
		 //   }))
		 // .pipe($.jsbeautifier())
		 .pipe(gulp.dest(html.out));
});

// manage images
gulp.task('images', function() {
	return gulp.src(images.in)
		.pipe($.newer(images.out))
		.pipe($.imagemin())
		.pipe(gulp.dest(images.out));
});

// copy fonts
gulp.task('fonts', function() {
	return gulp.src(fonts.in)
		.pipe($.newer(fonts.out))
		.pipe(gulp.dest(fonts.out));
});

// copy plugin css
gulp.task('css', ['fonts'], function() {
  return gulp.src(css.pluginCSS.in)
    // .pipe($.sourcemaps.init())
    // .pipe($.sass(css.sassOpts))
    .pipe($.size({title: 'CSS in '}))
    // .pipe($.pleeease(css.pleeeaseOpts))
    // .pipe($.sourcemaps.write('./maps'))
    .pipe($.newer(css.pluginCSS.out))
    .pipe($.size({title: 'CSS out '}))
    .pipe(gulp.dest(css.pluginCSS.out))
    .pipe(browserSync.stream({match: '**/*.css'}));
    // .pipe(reload({stream: true}));
});

// compile Sass
gulp.task('sass', ['fonts'], function() {
	return gulp.src(css.in)
		.pipe($.sourcemaps.init())
    .pipe($.plumber())
		.pipe($.sass(css.sassOpts))
		.pipe($.size({title: 'SCSS in '}))
		.pipe($.sourcemaps.write('./maps'))
		.pipe($.size({title: 'SCSS out '}))
		.pipe(gulp.dest(css.out))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

// js tasks
gulp.task('js', function() {
	if (!devBuild) {
		return gulp.src(js.in)
			.pipe($.newer(js.out))
			// .pipe($.jshint())
			// .pipe($.jshint.reporter('default'))
			// .pipe($.jshint.reporter('fail'))
			.pipe(gulp.dest(js.out));
	}
	else {
		del([
			dest + 'lbd/js/*'
		]);
		return gulp.src(js.in)
			.pipe($.deporder())
			// .pipe($.concat(js.filename))
			.pipe($.size({ title: 'JS in '}))
			.pipe($.stripDebug())
			// .pipe($.uglify())
			.pipe($.size({ title: 'JS out '}))
			.pipe(gulp.dest(js.out));
	}
});

// copy js libraries
gulp.task('jslib', function() {
  if (devBuild) {
    return gulp.src(jsLibs.in)
      .pipe($.newer(jsLibs.out))
      // .pipe($.jshint())
      // .pipe($.jshint.reporter('default'))
      // .pipe($.jshint.reporter('fail'))
      .pipe(gulp.dest(jsLibs.out));
  }
  else {
    del([
      dest + 'lbd/lib/*'
    ]);
    return gulp.src(jsLibs.in)
      .pipe($.deporder())
      // .pipe($.concat(jsLibs.filename))
      .pipe($.size({ title: 'JS libraries in '}))
      // .pipe($.stripDebug())
      // .pipe($.uglify())
      .pipe($.size({ title: 'JS libraries out '}))
      .pipe(gulp.dest(jsLibs.out));
  }
});

gulp.task('connect', function() {
    $.connect.server({
        root: dest,
        livereload: true
    });
});

gulp.task('stream', function(){

});

// browser sync
gulp.task('serve', [], function() {
	// browserSync.init(syncOpts);

  // browserSync.use(htmlInjector,{
  //   files: [dest + '**/*.html']
  // });

  browserSync.init({
    server: {
      baseDir: dest,
      index: 'index.html'
    },
    // files: [dest + 'lbd/css/light-bootstrap-dashboard.css', dest + 'lbd/js/custom.js'],
    open: false,
    port: 8080,
    injectChanges: true,
    notify: true

  });

browserSync.watch(html.out + '*.html').on('change', reload);
// $.watch([dest+'**/*.html'], $.batch(function (events, done) {
//   gulp.start(reload);
// }));
// $.watch([dest+'**/*.css'], $.batch(function (events, done) {
//   gulp.start(browserSync.stream({match: '**/*.css'}), done);
// }));
browserSync.watch(dest + 'lbd/js/custom.js').on('change', reload);

/*  // html changes
  gulp.watch(html.watch, ['html', reload]);
  // gulp.watch(html.watch).on('change', reload);

  // image changes
  gulp.watch(images.in, ['images']);

  // font changes
  gulp.watch(fonts.in, ['fonts']);

  // sass changes
  gulp.watch([css.watch], ['sass']);

  // pluginCSS changes
  gulp.watch([css.pluginCSS.watch], ['css']);

  // javascript changes
  // gulp.watch(js.in, ['js', reload]);
  gulp.watch(js.in).on('change', reload);

  // javascript libraries changes
  // gulp.watch(jsLibs.in, ['jslib', reload]);
  gulp.watch(jsLibs.in).on('change', reload);*/

});

gulp.task('watch', function() {
  // html changes
  gulp.watch(html.watch, ['html']);

  // image changes
  gulp.watch(images.in, ['images']);

  // font changes
  gulp.watch(fonts.in, ['fonts']);

  // sass changes
  gulp.watch([css.watch], ['sass']);

  // pluginCSS changes
  gulp.watch([css.pluginCSS.watch], ['css']);

  // javascript changes
  gulp.watch(js.in, ['js']);

  // javascript libraries changes
  gulp.watch(jsLibs.in, ['jslib', reload]);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'css', 'sass', 'js', 'jslib', 'watch', 'serve']);

// gulp.task('default', ['serve']);
