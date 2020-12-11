const express = require('express')
const enrutador = express.Router()
const PetReport = require('./model')
const { createToken, middleAuthorization } = require('../../utilities/authentication')

/**
 * Devuelve la lista completa de reportes: No requiere token jwt
 */
enrutador.get('/', (req, res) => {
  PetReport.find((err, petReports) => {
    if (err) {
      res.status(500).send('No pude cargar los reportes')
    } else {
      res.send(petReports)
    }
  })
})

/**
 * Devuelve la lista completa de reportes que cumplan  las condiciones de busqueda: No requiere token jwt
 * req.body ejemplo pueden venir  más o menos criterios de busqueda con el mismo nombre que tiene en el schema
 * {
 *  
 *   "petType": "Perro",
 *   "gender": "Macho",
 *   "city": "Bogotá"
 *   
 *}
 */
enrutador.get('/searchReports', (req, res) => {
  PetReport.find(req.body, (err, petReports) => {
    if (err) {
      res.status(500).send('No encontre resultados con los criterios de busqueda')
    } else {
      res.send(petReports)
    }
  })
})

/**
 * Devuelve la información de un solo usuario: No requiere token jwt
 */
enrutador.get('/:id', (req, res) => {
  PetReport.find({ _id: req.params.id }, (err, petReport) => {
    if (err) {
      res.status(500).send('No pude cargar el reporte')
    } else {
      res.send(petReport)
    }
  })
})

/**
 * Crea un reporte de mascota: Requiere token jwt
 */

const multer = require('multer')
const pictureUploader = multer({ dest: 'pet_pics/' })

enrutador.post('/', middleAuthorization, pictureUploader.single('pet_pic'), (req, res) => {
  const newPetReport = new PetReport(req.body)
  if (req.file) {
    newPetReport.pet_pic = `${req.protocol}://${req.get('host')}/${req.file.destination}${req.file.filename}`
  }
  newPetReport.save((error, estado) => {
    if (error !== null) {
      res.status(500).send(error)
    } else {
      res.send(estado)
    }
  })
})

/**
 * Actualiza un reporte de mascota: Requiere token jwt
 */
enrutador.put('/', (req, res) => {
  PetReport.updateOne({ _id: req.body._id }, req.body, (err, petReport) => {
    if (err) {
      res.status(500).send('Cambio nuevo.')
    } else {
      res.send(petReport)
    }
  })
})

module.exports = enrutador;