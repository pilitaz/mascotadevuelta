const mongoose = require('mongoose')
const { MONGODB } = require('./config')

// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

// mongoose.connect('mongodb://127.0.0.1:27017/mascotaDeVuelta', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Conexión exitosa con la base de datos ', MONGODB)
})