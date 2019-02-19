const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema({
  user_name: { type: String, trim: true, required: true, unique: true },
  user_registration_date: { type: String, required: true },
}, {
  collection: 'user'
})

User.virtual('model_name').get(() => {
  return 'user'
})

User.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('User', User)
