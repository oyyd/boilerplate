require('babel-polyfill')

const main = require('./app')

module.exports = main

if (module === require.main) {
  main()
}
