const mongoose = require('mongoose')

const petReportSchema = new mongoose.Schema({
  reportType: {type: String, required: true},
  petType: {type: String, required: true},
  name: String,
  breed: String,
  gender: {type: String, required: true},
  age: String,
  size: String,
  castrated: String,
  chip: Boolean,
  petPic: String,
  additionalFeatures: [],
  eventDate: {type: Date, required: true},
  eventDescription: String,
  country: String,
  state: String,
  city: {type: String, required: true},
  neighborhood: String,
  reward: Boolean,
  rewardValue: Number,
  comments: [],
  // user: {type: String, required: true },
  publicPhone: Boolean,
  timestamp: Date,
  closed: Boolean,
  successful: Boolean,
  endNote: String
})

const PetReport = mongoose.model('petreports', petReportSchema)

module.exports = PetReport