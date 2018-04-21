const merge = require('webpack-merge')
const prod = require('./webpack.prod.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(prod, {
  plugins: [
    new CopyWebpackPlugin(['src/**/*'])
  ]
})
