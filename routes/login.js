const express = require('express')
const bcrypt = require('bcrypt')
const user = require('../models/user')
const validation = require('../models/validation')

const router = express.Router()

/*
 *  Middleware Functions
 */

const checkUsername = (req, res, next) => {
  user.getOneUser(req.body.username)
    .then(async (result) => {
      if (!result) {
        const err = new Error()
        err.status = 401
        err.message = "Username not found"
        next(err)
      } else {
        req.user = result
        next()
      }
    })
    .catch(err => next(err))
}
const checkPassword = async (req, res, next) => {
  const valid = await validation.checkPassword(req.body.password, req.user.password)
  if (valid) {
    next()
  } else {
    const err = new Error()
    err.status = 401
    err.message = "Incorrect Password"
    next(err)
  }
}

router.post('/', checkUsername, checkPassword, (req, res, next) => {
  res.send(req.user)
})

module.exports = router