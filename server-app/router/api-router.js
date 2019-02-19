const apiController = require('../controller/api-controller')


let routes = [
  {
    method: 'POST',
    url: '/login/',
    handler: apiController.postUserData,
  },
  {
    method: 'GET',
    url: '/messages/',
    handler: apiController.getMessagesData,
  },
  {
    method: 'POST',
    url: '/message/',
    handler: apiController.postMessageData,
  },
]

let apiRouter = async (fastify, opts, next) => {
  routes.forEach((route) => {
    fastify.route(route)
  })
}

module.exports = apiRouter
