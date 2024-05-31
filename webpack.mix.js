require("dotenv").config();
const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
require("laravel-mix-versionhash");

mix.js(["src/js/app.js"], "dist/js/app.js").extract();

mix
    .sass("src/scss/app.scss", "dist/css/app.css")
    .setPublicPath("web")
    .options({
        processCssUrls: false,
        postCss: [tailwindcss("./tailwind.config.js")]
    });

// Run BrowserSync Locally, off by default
// if (!mix.inProduction()) {
// 	mix.browserSync({
// 		// Set this to a variable in your .env file containing your local development URL:
// 		proxy: process.env.PRIMARY_SITE_URL,
// 		// Watch for any changes in assets/ and templates/ directories:
// 		files: ['assets/**/*', 'templates/**/*'],
// 	});
// }

// Only run in Production
if (mix.inProduction()) {
    mix.versionHash();
}