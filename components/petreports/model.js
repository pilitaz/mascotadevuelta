const mongoose = require('mongoose')

const petReportSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  reportType: String,
  petType: String,
  name: String,
  breed: String,
  gender: String,
  age: Number,
  size: String,
  chip: Boolean,
  chipNumber: String,
  photos: [],
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