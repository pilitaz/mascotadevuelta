const jwt = require('jwt-simple')
const moment = require('moment')
const SECRET = 'mascotadevuelta'

const crearToken = (user) => {
  const payload = {
    id: user._id,
    nombre: user.nombre,
    fechaDeExpiracion: moment().add(1, 'hour').unix()
  }
  return jwt.encode(payload, SECRET)
}

// Authorization y bearer (preguntas)
const obtenerToken = (authorization) => {
  return authorization.split(' ')[1] //[bearer, token]
}

const validarAutorizacion = (authorization) => { // Función que regresa o true o false
  const token = obtenerToken(authorization) // Devuelve el token
  if (token) {
    try {
      const payload = jwt.decode(token, SECRET) // Se decodifica el payload para poder acceder a sus atributos (la información del usuario)
      if (payload.fechaDeExpiracion < moment().unix()) {
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
  const token = obtenerToken(authorization)
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

  if (authorization && validarAutorizacion(authorization)) {
    next()
  } else {
    res.status(401).send({ mensaje: 'Debe autenticarse para poder realizar la acción' })
  }
}

module.exports = { currentUser, crearToken, middleAuthorization, validarAutorizacion }
