const { createServer, startListening } = require('rvl-pipe-express')
const { each, always } = require('rvl-pipe')
const packageInfo = require('../package.json')
const states = require('./states')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const status = each(
  always({
    name: packageInfo.name,
    version: packageInfo.version
  })
)

const server = each(
  createServer([
    {
      path: '/',
      middlewares: [cors(), cookieParser(), morgan('common')],
      handlers: [
        { method: 'get', path: '/status', fn: status },
        {
          path: '/states',
          handlers: [
            { method: 'get', path: '/', fn: states.getAllStates },
            { method: 'get', path: '/:state', fn: states.getState }
          ]
        }
      ]
    }
  ]),
  startListening(),
  ctx => {
    console.log('Listening on port', process.env.PORT || 3000)
  }
)

server()
