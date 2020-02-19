const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssCalc = require("postcss-calc")

module.exports = {
  plugins: [
    postcssImport(),
    postcssCalc(),
    postcssPresetEnv({
      stage: 1,
      features: { 'nesting-rules': true }
    })
  ]
}
