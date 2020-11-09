const express = require('express')
const enrutador = express.Router()
const PetType = require('./model')

/**
 * 
 */
enrutador.get('/', (solicitud, respuesta) => {
  PetType.find((err, petTypes) => {
    if (err) {
      respuesta.status(500).send('No pude cargar  los tipos de mascota')
    } else {
      respuesta.send(petTypes)
    }
  })
})

module.exports = enrutador;