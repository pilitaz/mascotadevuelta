const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  name: String,
  state: String
})

const City = mongoose.model('cities', citySchema)

module.exports = City