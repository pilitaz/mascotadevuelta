const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const PROYECCION = ['name', 'email', 'phone', 'createdAt', 'updatedAt']

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  timestamps: true
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('users', userSchema)

module.exports = { User, PROYECCION }