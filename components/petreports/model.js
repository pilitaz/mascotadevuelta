const mongoose = require('mongoose')

const petReportSchema = new mongoose.Schema({
  reportType: String,
  petType: String,
  name: String,
  breed: String,
  gender: String,
  age: Number,
  size: String,
  chip: Boolean,
  chipNumber: String,
  pet_pic: String,
  additionalFeatures: [],
  eventDate: Date,
  eventDescription: String,
  country: String,
  state: String,
  city: String,
  neighborhood: String,
  reward: Boolean,
  rewardValue: Number,
  comments: [],
  user: {type: String, required: true },
  timestamp: Date,
  closed: Boolean,
  successful: Boolean,
  endNote: String
})

const PetReport = mongoose.model('petreports', petReportSchema)

module.exports = PetReport