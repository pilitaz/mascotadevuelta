const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// Conection to database:
require('./dataBase')

// Paths:
const userPath = require('./components/users/routes')
const countryPath = require('./components/countries/routes')
const statePath = require('./components/states/routes')
const cityPath = require('./components/cities/routes')
const breedPath = require('./components/breeds/routes')
const petTypePath = require('./components/pettypes/routes')
const petReportPath = require('./components/petreports/routes')

// Middleware to read json files from the body of collections:
app.use(bodyParser.json())

// Routes declaration in express:
app.use('/users', userPath)
app.use('/countries', countryPath)
app.use('/states', statePath)
app.use('/cities', cityPath)
app.use('/breeds', breedPath)
app.use('/pettypes', petTypePath)
app.use('/petreports', petReportPath)

// Configuring a path and a folder for static files:
app.use('/pet_pics', express.static('pet_pic'))

app.listen(3000, () => {
  console.log('Aplicación corriendo en http://localhost:3000')
})
