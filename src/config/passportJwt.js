const secret = require('./secretKey')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authheader = req.headers.authorization

  if (!authheader)
    return res.status(403).json({ error: 'Token not provided' })

  const parts = authheader.split(' ')
  if (parts.length !== 2)
    return res.status(403).json({ error: 'Token error' })
  
  const [schema, token] = parts
  if (!/^Bearer$/i.test(schema))
    return res.status(403).json({ error: 'Token malformatted' })

  jwt.verify(token, secret.key, (error, decoded) => {
      if (error)
        return res.status(403).json({ error: 'Token invalid' })
      
      req.user = decoded
      return next()
  })
}