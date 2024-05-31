/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*',
    './src/js/**/*.js',],
  theme: {
    extend: {},
  },
  plugins: ['tailwindcss', 'autoprefixer'],
}

