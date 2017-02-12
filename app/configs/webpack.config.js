const path = require('path')

function relative(p) {
  return path.resolve(__dirname, p)
}

module.exports = {
  entry: {
    app: relative('../src/web/index.js'),
  },
  output: {
    path: relative('../build/web'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /.js&/,
      loader: 'babel',
    }]
  },
}
