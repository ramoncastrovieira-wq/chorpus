const { series, src, dest, parallel, watch } = require("gulp");

const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const CleanCSS = require("gulp-clean-css");
const npmdist = require("gulp-npm-dist");
const rename = require("gulp-rename");
const rtlcss = require("gulp-rtlcss");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");

const paths = {
  baseDistAssets: "./apps/static/", // build assets directory
  baseSrcAssets: "./apps/static/",  // source assets directory
};

const vendor = function () {
  const out = paths.baseDistAssets + "vendor/";
  return src(npmdist(), { base: "./node_modules" })
    .pipe(
      rename(function (path) {
        path.dirname = path.dirname.replace(/\/dist/, "").replace(/\\dist/, "");
      })
    )
    .pipe(dest(out));
};

const plugin = function () {
  const outCSS = paths.baseDistAssets + "css/";

  // vendor.min.css
  src([
    // Form Advance Plugin
    paths.baseDistAssets + "vendor/flatpickr/flatpickr.min.css",
    paths.baseDistAssets + "vendor/select2/css/select2.min.css",
    paths.baseDistAssets +
      "vendor/choices.js/public/assets/styles/choices.min.css",
    paths.baseDistAssets + "vendor/quill/quill.core.css",
    paths.baseDistAssets + "vendor/quill/quill.snow.css",
    paths.baseDistAssets + "vendor/quill/quill.bubble.css",
    paths.baseDistAssets + "vendor/dropzone/dropzone.css",
    paths.baseDistAssets + "vendor/flatpickr/flatpickr.min.css",
    paths.baseDistAssets + "vendor/sweetalert2/sweetalert2.min.css",
    paths.baseDistAssets + "vendor/nouislider/nouislider.min.css",
    paths.baseDistAssets + "vendor/leaflet/leaflet.css",
    paths.baseDistAssets + "vendor/jsvectormap/jsvectormap.min.css",
    paths.baseDistAssets +
      "vendor/datatables.net-bs5/css/dataTables.bootstrap5.min.css",
    paths.baseDistAssets +
      "vendor/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css",
    paths.baseDistAssets +
      "vendor/datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css",
    paths.baseDistAssets +
      "vendor/datatables.net-fixedheader-bs5/css/fixedHeader.bootstrap5.min.css",
    paths.baseDistAssets +
      "vendor/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css",
    paths.baseDistAssets +
      "vendor/datatables.net-select-bs5/css/select.bootstrap5.min.css",
    paths.baseDistAssets + "vendor/gridjs/theme/mermaid.min.css",
  ])
    .pipe(concat("vendor.css"))
    .pipe(CleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(outCSS));

  const outjs = paths.baseDistAssets + "js/";

  // vendor.min.js
  return src([
    paths.baseDistAssets + "vendor/jquery/jquery.min.js",
    paths.baseDistAssets + "vendor/bootstrap/js/bootstrap.bundle.min.js",
    paths.baseDistAssets + "vendor/iconify-icon/iconify-icon.min.js",
    paths.baseDistAssets + "vendor/waypoints/lib/jquery.waypoints.min.js",
    paths.baseDistAssets + "vendor/jquery.counterup/jquery.counterup.min.js",
    paths.baseDistAssets + "vendor/simplebar/simplebar.min.js",
    paths.baseDistAssets + "vendor/apexcharts/apexcharts.min.js",
    paths.baseDistAssets + "vendor/fullcalendar/index.global.min.js",
    paths.baseDistAssets + "vendor/quill/quill.js",
    paths.baseDistAssets + "vendor/dragula/dragula.min.js",
    paths.baseDistAssets + "vendor/dropzone/dropzone-min.js",
    paths.baseDistAssets + "vendor/rater-js/index.js",
    paths.baseDistAssets + "vendor/sweetalert2/sweetalert2.min.js",
    paths.baseDistAssets + "vendor/wnumb/wNumb.min.js",
    paths.baseDistAssets + "vendor/nouislider/nouislider.min.js",
    paths.baseDistAssets + "vendor/vanilla-wizard/js/wizard.min.js",
    paths.baseDistAssets + "vendor/gmaps/gmaps.min.js",
    paths.baseDistAssets + "vendor/leaflet/leaflet.js",
    paths.baseDistAssets + "vendor/jsvectormap/jsvectormap.min.js",
    paths.baseDistAssets + "vendor/jsvectormap/maps/world-merc.js",
    paths.baseDistAssets + "vendor/jsvectormap/maps/world.js",
    paths.baseDistAssets + "vendor/datatables.net/js/dataTables.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-bs5/js/dataTables.bootstrap5.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-responsive/js/dataTables.responsive.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-fixedcolumns-bs5/js/fixedColumns.bootstrap5.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-buttons/js/dataTables.buttons.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js",
    paths.baseDistAssets + "vendor/datatables.net-buttons/js/dataTables.buttons.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-buttons/js/buttons.print.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-keytable/js/dataTables.keyTable.min.js",
    paths.baseDistAssets +
      "vendor/datatables.net-select/js/dataTables.select.min.js",
    paths.baseDistAssets + "vendor/gridjs/gridjs.umd.js",

    // Form Advance Plugin
    paths.baseDistAssets + "vendor/flatpickr/flatpickr.min.js", // Flatpickr
    paths.baseDistAssets + "vendor/select2/js/select2.min.js", // select2
    paths.baseDistAssets + "vendor/inputmask/inputmask.min.js", // inputmask
    paths.baseDistAssets +
      "vendor/choices.js/public/assets/scripts/choices.min.js", // choices js
  ])
    .pipe(concat("vendor.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(outjs));
};

const scss = function () {
  const out = paths.baseDistAssets + "css/";

  src([
    paths.baseSrcAssets + "scss/**/*.scss",
    "!" + paths.baseSrcAssets + "scss/icons.scss",
    "!" + paths.baseSrcAssets + "scss/icons/*.scss",
  ])
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError)) // scss to css
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
      })
    )
    .pipe(dest(out))
    .pipe(CleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./")) // source maps
    .pipe(dest(out));

  // generate rtl
  return src([
    paths.baseSrcAssets + "scss/**/*.scss",
    "!" + paths.baseSrcAssets + "scss/icons.scss",
    "!" + paths.baseSrcAssets + "scss/icons/*.scss",
  ])
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError)) // scss to css
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
      })
    )
    .pipe(rtlcss())
    .pipe(rename({ suffix: "-rtl" }))
    .pipe(dest(out))
    .pipe(CleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./")) // source maps
    .pipe(dest(out));
};

const icons = function () {
  const out = paths.baseDistAssets + "css/";
  return src([
    paths.baseSrcAssets + "scss/icons.scss",
    paths.baseSrcAssets + "scss/icons/*.scss",
  ])
    .pipe(sourcemaps.init())
    .pipe(sass.sync()) // scss to css
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
      })
    )
    .pipe(dest(out))
    .pipe(CleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./")) // source maps
    .pipe(dest(out));
};

function watchFiles() {
  watch(paths.baseSrcAssets + "scss/icons.scss", series(icons));
  watch(
    [
      paths.baseSrcAssets + "scss/**/*.scss",
      "!" + paths.baseSrcAssets + "scss/icons.scss",
      "!" + paths.baseSrcAssets + "scss/icons/*.scss",
    ],
    series(scss)
  );
}

// Production Tasks
exports.default = series(
  vendor,
  parallel(plugin, scss, icons),
  parallel(watchFiles)
);

// Build Tasks
exports.build = series(vendor, parallel(plugin, scss, icons));
