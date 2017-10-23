 // Include gulp and plugins
 var
  gulp = require('gulp'),
  chokidar = require('chokidar'),
  del = require('del'),
  pkg = require('./package.json'),
  $ = require('gulp-load-plugins')({ lazy: true }),
  htmlInjector = require('bs-html-injector'),
  vf = require('vinyl-file'),
  vss = require('vinyl-source-stream'),
  vb = require('vinyl-buffer'),
  webpack = require('webpack'),
  webpackstream = require('webpack-stream'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

// file locations
var
  devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

  source = './',
  dest = devBuild ? 'builds/development/' : 'builds/production/',

  html = {
    partials: [source + '_partials/**/*'],
    in: [source + '*.html'],
    watch: ['*.html', '_partials/**/*'],
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
    watch: ['lbd/sass/**/*.scss'],
    out: dest + 'lbd/css/',
    pluginCSS: {
      in: [source + 'lbd/css/**/*'],
      liveIn: [source + 'lbd/css-live/**/*'],
      watch: ['lbd/css/**/*.css'],
      liveWatch: ['lbd/css-live/**/*.css'],
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

  // js = {
  //   in: [
  //         source + "lbd/js/jquery.min.js",
  //         source + "lbd/js/jquery-ui-1.10.0.custom.min.js",
  //         source + "lbd/js/jquery.validate.min.js",
  //         source + "lbd/js/underscore-min.js",
  //         source + "lbd/js/moment.min.js",
  //         source + "lbd/js/bootstrap.min.js",
  //         source + "lbd/js/bootstrap-datetimepicker.js",
  //         source + "lbd/js/bootstrap-selectpicker.js",
  //         source + "lbd/js/bootstrap-checkbox-radio-switch-tags.js",
  //         source + "lbd/js/chartist.min.js",
  //         source + "lbd/js/bootstrap-notify.js",
  //         source + "lbd/js/sweetalert2.js",
  //         source + "lbd/js/jquery-jvectormap.js",
  //         source + "lbd/js/jquery.bootstrap.wizard.min.js",
  //         source + "lbd/js/bootstrap-table.js",
  //         source + "lbd/js/fullcalendar.min.js",
  //         source + "lbd/js/light-bootstrap-dashboard.js",
  //         source + "lbd/js/jquery.mCustomScrollbar.concat.min.js",
  //         source + "lbd/js/jquery-ns-autogrow.min.js",
  //         source + "lbd/js/bootstrap-select.js",
  //         source + "lbd/lib/lionbars/jquery.lionbars.0.3.min.js",
  //         source + "lbd/lib/progressbarjs/progressbar.js",
  //         source + "lbd/lib/chosen/chosen.jquery.js",
  //         source + "lbd/lib/chosen/ImageSelect.jquery.js",
  //         source + "lbd/lib/jquery-tageditor-master/jquery.tag-editor.js",
  //         source + "lbd/lib/tinymce_4.2.5/tinymce.min.js",
  //         source + "lbd/lib/tinymce_4.2.5/themes/modern/theme.min.js",
  //         source + "lbd/lib/slick-1.6.0/slick/slick.js",
  //         source + "lbd/lib/rateyo/jquery.rateyo.js",
  //         source + "lbd/lib/TimePicki-master/js/timepicki.js",
  //         source + "lbd/lib/bootstrap-tokenfield/bootstrap-tokenfield.min.js",
  //         source + "lbd/lib/emoji-picker-master/lib/js/config.js",
  //         source + "lbd/lib/emoji-picker-master/lib/js/util.js",
  //         source + "lbd/lib/emoji-picker-master/lib/js/jquery.emojiarea.js",
  //         source + "lbd/lib/emoji-picker-master/lib/js/emoji-picker.js",
  //         source + "lbd/lib/shorten/jquery.shorten.1.0.js",
  //         source + "lbd/lib/read-more/readmore.js",

  //         source + "lbd/js/custom.js"

  //       ],
  //   out: dest + 'lbd/js/'
  //   // filename: 'main.js'
  // },

    js = {
    in: source + 'lbd/js/**/*.js',
    liveIn: source + 'lbd/js-live/**/*.js',
    out: dest + 'lbd/js/'
    // filename: 'main.js'
  },

  jsLibs = {
    in: source + 'lbd/lib/**/*',
    out: dest + 'lbd/lib/'
    // filename: 'main.js'
  },

  filesFilters = {
    htmlFilter : $.filter(['**/*.html', '**/*.md'], {restore: true}),
    cssFilter : $.filter(['**/*.css'], {restore: true}),
    jsFilter : $.filter(['**/*.js'], {restore: true}),
    jsonFilter : $.filter(['**/*.json'], {restore: true}),
    imageFilter : $.filter(['**/*.+(jpg|png|gif|svg)'], {restore: true})
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

// Clean tasks
// clean the build folder
gulp.task('clean', function() {
  del([
    dest + '*'
  ]);
});

gulp.task('clean-images', function() {
  del([
    dest + 'lbd/img/**/*'
  ]);
});

gulp.task('clean-html', function() {
  del([
    dest + '**/*.html'
  ]);
});

gulp.task('clean-css', function() {
  del([
    dest + 'lbd/css/**/*'
  ]);
});

gulp.task('clean-js', function() {
  del([
    dest + 'lbd/js/**/*'
  ]);
});

gulp.task('clean-jslib', function() {
  del([
    dest + 'lbd/lib/**/*'
  ]);
});

// build HTML files
gulp.task('html', function() {
  var page = gulp.src(html.in)
             // .pipe($.newer(html.out))
             .pipe($.preprocess({ context: html.context }))
             /*.pipe($.replace(/.\jpg|\.png|\.tiff/g, '.webp'))*/;
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
  var imageFilter2 = $.filter(['**/*.+(jpg|png|tiff|webp)'], {restore: true});
  return gulp.src(images.in)
    .pipe($.size({title: 'images in '}))
    .pipe($.newer(images.out))
    .pipe($.imagemin())
    /*.pipe(imageFilter2)
    .pipe($.webp())
    .pipe(imageFilter2.restore)*/
    .pipe($.size({title: 'images out '}))
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
  var cssFilter = $.filter(['**/*.css'], {restore: true}),
      imageFilter = $.filter(['**/*.+(jpg|png|gif|svg)'], {restore: true}),
      imageFilter2 = $.filter(['**/*.+(jpg|png|tiff|webp)'], {restore: true});
  return gulp.src(css.pluginCSS.liveIn)
    // .pipe($.sourcemaps.init())
    // .pipe($.sass(css.sassOpts))
    .pipe($.size({title: 'CSS in '}))
    // .pipe($.pleeease(css.pleeeaseOpts))
    // .pipe($.sourcemaps.write('./maps'))
    .pipe($.newer(css.pluginCSS.out))
    .pipe(cssFilter)
    .pipe($.order([
        'bootstrap.min.css',
        'jquery-ui.theme.min.css',
        'font-awesome.min.css',
        'material-icons.css',
        'pe-icon-7-stroke.css',
        'jquery.mCustomScrollbar.min.css'
        // 'lbd/lib/lionbars/lionbars.css',
        // 'lbd/lib/chosen/chosen.css',
        // 'lbd/lib/chosen/ImageSelect.css',
        // 'lbd/lib/jquery-tageditor-master/jquery.tag-editor.css',
        // 'lbd/lib/slick-1.6.0/slick/slick.css',
        // 'lbd/lib/slick-1.6.0/slick/slick-theme.css',
        // 'lbd/lib/rateyo/jquery.rateyo.min.css',
        // 'lbd/lib/bootstrap-tokenfield/css/bootstrap-tokenfield.min.css',
        // 'lbd/lib/bootstrap-tokenfield/css/tokenfield-typeahead.min.css',
        // 'lbd/lib/emoji-picker-master/lib/css/emoji.css',
        // 'lbd/lib/TimePicki-master/css/timepicki.css'
      ]))
    .pipe($.concatCss('lbd-bundle.css', {rebaseUrls: false}))
    .pipe($.cleanCss({rebase:false}))
    .pipe(cssFilter.restore)
    .pipe(imageFilter)
    .pipe($.imagemin())
    .pipe(imageFilter.restore)
    /*.pipe(imageFilter2)
    .pipe($.webp())
    .pipe(imageFilter2.restore)*/
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
  var jsFilter = $.filter(['**/*.js', '!**/*custom.js', '!**/jquery.min.js'], {restore: true});
  if (devBuild) {
    return gulp.src(js.liveIn)

      // .pipe($.concat(js.filename))
      .pipe($.size({ title: 'JS in '}))
      .pipe($.newer(js.out))
      // .pipe($.deporder())
      // .pipe($.stripDebug())
      // .pipe(jsFilter)
      // .pipe($.deporder())
      // .pipe($.webpack({
      //   output: {
      //     filename: 'bundle.js',
      //   }
      // }))
      .pipe($.order([
          "jquery.min.js",
          "jquery-ui-1.10.0.custom.min.js",
          "jquery.validate.min.js",
          "underscore-min.js",
          "moment.min.js",
          "bootstrap.min.js",
          "bootstrap-datetimepicker.js",
          "bootstrap-selectpicker.js",
          "bootstrap-checkbox-radio-switch-tags.js",
          "chartist.min.js",
          "bootstrap-notify.js",
          "sweetalert2.js",
          "jquery-jvectormap.js",
          "jquery.bootstrap.wizard.min.js",
          "bootstrap-table.js",
          "fullcalendar.min.js",
          "light-bootstrap-dashboard.js",
          "jquery.mCustomScrollbar.concat.min.js",
          "jquery-ns-autogrow.min.js",
          "bootstrap-select.js",
          // "lbd/lib/lionbars/jquery.lionbars.0.3.min.js",
          // "lbd/lib/progressbarjs/progressbar.js",
          // "lbd/lib/chosen/chosen.jquery.js",
          // "lbd/lib/chosen/ImageSelect.jquery.js",
          // "lbd/lib/jquery-tageditor-master/jquery.tag-editor.js",
          // "lbd/lib/tinymce_4.2.5/js/tinymce/tinymce.min.js",
          // "lbd/lib/slick-1.6.0/slick/slick.js",
          // "lbd/lib/rateyo/jquery.rateyo.js",
          // "lbd/lib/TimePicki-master/js/timepicki.js",
          // "lbd/lib/bootstrap-tokenfield/bootstrap-tokenfield.min.js",
          // "lbd/lib/emoji-picker-master/lib/js/config.js",
          // "lbd/lib/emoji-picker-master/lib/js/util.js",
          // "lbd/lib/emoji-picker-master/lib/js/jquery.emojiarea.js",
          // "lbd/lib/emoji-picker-master/lib/js/emoji-picker.js",
          // "lbd/lib/shorten/jquery.shorten.1.0.js",
          "lbd/js/custom.js"
          ]))
      .pipe($.concat('lbd-bundle.js', {rebaseUrls: false}))
      .pipe($.uglify())
      // .pipe($.gzip({append: false}))
      // .pipe(jsFilter.restore)
      .pipe($.size({ title: 'JS out '}))
      .pipe(gulp.dest(js.out));
  }
  else {
    del([
      dest + 'lbd/js/*'
    ]);
    return gulp.src(js.in)
      .pipe($.newer(js.out))
      // .pipe($.jshint())
      // .pipe($.jshint.reporter('default'))
      // .pipe($.jshint.reporter('fail'))
      .pipe(gulp.dest(js.out));
  }
});

// gulp.task('bundle', function() {
//   return gulp.src('./bundle.config.js')
//     .pipe($.bundleAssets())
//     .pipe(gulp.dest(js.out));
// });

// copy js libraries
gulp.task('jslib', function() {
  var htmlFilter = $.filter(['**/*.html', '**/*.md'], {restore: true}),
      cssFilter = $.filter(['**/*.css'], {restore: true}),
      imageFilter = $.filter(['**/*.+(jpg|png|gif|svg)'], {restore: true}),
      imageFilter2 = $.filter(['**/*.+(jpg|png|tiff|webp)'], {restore: true}),
      jsonFilter = $.filter(['**/*.json'], {restore: true}),
      jsFilter = $.filter(['**/*.js'], {restore: true});
  if (devBuild) {
    return gulp.src(jsLibs.in)
      .pipe($.size({title: 'jsLibs in '}))
      .pipe($.newer(jsLibs.out))
      .pipe(jsFilter)
      // .pipe($.babel())
      // .pipe($.regenerator())
      .pipe($.uglify())
      .on('error', function (err) { $.util.log($.util.colors.red('[Error]'), err.toString()); })
      // .pipe(webpack())
      .pipe(jsFilter.restore)
      .pipe(jsonFilter)
      .pipe($.jsonMinify())
      .pipe(jsonFilter.restore)
      .pipe(cssFilter)
      .pipe($.cleanCss({rebase:false}))
      // .pipe($.concatCss('plugins-bundle.css', {rebaseUrls: false}))
      .pipe(cssFilter.restore)
      .pipe(htmlFilter)
      .pipe($.htmlclean())
      .pipe(htmlFilter.restore)
      .pipe(imageFilter)
      .pipe($.imagemin())
      .pipe(imageFilter.restore)
      /*.pipe(imageFilter2)
      .pipe($.webp())
      .pipe(imageFilter2.restore)*/

      // .pipe($.jshint())
      // .pipe($.jshint.reporter('default'))
      // .pipe($.jshint.reporter('fail'))
      .pipe($.size({title: 'jsLibs out '}))
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
    port: 3000,
    injectChanges: true,
    notify: true

  });

  // return browserSync.watch(dest + '**/*', function (evt, file) {
  //   if (evt === 'change' && file.indexOf('.css') === -1) browserSync.reload();
  //   if (evt === 'change' && file.indexOf('.css') !== -1) vf.read(file).pipe(vss(file)).pipe(vb()).pipe(browserSync.stream());
  // });
// browserSync.watch(html.out + '*.html').on('change', reload);


$.watch([dest + '**/*.css'], $.batch(function (events, done) {
  gulp.start(browserSync.stream(), done);
}));

// browserSync.watch(dest + 'lbd/js/custom.js').on('change', reload);

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


// chokidar.watch(html.watch).on('all', function(){
//   return ['html', reload];
// });

gulp.task('watch', function() {

  // html changes
  gulp.watch([html.watch], ['html', reload]);

  // image changes
  gulp.watch(images.in, ['images']);

  // font changes
  gulp.watch(fonts.in, ['fonts']);

  // sass changes
  gulp.watch([css.watch], ['sass']);

  // pluginCSS changes
  gulp.watch([css.pluginCSS.watch], ['css']);

  // javascript changes
  gulp.watch(js.in, ['js', reload]);

  // javascript libraries changes
  gulp.watch(jsLibs.in, ['jslib', reload]);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'css', 'sass', 'jslib', 'js', 'watch', 'serve']);

// gulp.task('default', ['serve']);
