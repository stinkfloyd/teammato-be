require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const teams = require('../models/teams')
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

router.post('/', jwtVerify, (req, res, next) => {
  const newTeam = { ...req.body, creator: req.payload.id }
  teams.create(newTeam).then((response) => {
    res.send(response)
  })
})

module.exports = router