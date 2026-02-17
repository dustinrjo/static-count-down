const gulp = require('gulp');
const pug = require('gulp-pug');
const coffee = require('gulp-coffee');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
  pug: 'src/*.pug',
  coffee: 'src/scripts/*.coffee',
  stylus: 'src/styles/*.styl',
  dist: 'docs'
};

// Compile Pug
function html() {
  return gulp.src(paths.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
}

// Compile CoffeeScript
function scripts() {
  return gulp.src(paths.coffee)
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

// Compile Stylus
function styles() {
  return gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest(`${paths.dist}/css`))
    .pipe(browserSync.stream());
}

// Watch files
function watch() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });

  gulp.watch(paths.pug, html);
  gulp.watch(paths.coffee, scripts);
  gulp.watch(paths.stylus, styles);
  gulp.watch(`${paths.dist}/*.html`).on('change', browserSync.reload);
}

// Define complex tasks
const build = gulp.parallel(html, scripts, styles);
const dev = gulp.series(build, watch);

// Export tasks
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.build = build;
exports.watch = dev;
exports.default = dev;
