const mongoose = require('mongoose')
const { user, pass, host, port, db } = require('../config/dbVariables')

const url = `mongodb://${user}:${pass}@${host}:${port}/${db}`
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

mongoose.connect(url, options)
.catch(err => console.log(err))

module.exports = mongoose