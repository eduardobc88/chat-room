const path = require('path')
const dateTime = require('node-datetime')

const lib = require('../lib/lib')


exports.index = async (req, res) => {
  let user = ''
  if(req.session.user)
    user = req.session.user
  res.view('template-app', {
    title: 'Full Stack Developer',
    error_message: '',
    user: user,
  })
}

exports.removeSession = async (req, res) => {
  if(req.session.user)
    await lib.removeUserSessionOnDB(req.session.user._id)
  req.session = {}
  res.redirect('/')
}
