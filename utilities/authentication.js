const jwt = require('jwt-simple')
const moment = require('moment')
const SECRET = 'mascotadevuelta'

const createToken = (user) => {
  const payload = {
    name: user.name,
    email: user.email,
    expirationDate: moment().add(2, 'hour').unix()
  }
  return jwt.encode(payload, SECRET)
}

const getToken = (authorization) => {
  return authorization.split(' ')[1] //[bearer, token]
}

const validateAuthorization = (authorization) => { // Función que regresa o true o false
  const token = getToken(authorization) // Devuelve el token
  if (token) {
    try {
      const payload = jwt.decode(token, SECRET) // Se decodifica el payload para poder acceder a sus atributos (la información del usuario)
      if (payload.expirationDate < moment().unix()) {
        console.error('Este token ha expirado')
        return false
      }
      return true
    } catch (error) {
      console.error('Error al validar el token ', error)
    }
  }
  return false
}

const currentUser = (authorization) => {
  const token = getToken(authorization)
  if (token) {
    try {
      return jwt.decode(token, SECRET) //Retorna el payload (información) del usuario.
    } catch (error) {
      console.error('Error al obtener datos del usuario actual ', error)
    }
  }
  return {}
}

const middleAuthorization = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization && validateAuthorization(authorization)) {
    next()
  } else {
    res.status(401).send({ mensaje: 'Debe autenticarse para poder realizar la acción' })
  }
}

module.exports = { currentUser, createToken, middleAuthorization, validateAuthorization }
