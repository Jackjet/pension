'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // VUE_APP_URL: '"http://39.102.73.127/nankai"',
  // VUE_APP_FILE: '"http://39.102.73.127/resourceLib/"'
  VUE_APP_URL: '"http://106.3.96.60/nankai"',
  VUE_APP_FILE: '"http://106.3.96.60/resourceLib/"'
})
