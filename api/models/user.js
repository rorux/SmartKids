const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  subjects: {
    type: Array
  },
})

module.exports = model('User', userSchema)