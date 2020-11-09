const express = require('express')
const enrutador = express.Router()
const State = require('./model')

/**
 * 
 */
enrutador.get('/', (solicitud, respuesta) => {
  State.find((err, states) => {
    if (err) {
      respuesta.status(500).send('No pude cargar los departamentos')
    } else {
      respuesta.send(states)
    }
  })
})

module.exports = enrutador;