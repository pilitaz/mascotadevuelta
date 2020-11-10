const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  phone: String
})

const User = mongoose.model('users', userSchema)

module.exports = User