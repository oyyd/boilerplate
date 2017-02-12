const cluster = require('cluster')
const cpuNumber = require('os').cpus().length

const main = require('../build/server/index')


if (cluster.isMaster) {
  const childs = {}

  // eslint-disable-next-line
  function createChild() {
    const child = cluster.fork()

    childs[child.pid] = child

    child.on('exit', () => {
      delete childs[child.pid]
      createChild()
    })
  }

  for (let i = 0; i < cpuNumber; i += 1) {
    createChild()
  }
} else {
  main()
}
