 // Include gulp and plugins
 var
  gulp = require('gulp'),
  chokidar = require('chokidar'),
  del = require('del'),
  // pkg = require('./package.json'),
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
      liveIn: [source + 'lbd/css/bootstrap.min.css', source + 'lbd/css/font-awesome.min.css',
                source + 'lbd/css/jquery.ui.min.css', source + 'lbd/css/jquery.mCustomScrollbar.min.css',
                source + 'lbd/css/material-icons.css', source + 'lbd/css/jquery-ui-1.8.20.custom.css', source + 'lbd/css/*images/**/*'],
      watch: ['lbd/css/**/*.css'],
      liveWatch: ['lbd/css-live/**/*.css'],
      out: dest + 'lbd/css/'
    },
    sassOpts: {
      outputStyle: devBuild ? 'compressed' : 'compressed',
      imagePath: '../img',
      precision: 3,
      errLogToConsole: true
    }
  },

  fonts = {
    in: source + 'lbd/fonts/*.*',
    out: dest + 'lbd/fonts/'
  },

  js = {
    in: source + 'lbd/js/**/*.js',
    liveIn: [source + 'lbd/js/jquery.min.js',
          // source + 'lbd/js/jquery-1.12.4.min.js',
          // source + 'lbd/js/jquery-ui.min.js',
          source + 'lbd/js/jquery-ui-1.10.0.custom.min.js',
          source + 'lbd/js/jquery-ui-slider.min.js',
          source + 'lbd/js/jquery.validate.min.js',
          source + 'lbd/js/underscore-min.js',
          source + 'lbd/js/moment.min.js',
          source + 'lbd/js/bootstrap.min.js',
          source + 'lbd/js/bootstrap-datetimepicker.js',
          source + 'lbd/js/bootstrap-selectpicker.js',
          source + 'lbd/js/bootstrap-checkbox-radio-switch-tags.js',
          source + 'lbd/js/chartist.min.js',
          source + 'lbd/js/bootstrap-notify.js',
          source + 'lbd/js/jquery.bootstrap.wizard.min.js',
          source + 'lbd/js/bootstrap-table.js',
          source + 'lbd/js/fullcalendar.min.js',
          source + 'lbd/js/light-bootstrap-dashboard.js',
          source + 'lbd/js/jquery.mCustomScrollbar.concat.min.js',
          source + 'lbd/js/jquery-ns-autogrow.min.js',
          source + 'lbd/js/countdown.js',
          source + 'lbd/js/ggdrive.js',
          source + 'lbd/js/jquery.MultiFileQuote.js',
          source + 'lbd/js/bootstrap-show-password.min.js',
          source + 'lbd/js/custom.js'],
    out: dest + 'lbd/js/'
  },

  jsLibs = {
    in: source + 'lbd/lib/**/*',
    liveIn: source + 'lbd/lib-live/**/*',
    watch: 'lbd/lib/**/*',
    out: dest + 'lbd/lib/',
    liveOut: dest + 'lbd/lib/lib-live/'
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
    injectChanges: true,
    reloadDelay: 0,
    notify: true
  };

// Clean tasks
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

gulp.task('clean-jsliblive', function() {
  del([
    dest + 'lbd/lib/lib-live/**/*'
  ]);
});

