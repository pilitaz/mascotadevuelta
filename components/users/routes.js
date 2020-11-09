const express = require('express')
const enrutador = express.Router()
const User = require('./model')

/**
 * devuelve la lista completa de usuarios
 */
enrutador.get('/', (solicitud, respuesta) => {
  User.find((err, users) => {
    if (err) {
      respuesta.status(500).send('No pude cargar los usuarios')
    } else {
      respuesta.send(users)
    }
  })
})
/**
 * devuelve la información de un solo usuario
 */
enrutador.get('/:email', (solicitud, respuesta) => {
  User.find({ email: solicitud.params.email }, (err, user) => {
    if (err) {
      respuesta.status(500).send('No pude cargar el usuario')
    } else {
      respuesta.send(user)
    }
  })
})

/**
 * Crea un usuario o multiples usuarios
 */
enrutador.post('/', (solicitud, respuesta) => {
  const newUser = new User(solicitud.body);

  newUser.save((error, estado) => {
    console.log("error", error);
    console.log("estado", estado)
    respuesta.send(estado)
  })
})

/**
 * actualiza un usuario o multiples usuarios
 */
enrutador.put('/', (solicitud, respuesta) => {  
  User.updateOne({email: solicitud.body.email}, solicitud.body, (err, user) => {
    if (err) {
      respuesta.status(500).send('No pude cargar el usuario')
    } else {
      respuesta.send(user)
    }
  })
})

enrutador.delete('/:email', (solicitud, respuesta) => {
  User.findOneAndDelete({ email: solicitud.params.email }, (err, user) => {
    if (err) {
      respuesta.status(500).send('No pude eliminar el usuario')
    } else {
      respuesta.send("usuario eliminado")
    }
  })
})


module.exports = enrutador;