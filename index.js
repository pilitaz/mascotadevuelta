const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { PORT } = require('./config')
const cors = require('cors')


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

app.use(cors())

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
app.use('/petPics', express.static('petPics'));

app.listen(PORT, () => {
  console.log(`Aplicación corriendo en http://localhost:${PORT}`)
})
