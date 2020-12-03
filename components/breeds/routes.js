const express = require('express')
const enrutador = express.Router()
const Breed = require('./model')

/**
 * 
 */
enrutador.get('/', (solicitud, respuesta) => {
  Breed.find((err, breeds) => {
    if (err) {
      respuesta.status(500).send('No pude cargar las razas')
    } else {
      respuesta.send(breeds)
    }
  })
})

enrutador.get('/:petType', (req, res) => {
  Breed.find({ petType: req.params.petType }, (err, breeds) => {
    if (err) {
      res.status(500).send('No pude cargar las razas')
    } else {
      res.send(breeds)
    }
  })
})

module.exports = enrutador;