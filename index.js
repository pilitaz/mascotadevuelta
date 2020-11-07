const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userPath = require('./components/users/routes')
const User = require('./components/users/model')
const countryPath = require('./components/countries/routes')
const Country = require('./components/countries/model')

mongoose.connect('mongodb://127.0.0.1:27017/mascotadevuelta', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Conexión exitosa con la base de datos')
})

app.use('/users', userPath)
app.use('/countries', countryPath)

app.listen(3000, () => {
  console.log('Aplicación corriendo en http://localhost:3000')
})
