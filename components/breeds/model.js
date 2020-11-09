const mongoose = require('mongoose')

const breedSchema = new mongoose.Schema({
  name: String,
  petType: String
})

const Breed = mongoose.model('breeds', breedSchema)

module.exports = Breed