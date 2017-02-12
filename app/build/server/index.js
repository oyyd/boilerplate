'use strict';

require('babel-polyfill');

var main = require('./app');

module.exports = function () {
  setTimeout(function () {
    throw 'err';
  }, 3000);
  main();
};

if (module === require.main) {
  main();
}