const siteController = require('../controller/site-controller')


let routes = [
  {
    method: 'GET',
    url: '*',
    handler: siteController.index,
  },
  {
    method: 'GET',
    url: '/remove-session/',
    handler: siteController.removeSession,
  },
]

let siteRouter = async (fastify, opts, next) => {
  routes.forEach((route) => {
    fastify.route(route)
  })
}

module.exports = siteRouter
