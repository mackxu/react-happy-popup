// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default'
          })
        ],
        inject: false,
        extract: 'happy-popup.min.css'
      })
    )
    return config // always return a config.
  }
}