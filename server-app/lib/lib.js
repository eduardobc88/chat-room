const mongoose = require('mongoose')

const UserModel = require('../model/user-model')
const SessionModel = require('../model/session-model')


exports.getUserDataByUserName = async (user_name) => {
  let user = await UserModel.findOne({
      'user_name': user_name,
  })
  return user
}

exports.userHasSession = async (userID) => {
  let session = await SessionModel.find({ 'session.user._id': mongoose.Types.ObjectId(userID.toString()) })
  return session
}

exports.removeUserSessionOnDB = async (userID) => {
  try {
    let session = await SessionModel.find({ 'session.user._id': mongoose.Types.ObjectId(userID.toString()) }).deleteOne()
    if (session.n && session.ok)
      return true

    return false
  } catch (err) {
    return false
  }
}
