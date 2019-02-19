const path = require('path')
const dateTime = require('node-datetime')

const socketIO = require('../socket-io')
const lib = require('../lib/lib')
const UserModel = require('../model/user-model')
const MessageModel = require('../model/message-model')
const SessionModel = require('../model/session-model')


exports.postUserData = async (req, res) => {
  try {
      let user = null
      let newUser = new UserModel(req.body)
      let userExist = await lib.getUserDataByUserName(newUser.user_name)
      if (userExist) {
        let userSession = await lib.userHasSession(userExist._id)
        if (userSession.length)
          throw new Error('Username already taken!')
        user = userExist
      } else {
        newUser.user_registration_date = dateTime.create().format('Y-m-d H:M:S')
        user = await newUser.save()
      }
      req.session.user = user
      res.send({
        status_code: 0,
        status_msg: '',
        data: {
          user: user,
        }
      })
    } catch (err) {
      res.send({
        status_code: 1,
        status_msg: err.toString(),
      })
    }
}

exports.getMessagesData = async (req, res) => {
  try {
    let messages = await MessageModel.find()
      .sort({ 'message_date': 'asc' })
    res.send({
      items: messages,
      status_code: 0,
      status_msg: '',
    })
  } catch (err) {
    res.send({
      status_code: 1,
      status_msg: 'Error loading messages',
    })
  }
}

exports.postMessageData = async (req, res) => {
  try {
      let newMessage = new MessageModel(req.body)
      newMessage.message_date = dateTime.create().format('Y-m-d H:M:S')
      let message = await newMessage.save()
      res.send({
        status_code: 0,
        status_msg: 'New message added',
        data: {
          message: message
        }
      })
      socketIO.pushMessage({
        channel: 'new-message',
        data: { data: message },
      })
    } catch (err) {
      res.send({
        status_code: 1,
        status_msg: err.toString(),
      })
    }
}
