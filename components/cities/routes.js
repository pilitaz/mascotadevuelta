const express = require('express')
const enrutador = express.Router()
const City = require('./model')

/**
 * 
 */
enrutador.get('/', (solicitud, respuesta) => {
  City.find((err, cities) => {
    if (err) {
      respuesta.status(500).send('No pude cargar las ciudades')
    } else {
      respuesta.send(cities)
    }
  })
})

module.exports = enrutador;