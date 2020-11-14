const express = require('express')
const router = express.Router()
const { User, PROYECCION } = require('./model')
const { createToken, middleAuthorization } = require('../../utilities/authentication')

/**
 * Devuelve la lista completa de usuarios: Requiere token jwt (sólo administradores)
 */
router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).send('No se pudo cargar los usuarios.')
    } else {
      res.send(users)
    }
  })
})

/**
 * Devuelve la información de un solo usuario por email: Requiere token jwt
 */
router.get('/:email', (req, res) => {
  User.find({ email: req.params.email }, PROYECCION, (err, user) => {
    if (err) {
      res.status(500).send('No pude cargar el usuario.')
    } else {
      res.send(user)
    }
  })
})


/**
 * Crea un usuario: No requiere token jwt
 */
router.post('/', (req, res) => {
  const newUser = new User(req.body)
    newUser.save((err, registeredUser) => {
      if (err) {
        res.status(422).send(err)
      } else {
        let user = registeredUser.toObject()
        delete user.password
        res.status(201).send(user)
      }
  })
})

router.post('/authentication', (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
    if (err) {
      res.status(500).send(err)
    } else if (user) { // Si el user es encontrado, deberíamos devolver la llave
      res.send({ jwt: createToken(user) })
    } else { // Cuando el user esta vacio, es decir, cuando no se encontró
      res.status(401).send({ err: 'El correo o contraseña no son validos' })
    }
  })
})

/**
 * Actualiza un usuario: Requiere token jwt
 */
router.put('/', middleAuthorization, (req, res) => {  
  User.updateOne({_id: req.body._id}, req.body, (err, updatedUser) => {
    if (err) {
      res.status(500).send('No se pudo actualizar la información del usuario.')
    } else {
      res.send(updatedUser)
    }
  })
})

/**
 * Elimina un usuario por email: Requiere token jwt
 */
router.delete('/:email', middleAuthorization, (req, res) => {
  User.findOneAndDelete({ email: req.params.email }, (err, erasedUser) => {
    if (err) {
      res.status(500).send('No se pudo eliminar el usuario.')
    } else {
      res.send("Usuario eliminado.")
    }
  })
})


module.exports = router