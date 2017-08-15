 // Include gulp and plugins
 var
	gulp = require('gulp'),
	del = require('del'),
	browsersync = require('browser-sync'),
	pkg = require('./package.json'),
	$ = require('gulp-load-plugins')({ lazy: true });

// file locations
var
	devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

	source = 'lbd/',
	dest = devBuild ? 'builds/development/' : 'builds/production/',

	html = {
		in: source + '*.html',
		watch: [source + '*.html', source + 'template/**/*'],
		out: dest,
		context: {
			devBuild: devBuild,
			author: pkg.author,
			version: pkg.version
		}
	},

	images = {
		in: source + 'img/**/*',
		out: dest + 'img/'
	},

	// imguri = {
	// 	in: source + 'img/inline/*',
	// 	out: source + 'scss/img/',
	// 	filename: '_datauri.scss',
	// 	namespace: 'img'
	// },

	css = {
		in: source + 'sass/light-bootstrap-dashboard.scss',
		watch: [source + 'sass/**/*'],
		out: dest + 'css/',
		sassOpts: {
			outputStyle: 'nested',
			imagePath: '../img',
			precision: 3,
			errLogToConsole: true
		},
		pleeeaseOpts: {
			"autoprefixer": { browsers: ['last 2 versions', '> 2%'] },
			"rem": ['16px'],
			"sass": true,
			"import": true,
			"sourcemaps": false,
			"pseudoElements": true,
			"mqpacker": true,
			"minifier": !devBuild
		}
	},

	fonts = {
		in: source + 'fonts/*.*',
		out: dest + 'fonts/'
	},

	js = {
		in: source + 'js/**/*',
		out: dest + 'js/'
		// filename: 'main.js'
	},

  jsLibs = {
    in: source + 'lib/**/*',
    out: dest + 'lib/'
    // filename: 'main.js'
  },

	syncOpts = {
		server: {
			baseDir: dest,
			index: 'index.html'
		},
		open: false,
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
	var page = gulp.src(html.in).pipe($.preprocess({ context: html.context }));
	if (!devBuild) {
		page = page
			.pipe($.size({ title: 'HTML in' }))
			.pipe($.htmlclean())
			.pipe($.size({ title: 'HTML out' }));
	}
	return page.pipe(gulp.dest(html.out));
});

// manage images
gulp.task('images', function() {
	return gulp.src(images.in)
		.pipe($.newer(images.out))
		.pipe($.imagemin())
		.pipe(gulp.dest(images.out));
});

// convert inline images to dataURIs in SCSS source
// gulp.task('imguri', function() {
// 	return gulp.src(imguri.in)
// 		.pipe($.imagemin())
// 		.pipe($.imacss(imguri.filename, imguri.namespace))
// 		.pipe(gulp.dest(imguri.out));
// });

// copy fonts
gulp.task('fonts', function() {
	return gulp.src(fonts.in)
		.pipe($.newer(fonts.out))
		.pipe(gulp.dest(fonts.out));
});

// compile Sass
gulp.task('sass', [], function() {
	return gulp.src(css.in)
		.pipe($.sourcemaps.init())
		.pipe($.sass(css.sassOpts))
		.pipe($.size({title: 'CSS in '}))
		.pipe($.pleeease(css.pleeeaseOpts))
		.pipe($.sourcemaps.write('./maps'))
		.pipe($.size({title: 'CSS out '}))
		.pipe(gulp.dest(css.out))
		.pipe(browsersync.reload({ stream: true }));
});

// js tasks
gulp.task('js', function() {
	if (devBuild) {
		return gulp.src(js.in)
			.pipe($.newer(js.out))
			// .pipe($.jshint())
			// .pipe($.jshint.reporter('default'))
			// .pipe($.jshint.reporter('fail'))
			.pipe(gulp.dest(js.out));
	}
	else {
		del([
			dest + 'js/*'
		]);
		return gulp.src(js.in)
			.pipe($.deporder())
			.pipe($.concat(js.filename))
			.pipe($.size({ title: 'JS in '}))
			.pipe($.stripDebug())
			.pipe($.uglify())
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
      dest + 'js/lib/*'
    ]);
    return gulp.src(jsLibs.in)
      .pipe($.deporder())
      .pipe($.concat(jsLibs.filename))
      .pipe($.size({ title: 'JS libraries in '}))
      .pipe($.stripDebug())
      .pipe($.uglify())
      .pipe($.size({ title: 'JS libraries out '}))
      .pipe(gulp.dest(jsLibs.out));
  }
});

// browser sync
gulp.task('browsersync', function() {
	browsersync(syncOpts);
});

gulp.task('watch', function() {
  // html changes
  gulp.watch(html.watch, ['html', browsersync.reload]);

  // image changes
  gulp.watch(images.in, ['images']);

  // font changes
  gulp.watch(fonts.in, ['fonts']);

  // sass changes
  gulp.watch([css.watch], ['sass']);

  // javascript changes
  gulp.watch(js.in, ['js', browsersync.reload]);

  // javascript libraries changes
  gulp.watch(jsLibs.in, ['jslib', browsersync.reload]);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'sass', 'js', 'jslib', 'browsersync', 'watch']);
