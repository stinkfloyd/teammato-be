require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const validation = require('../models/validation')

const router = express.Router()

/*
 *  Middleware Functions
 */

const jwtVerify = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_TOKEN, (err, _payload) => {
    if (err) {
      err.status = 401
      err.message = `Invalid JWT Token`
      return next(err)
    } else {
      req.payload = _payload
      return next()
    }
  })
}

router.get('/', jwtVerify, (req, res, next) => {
  user.getOneUser(req.payload.username).then((user) => {
    const response = { ...user, password: '' }
    res.send(response)
  })
})

module.exports = router