gulp.task('clean-bundle', function(){
  del([dest + 'lbd/css/lbd-bundle.css', dest + 'lbd/js/lbd-bundle.js', dest + 'lbd/lib/plugins-bundle.*']);
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
    .pipe($.newer(dest+ 'lbd/fonts/'))
    .pipe(gulp.dest(dest + 'lbd/fonts/'));
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
    .pipe($.newer(dest + 'lbd/css/'))
    .pipe(cssFilter)
    .pipe($.order([
        'bootstrap.min.css',
        'jquery-ui.theme.min.css',
        'font-awesome.min.css',
        'material-icons.css',
        'jquery.mCustomScrollbar.min.css',
        'jquery-ui-1.8.20.custom.css'
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
    .pipe(gulp.dest(dest + 'lbd/css/'))
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
    .pipe(gulp.dest(dest + 'lbd/css/'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// js tasks
gulp.task('js', function() {
  var jsFilter = $.filter(['**/*.js', '!**/*custom.js'], {restore: true});
  if (devBuild) {
    return gulp.src(js.liveIn)

      // .pipe($.concat(js.filename))
      .pipe($.size({ title: 'JS in '}))
      .pipe($.newer(dest + 'lbd/js/'))
      // .pipe($.deporder())
      // .pipe($.stripDebug())
      .pipe(jsFilter)
      .pipe($.uglify())
      .pipe($.order([
          "jquery.min.js",
          // "jquery-1.12.4.min.js",
          "jquery-ui-1.10.0.custom.min.js",
          // "jquery-ui.min.js",
          'jquery-ui-slider.min.js',
          "jquery.validate.min.js",
          "underscore-min.js",
          "moment.min.js",
          "bootstrap.min.js",
          "bootstrap-datetimepicker.js",
          "bootstrap-selectpicker.js",
          "bootstrap-checkbox-radio-switch-tags.js",
          "chartist.min.js",
          "bootstrap-notify.js",
          // "sweetalert2.js",
          "jquery.bootstrap.wizard.min.js",
          "bootstrap-table.js",
          "fullcalendar.min.js",
          "light-bootstrap-dashboard.js",
          "jquery.mCustomScrollbar.concat.min.js",
          "jquery-ns-autogrow.min.js",
          "ggdrive.js",
          "jquery.MultiFileQuote.js",
          // "bootstrap-select.js",
          "bootstrap-show-password.min.js",
          "countdown.js"
          // "lbd/js/custom.js"
          ]))
      .pipe($.concat('lbd-bundle.js', {rebaseUrls: false}))
      // .pipe($.uglify())
      // .pipe($.gzip({append: false}))
      .pipe(jsFilter.restore)
      .pipe($.size({ title: 'JS out '}))
      .pipe(gulp.dest(dest + 'lbd/js/'));
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

gulp.task('tinymce', function(){
  var htmlFilter = $.filter(['**/*.html', '**/*.md'], {restore: true}),
      cssFilter = $.filter(['**/*.css'], {restore: true}),
      imageFilter = $.filter(['**/*.+(jpg|png|gif|svg)'], {restore: true}),
      jsonFilter = $.filter(['**/*.json'], {restore: true}),
      jsFilter = $.filter(['**/*.js'], {restore: true});

  return gulp.src([source + 'lbd/lib/*tinymce_4.2.5/**/*'])
      .pipe($.size({title: 'tinyMCE in '}))
      .pipe(jsFilter)
      .pipe($.uglify())
      .pipe(jsFilter.restore)
      .pipe(jsonFilter)
      .pipe($.jsonMinify())
      .pipe(jsonFilter.restore)
      .pipe(cssFilter)
      .pipe($.cleanCss({rebase:false}))
      .pipe(cssFilter.restore)
      .pipe(htmlFilter)
      .pipe($.htmlclean())
      .pipe(htmlFilter.restore)
      .pipe(imageFilter)
      .pipe($.imagemin())
      .pipe(imageFilter.restore)
      .pipe($.size({title: 'tinyMCE out '}))
      .pipe(gulp.dest(dest + 'lbd/lib/'));
});

gulp.task('slick-fonts', function(){
  return gulp.src([source + 'lbd/lib/slick-1.6.0/slick/fonts/**/*'])
             .pipe(gulp.dest(dest + 'lbd/lib/fonts/'));
});

// copy js libraries
gulp.task('jsliblive', ['tinymce','slick-fonts'], function() {
  var htmlFilter = $.filter(['**/*.html', '**/*.md'], {restore: true}),
      // toExclude = ['lbd/lib/tinymce_4.2.5/**/*'],
      // includeIgnoredJs = $.filter([toExclude[0] + '.js'], {restore: true}),
      // includeIgnoredCss = $.filter(toExclude[0] + '.css', {restore: true}),
      cssFilter = $.filter(['**/*.css'], {restore: true}),
      imageFilter = $.filter(['**/*.+(jpg|png|gif|svg)'], {restore: true}),
      imageFilter2 = $.filter(['**/*.+(jpg|png|tiff|webp)'], {restore: true}),
      jsonFilter = $.filter(['**/*.json'], {restore: true}),
      jsFilter = $.filter(['**/*.js'], {restore: true});

  if (devBuild) {
    return gulp.src([source + 'lbd/lib/chosen/chosen.jquery.min.js',
                      source + 'lbd/lib/chosen/*.png',
                      source + 'lbd/lib/chosen/chosen.css',
                      source + 'lbd/lib/chosen/ImageSelect.jquery.js',
                      source + 'lbd/lib/chosen/ImageSelect.css',
                      source + 'lbd/lib/jquery-tageditor-master/jquery.tag-editor.min.js',
                      source + 'lbd/lib/jquery-tageditor-master/jquery.tag-editor.css',
                      source + 'lbd/lib/tag_editmaster/js/jquery.tagedit.js',
                      source + 'lbd/lib/tag_editmaster/js/jquery.autoGrowInput.js',
                      source + 'lbd/lib/tag_editmaster/css/jquery.tagedit.css',
                      source + 'lbd/lib/progressbarjs/progressbar.js',
                      source + 'lbd/lib/rateyo/jquery.rateyo.min.js',
                      source + 'lbd/lib/rateyo/jquery.rateyo.min.css',
                      source + 'lbd/lib/bootstrap-tokenfield/bootstrap-tokenfield.min.js',
                      source + 'lbd/lib/bootstrap-tokenfield/css/bootstrap-tokenfield.min.css',
                      source + 'lbd/lib/bootstrap-tokenfield/css/tokenfield-typeahead.min.css',
                      source + 'lbd/lib/bootstrap-select/js/bootstrap-select.js',
                      source + 'lbd/lib/slick-1.6.0/slick/slick.min.js',
                      source + 'lbd/lib/slick-1.6.0/slick/slick.css',
                      source + 'lbd/lib/slick-1.6.0/slick/ajax-loader.gif',
                      source + 'lbd/lib/slick-1.6.0/slick/slick-theme.css',
                      source + 'lbd/lib/jquery-slider-pipe/jquery-ui-slider-pips.js',
                      source + 'lbd/lib/jquery-slider-pipe/jquery-ui-slider-pips.css',
                      source + 'lbd/lib/sweetalert2/dist/sweetalert2.min.css',
                      source + 'lbd/lib/sweetalert2/dist/sweetalert2.min.js',
                      source + 'lbd/lib/validation-engine/jquery.validationEngine-fr.js',
                      source + 'lbd/lib/validation-engine/jquery.validationEngine.js',
                      source + 'lbd/lib/validation-engine/validationEngine.jquery.css',
                      source + 'lbd/lib/matchmedia/matchMedia.js',
                      source + 'lbd/lib/readmore-js/readmore.js'])
      .pipe($.size({title: 'jsLibsLive in '}))
      .pipe($.newer(dest + 'lbd/lib/'))
      .pipe(jsFilter)
      // .pipe($.babel())
      // .pipe($.regenerator())
      .pipe($.uglify())
      .pipe($.order([
          "chosen.jquery.min.js",
          "ImageSelect.jquery.js",
          "progressbar.js",
          "jquery.tagedit.js",
          "jquery.tag-editor.min.js",
          "jquery.autoGrowInput.js",
          "slick.min.js",
          "jquery.rateyo.min.js",
          "bootstrap-tokenfield.min.js",
          "bootstrap-select.js",
          "jquery-ui-slider-pips.js",
          "sweetalert2.min.js",
          "jquery.validationEngine-fr.js",
          "jquery.validationEngine.js",
          "matchMedia.js",
          "readmore.js"
          ]))
      .pipe($.concat('plugins-bundle.js'))
      // .pipe($.uglify())
      .on('error', function (err) { $.util.log($.util.colors.red('[Error]'), err.toString()); })
      // .pipe(webpack())
      .pipe(jsFilter.restore)
/*      .pipe(includeIgnoredJs)
      .pipe($.uglify())
      .pipe(includeIgnoredJs.restore)
*/      .pipe(jsonFilter)
      .pipe($.jsonMinify())
      .pipe(jsonFilter.restore)
      .pipe(cssFilter)
      .pipe($.order([
          "chosen.css",
          "ImageSelect.css",
          "jquery.tag-editor.css",
          "jquery.tagedit.css",
          "slick.css",
          "slick-theme.css",
          "jquery.rateyo.min.css",
          "bootstrap-tokenfield.min.css",
          "jquery-ui-slider-pips.css",
          "sweetalert2.min.css",
          "validationEngine.jquery.css",
          "tokenfield-typeahead.min.css"
        ]))
      .pipe($.concatCss('plugins-bundle.css', {rebaseUrls: false}))
      .pipe($.cleanCss({rebase:false}))
      .pipe(cssFilter.restore)
/*      .pipe(includeIgnoredCss)
      .pipe($.cleanCss({rebase:false}))
      .pipe(includeIgnoredCss.restore)
*/      .pipe(htmlFilter)
      .pipe($.htmlclean())
      .pipe(htmlFilter.restore)
      .pipe(imageFilter)
      .pipe($.imagemin())
      .pipe(imageFilter.restore)
      .pipe($.size({title: 'jsLibsLive out '}))
      .pipe(gulp.dest(dest + 'lbd/lib/'));

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

gulp.task('jslib', function() {
  var toExclude = ['lbd/lib-live/tinymce_4.2.5/**/*'],
      htmlFilter = $.filter(['**/*.html', '**/*.md'], {restore: true}),
      includeIgnoredJs = $.filter(toExclude[0] + '.js', {restore: true}),
      includeIgnoredCss = $.filter(toExclude[0] + '.css', {restore: true}),
      cssFilter = $.filter(['**/*.css'], {restore: true}),
      imageFilter = $.filter(['**/*.+(jpg|png|gif|svg)'], {restore: true}),
      imageFilter2 = $.filter(['**/*.+(jpg|png|tiff|webp)'], {restore: true}),
      jsonFilter = $.filter(['**/*.json'], {restore: true}),
      jsFilter = $.filter(['**/*.js', '!lbd/lib/sweetalert2/src/**/*'], {restore: true});

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
    // port: 3000,
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

  /*// html changes
  gulp.watch(html.watch, ['html', reload]);
  // gulp.watch(html.watch).on('change', reload);

  // image changes
  gulp.watch(images.in, ['images']);

  // font changes
  gulp.watch(fonts.in, ['fonts']);*/

  /*// sass changes
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
  gulp.watch([html.watch], ['html', reload]);

  // image changes
  gulp.watch(images.in, ['images']);

  // font changes
  gulp.watch(fonts.in, ['fonts']);

  // sass changes
  gulp.watch([css.watch], ['sass']);
  // $.watch(css.watch, ['sass']);

  // pluginCSS changes
  gulp.watch([css.pluginCSS.watch], ['css']);
  gulp.watch([css.pluginCSS.liveWatch], ['css']);

  // javascript changes
  gulp.watch(js.in, ['js', reload]);

  // javascript libraries changes
  gulp.watch(jsLibs.in, ['jslib', 'jsliblive', reload]);
  // gulp.watch(jsLibs.in, [ reload]);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'css', 'sass', 'jslib', 'jsliblive', 'js', 'watch', 'serve']);

gulp.task('bundle', ['css', 'js', 'jsliblive']);
