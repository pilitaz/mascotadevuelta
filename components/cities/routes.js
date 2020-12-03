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

enrutador.get('/:state', (req, res) => {
  City.find({ state: req.params.state }, (err, cities) => {
    if (err) {
      res.status(500).send('No pude cargar las ciudades')
    } else {
      res.send(cities)
    }
  })
})

module.exports = enrutador;