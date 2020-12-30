const port = 3030
const middlewares = require('./config/middlewares.js')
const routes = require('./routes/routes.js')
const app = require('express')()

middlewares(app)
routes(app)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.json({ error: error.message })
})

app.listen(port, () => {
  console.log(`
App running at port:
-> http://localhost:${port}`)
})


