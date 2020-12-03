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

enrutador.get('/:country', (req, res) => {
  State.find({ country: req.params.country }, (err, states) => {
    if (err) {
      res.status(500).send('No pude cargar las razas')
    } else {
      res.send(states)
    }
  })
})

module.exports = enrutador;