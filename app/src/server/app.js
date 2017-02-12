const express = require('express')

function main() {
  const app = express()

  app.use('/', (req, res) => {
    res.send('Hello!')
  })

  // NOTE: async/await also works
  // app.use('/', async (req, res, next) => {
  //   await next()
  // })

  app.listen(8080, () => {
    // eslint-disable-next-line
    console.log(`listen ${8080}`)
  })
}

module.exports = main
