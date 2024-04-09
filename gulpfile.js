const { src, dest, series, parallel, watch } = require('gulp');
const env = process.env.NODE_ENV ?? 'dev';
const packageData = require("./package.json");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const sassglob = require("gulp-sass-glob");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const minify = require("gulp-minify");
const purgecss = require("gulp-purgecss");
const concat = require("gulp-concat");
const rev = require("gulp-rev");
const revDel = require("rev-del");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

function css() {
    const cssFiles = [
        packageData.paths.assets.scss + packageData.files.assets.scss
    ];

    for (let i = 0; i < packageData.cssDependencies.length; i++) {
        cssFiles.unshift(packageData.paths.dependencies + packageData.cssDependencies[i]);
    }

    const plugins = [
        tailwindcss(packageData.files.tailwind),
        autoprefixer()
    ];

    return src(cssFiles)
        .pipe(plumber({ errorHandler: notify.onError("Error [css]: <%= error.message %>") }))
        .pipe(concat(packageData.files.dist.css))
        .pipe(sourcemaps.init())
        .pipe(sassglob())
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write("/"))
        .pipe(dest(packageData.paths.public + packageData.paths.dist.css));
}

function js() {
    return src(packageData.paths.assets.base + packageData.files.assets.js)
        .pipe(plumber({ errorHandler: notify.onError("Error [js]: <%= error.message %>") }))
        .pipe(concat(packageData.files.dist.js))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write("/"))
        .pipe(dest(packageData.paths.public + packageData.paths.dist.js));
}

function minifyCss() {
    return src(packageData.paths.public + packageData.paths.dist.css + packageData.files.dist.css)
        .pipe(plumber({ errorHandler: notify.onError("Error [css]: <%= error.message %>") }))
        .pipe(postcss([cssnano()]))
        .pipe(dest(packageData.paths.public + packageData.paths.dist.css));
}

function minifyJs() {
    return src(packageData.paths.public + packageData.paths.dist.js + packageData.files.dist.js)
        .pipe(plumber({ errorHandler: notify.onError("Error [js]: <%= error.message %>") }))
        .pipe(minify({
            ext: {
                min: ".js"
            },
            noSource: true
        }))
        .pipe(dest(packageData.paths.public + packageData.paths.dist.js));
}

function purgeCss() {
    const whitelistPatterns = packageData.purgeCss.whitelistPatterns.map(pattern => new RegExp(pattern, ""));

    return src(packageData.paths.public + packageData.paths.dist.css + packageData.files.dist.css)
        .pipe(plumber({ errorHandler: notify.onError("Error [purgeCss]: <%= error.message %>") }))
        .pipe(purgecss({
            content: [
                packageData.paths.templates + "**/*.{html,twig,vue}",
                packageData.paths.public + packageData.paths.dist.base + "**/*.{js}"
            ],
            whitelist: packageData.purgeCss.whitelist,
            whitelistPatterns: whitelistPatterns,
            whitelistPatternsChildren: whitelistPatterns,
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }))
        .pipe(dest(packageData.paths.public + packageData.paths.dist.css));
}

function revCssJs(done) {
    return src([
        packageData.paths.public + packageData.paths.dist.css + packageData.files.dist.css,
        packageData.paths.public + packageData.paths.dist.js + packageData.files.dist.js
    ], {
        base: packageData.paths.public + packageData.paths.dist.base
    })
        .pipe(rev())
        .pipe(dest(packageData.paths.public + packageData.paths.dist.base))
        .pipe(rev.manifest({
            base: "./"
        }))
        .pipe(revDel({
            oldManifest: "./rev-manifest.json",
            dest: packageData.paths.public + packageData.paths.dist.base
        }))
        .pipe(dest("./"));
}

function watchFiles(done) {
    watch(["package.json", packageData.files.tailwind, packageData.paths.assets.base + "**/*.{css,scss,vue}"], css);
    watch(["package.json", packageData.paths.assets.base + "**/*.{js,vue}"], js);
    watch(packageData.paths.templates + "**/*.{html,twig}", css);
    done();
}

exports.css = css;
exports.js = js;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
exports.purgeCss = purgeCss;
exports.revCssJs = revCssJs;
exports.watch = watchFiles;

exports.dev = series(parallel(css, js), parallel(watchFiles));

exports.prod = series(
    parallel(css, js),
    minifyCss,
    minifyJs,
    purgeCss,
    revCssJs
);