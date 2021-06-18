const {
  body
} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.registerValidators = [
  body('login')
  .isLength({
    min: 3,
    max: 10
  })
  .withMessage('Login length must be at least 3 characters')
  .trim()
  .custom(async (value, {
    req
  }) => {

    try {
      const login = req.body.login
      const candidate = await User.findOne({
        login
      })

      if (candidate) {
        return Promise.reject('User with the same login exists')
      } else {
		return true 
	  }

    } catch (e) {
      console.log(e)
    }

  }),

  body('username', 'Username length must be at least 2 characters')
  .isLength({
    min: 2,
    max: 20
  })
  .trim(),
  
  body('password', 'Password length must be at least 3 characters')
  .isLength({
    min: 3,
    max: 20
  })
  .trim(),
]

exports.loginValidators = [
  body('password')
  .isLength({
    min: 3,
    max: 20
  })
  .withMessage('Password length must be at least 3 characters')
  .custom(async (value, {
    req
  }) => {

    try {
      const login = req.body.login
      const candidate = await User.findOne({
        login
      })

      if (candidate) {
        const areSame = await bcrypt.compare(value, candidate.password)

        if (areSame) {
          return true
        } else {
          return Promise.reject('Wrong password')
        }
      } else {
        return Promise.reject('User with this login does not exist')
      }

    } catch (e) {
      console.log(e)
    }

  })
]
