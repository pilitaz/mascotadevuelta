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
  
  if (solicitud.body.email !== undefined) {
      const newUser = new User(solicitud.body);
      newUser.save((error, estado) => {
      console.log("error", error);
      console.log("estado", estado)
      respuesta.send(estado)
    })
  } else {
    respuesta.send('No hay datos suficientes para crear un usuario.')
  }
  

})

/**
 * actualiza un usuario o multiples usuarios
 */
enrutador.put('/', (solicitud, respuesta) => {  
  User.updateOne({_id: solicitud.body._id}, solicitud.body, (err, user) => {
    if (err) {
      respuesta.status(500).send('No pude cargar el usuario')
    } else {
      respuesta.send(user)
    }
  })
})

enrutador.delete('/:email', (solicitud, respuesta) => {
  User.findOneAndDelete({ emil: solicitud.params.emil }, (err, user) => {
    if (err) {
      respuesta.status(500).send('No pude eliminar el usuario')
    } else {
      respuesta.send("usuario eliminado")
    }
  })
})


module.exports = enrutador;