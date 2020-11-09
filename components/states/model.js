const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
  name: String,
  country: String
})

const State = mongoose.model('states', stateSchema)

module.exports = State