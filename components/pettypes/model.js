const mongoose = require('mongoose')

const petTypeSchema = new mongoose.Schema({
  name: String
})

const PetType = mongoose.model('petTypes', petTypeSchema)

module.exports = PetType