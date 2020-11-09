const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userPath = require('./components/users/routes')
const User = require('./components/users/model')
const countryPath = require('./components/countries/routes')
const Country = require('./components/countries/model')
const statePath = require('./components/states/routes')
const State = require('./components/states/model')
const cityPath = require('./components/cities/routes')
const City = require('./components/cities/model')
const breedPath = require('./components/breeds/routes')
const Breed = require('./components/breeds/model')
const petTypePath = require('./components/petTypes/routes')
const PetType = require('./components/petTypes/model')
const petReportPath = require('./components/petreports/routes')
const PetReport = require('./components/petreports/model')

mongoose.connect('mongodb://127.0.0.1:27017/mascotaDeVuelta', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Conexión exitosa con la base de datos')
})

app.use(bodyParser.json())
app.use('/users', userPath)
app.use('/countries', countryPath)
app.use('/states', statePath)
app.use('/cities', cityPath)
app.use('/breeds', breedPath)
app.use('/pettypes', petTypePath)
app.use('/petreports', petReportPath)

app.listen(3000, () => {
  console.log('Aplicación corriendo en http://localhost:3000')
})
