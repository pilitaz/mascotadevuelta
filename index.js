const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userPath = require('./components/users/routes')
const countryPath = require('./components/countries/routes')
const statePath = require('./components/states/routes')
const cityPath = require('./components/cities/routes')
const breedPath = require('./components/breeds/routes')
const petTypePath = require('./components/pettypes/routes')
const petReportPath = require('./components/petreports/routes')

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
