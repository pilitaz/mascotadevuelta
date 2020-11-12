const express = require('express')
const enrutador = express.Router()
const { User, PROYECCION } = require('./model')

/**
 * Devuelve la lista completa de usuarios:
 */
enrutador.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).send('No se pudo cargar los usuarios.')
    } else {
      res.send(users)
    }
  })
})
/**
 * Devuelve la información de un solo usuario por email:
 */
enrutador.get('/:email', (req, res) => {
  User.find({ email: req.params.email }, PROYECCION, (err, user) => {
    if (err) {
      res.status(500).send('No pude cargar el usuario.')
    } else {
      res.send(user)
    }
  })
})

/**
 * Crea un usuario o multiples usuarios:
 */
enrutador.post('/', (req, res) => {
  console.log('1', req.body)
  const newUser = new User(req.body[0])
  console.log('2', newUser)
    newUser.save((error, registeredUser) => {
      console.log('3', error)
      if (error) {
        res.status(422).send(error)
      } else {
        let user = registeredUser.toObject()
        delete user.password
        res.status(201).send(user)
      }
  })
})

/**
 * Actualiza un usuario o multiples usuarios:
 */
enrutador.put('/', (req, res) => {  
  User.updateOne({_id: req.body._id}, req.body, (err, updatedUser) => {
    if (err) {
      res.status(500).send('No se pudo actualizar la información del usuario.')
    } else {
      res.send(updatedUser)
    }
  })
})

/**
 * Elimina un usuario por email:
 */
enrutador.delete('/:email', (req, res) => {
  User.findOneAndDelete({ email: req.params.email }, (err, erasedUser) => {
    if (err) {
      res.status(500).send('No se pudo eliminar el usuario.')
    } else {
      res.send("Usuario eliminado.")
    }
  })
})


module.exports = enrutador