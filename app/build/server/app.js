'use strict';

var express = require('express');

function main() {
  var app = express();

  app.use('/', function (req, res) {
    res.send('Hello!');
  });

  // NOTE: async/await also works
  // app.use('/', async (req, res, next) => {
  //   await next()
  // })

  app.listen(8080, function () {
    // eslint-disable-next-line
    console.log('listen ' + 8080);
  });
}

module.exports = main;