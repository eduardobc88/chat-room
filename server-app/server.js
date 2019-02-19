const fastify = require('fastify')({ logger: false })
const fastifyStatic = require('fastify-static')
const fastifyFormBody = require('fastify-formbody')
const fastifySession = require('fastify-session')
const fastifyCookie = require('fastify-cookie')
const MongoDBStore = require('connect-mongodb-session')(fastifySession)
const fastifyCors = require('fastify-cors')
const fastifyURLData = require('fastify-url-data')
const fastifyHelmet = require('fastify-helmet')
const pointOfView = require('point-of-view')
const path = require('path')
const ejs = require('ejs')
const io = require('socket.io')(fastify.server)

const socketIO = require('./socket-io')
const APP_CONFIG = require('./config/config')
const mongodb = require('./db/mongodb')
const siteRouter = require('./router/site-router')
const apiRouter = require('./router/api-router')

// mongodb connect
mongodb.connect()

// body parse
fastify.register(fastifyFormBody)

// cors
fastify.register(fastifyCors, {
  origin: APP_CONFIG.domain,
})

// security headers
fastify.register(fastifyHelmet, {
  hidePoweredBy: {
    setTo: 'WordPress',
  },
})

// session store
let mongoDBSessionStore = new MongoDBStore({
  uri: APP_CONFIG.mongoDBURI,
  collection: 'session',
})
fastify.register(fastifyCookie)
fastify.register(fastifySession, {
  secret: APP_CONFIG.appSecret,
  cookie: {
    maxAge: APP_CONFIG.sessionMaxAge,
    expires: APP_CONFIG.sessionMaxAge,
    domain: APP_CONFIG.domain,
    secure: false,
  },
  store: mongoDBSessionStore,
  saveUninitialized: true,
})

// template engine
fastify.register(pointOfView, {
  engine: {
    ejs: ejs,
  },
  options: {
    filename: path.resolve('server-app/view'),
  },
  templates: 'server-app/view',
  includeViewExtension: true,
})

// static directory
fastify.register((instance, opts, next) => {
  instance.register(fastifyStatic, {
    root: path.join(__dirname, '../' + APP_CONFIG.staticFilesPath),
    prefix: APP_CONFIG.staticFilesPrefix,
  })
  next()
})

// support for getting raw URL information from the request
fastify.register(fastifyURLData)

// router website
fastify.register(siteRouter, { prefix: '/' })

// router website dashboard api
fastify.register(apiRouter, { prefix: '/api/v1/' })

// socket.io init
socketIO.init(io)

// listener
fastify.listen(APP_CONFIG.port, APP_CONFIG.ipAddressToListen, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info('Server listening on port: ', address)
})
