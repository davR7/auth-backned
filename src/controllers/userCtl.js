const userModel = require('../database/models/userSchema')

exports.create = async (req, res, next) => {
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

exports.findUser = async (req, res, next) => {
  const userId = req.params.id

  try {
    const user = await userModel.findOne({_id: userId })
    return res.json(user)
  } catch(err){
    next(err)
  }
}

