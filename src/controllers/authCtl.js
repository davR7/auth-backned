const modelUser = require('../database/models/userSchema')
const secret = require('../config/secretKey')
const bcript = require('bcrypt')
const jwt = require('jsonwebtoken')

const _this = this

exports.tokenGenerate = (params = {}) => {
  return jwt.sign(params, secret.key, { expiresIn: 86400 })
}

exports.signin = async (req, res, next) => {
   const { email, password } = req.body

   if (!email && password) {
     return res.status(400).send({ error: 'Email is required' })
   } else if (email && !password) {
     return res.status(400).send({ error: 'Password is required' })
   } else if (!email && !password) {
     return res.status(400).send({ error: 'Email and Password is required' })
   }

   const dtUser = await modelUser.findOne({ email })
   if (!dtUser)
     return res.status(400).json({ error: 'Email is not registered' })

   const passIsMatch = await bcript.compare(password, dtUser.password)
   if (!passIsMatch)
     return res.status(400).json({ error: 'Password is invalid' })

   const payload = {
       firstName: dtUser.firstName,
       lastName: dtUser.lastName,
       email: dtUser.email
   }
   
   const token = _this.tokenGenerate(payload)   
   return res.json({ ...payload, token })
}

exports.signup = async (req, res, next) => {
  const user = { ...req.body }

  if (await userModel.findOne({ email: user.email }))
    return res.status(400).json({ error: 'User already exists' })
  
  try {
    await userModel.create(user)
    return res.status(201).send()
  } catch(err){
    next(err)
  }
}

exports.msgLogin = (req, res, next) => {
    return res.json({ msg: "You are logged in. :)" })
}