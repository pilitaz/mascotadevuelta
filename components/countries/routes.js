const express = require('express')
const enrutador = express.Router()
const Country = require('./model')

/**
 * 
 */
enrutador.get('/', (solicitud, respuesta) => {
  Country.find((err, countries) => {
    if (err) {
      respuesta.status(500).send('No pude cargar los paises')
    } else {
      respuesta.send(countries)
    }
  })
})

module.exports = enrutador;