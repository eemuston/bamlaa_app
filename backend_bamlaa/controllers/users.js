const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password, role } = request.body

  const existingUser = await User.findOne({ username })

  if (existingUser){
    return response.status(400).json({ error: 'username must be unique' })
  }

  if (!request.body.password || request.body.password.length < 3) {
    return response.status(400).json({ error: 'password missing or shorter than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    role
  })

  const savedUser = await user.save()
  const savedUserObj = savedUser.toJSON()
  delete savedUserObj.passwordHash
  response.status(201).json(savedUserObj)
})

usersRouter.get('/', async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'not authorized' })
    }
    const users = await User.find({})

    response.json(users)
})

module.exports = usersRouter