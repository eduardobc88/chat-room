const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Message = new Schema({
  message_from: { type: String, trim: true, required: true },
  message_content: { type: String, trim: true, required: true },
  message_date: { type: String, required: true },
  // message_rom_slug: { type: String, required: true },
}, {
  collection: 'message'
})

Message.virtual('model_name').get(() => {
  return 'message'
})

Message.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Message', Message)
