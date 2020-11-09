const express = require('express')
const enrutador = express.Router()
const PetReport = require('./model')

/**
 * devuelve la lista completa de reportes
 */
enrutador.get('/', (solicitud, respuesta) => {
  PetReport.find((err, petReports) => {
    if (err) {
      respuesta.status(500).send('No pude cargar los reportes')
    } else {
      respuesta.send(petReports)
    }
  })
})
/**
 * devuelve la información de un solo usuario
 */
enrutador.get('/:id', (solicitud, respuesta) => {
  PetReport.find({ _id: solicitud.params.id }, (err, petReport) => {
    if (err) {
      respuesta.status(500).send('No pude cargar el reporte')
    } else {
      respuesta.send(petReport)
    }
  })
})

/**
 * Crea un reporte de mascota
 */
enrutador.post('/', (solicitud, respuesta) => {
  const newPetReport = new PetReport(solicitud.body);

  newPetReport.save((error, estado) => {
    console.log("error", error);
    console.log("estado", estado)
    respuesta.send(estado)
  })
})

/**
 * actualiza un usuario o multiples usuarios
 */
// enrutador.put('/', (solicitud, respuesta) => {  
//   PetReport.updateOne({email: solicitud.body.email}, solicitud.body, (err, petReport) => {
//     if (err) {
//       respuesta.status(500).send('No pude cargar el usuario')
//     } else {
//       respuesta.send(petReport)
//     }
//   })
// })

module.exports = enrutador;