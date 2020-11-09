const mongoose = require('mongoose')

const petTypeSchema = new mongoose.Schema({
  name: String
})

const PetType = mongoose.model('pettypes', petTypeSchema)

module.exports = PetType