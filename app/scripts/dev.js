const chokidar = require('chokidar')
const path = require('path')
const { exec } = require('child_process')

function relative(p) {
  return path.resolve(__dirname, p)
}

function run(cmd) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      const child = exec(cmd, (err) => {
        if (err) {
          reject(err)
          return
        }

        resolve()
      })

      child.stdout.pipe(process.stdout)
    })
  })
}

const build = run.bind(null, 'babel src/server --out-dir build/server')

function watchServer() {
  let initial = true
  let server
  let wait

  const restart = () => {
    clearTimeout(wait)

    wait = setTimeout(() => {
      if (server) {
        server.kill()
      }

      build().then(() => {
        server = exec(`node ${relative('../build/server/index.js')}`, (error, stdout, stderr) => {
          if (error) {
            // eslint-disable-next-line
            console.log(stderr)
          } else {
            initial = false
          }

          // do not restart if it's the first time
          if (initial) {
            return
          }

          restart()
        })

        server.stdout.pipe(process.stdout)
      })
    }, 300)
  }

  // start webpack
  const webpack = exec(`node_modules/.bin/webpack --config ${relative('../configs/webpack.config.js')} --color`)

  webpack.stdout.pipe(process.stdin)

  // start process
  const watcher = chokidar.watch([
    relative('../src/server')
  ])

  watcher.on('ready', () => {
    restart()

    watcher.on('all', restart)
  })
}

watchServer()
