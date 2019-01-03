const express = require('express')
const bcrypt = require('bcrypt')
const user = require('../models/user')
const validation = require('../models/validation')

const router = express.Router()

/*
 *  Middleware
 */
const validateBody = (req, res, next) => {
  const result = validation.validate(req.body)
  if (result === false) {
    const err = new Error()
    err.status = 401
    err.message = "Not a valid New User Request"
    next(err)
  } else {
    next()
  }
}

const hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      // Store hash in req
      req.body.password = hash
      next()
    })
    .catch(err => next(err))
}


/*
 *  GET ALL USERS. Dev only.
 */
router.get('/', (req, res, next) => {
  user.getAll()
    .then((allUsers) => { res.send(allUsers) })
})
/*
 *  POST NEW USER.
 */
router.post('/', validateBody, hashPassword, (req, res, next) => {
  user.create(req.body)
    .then((createdUser) => { res.send(createdUser) })
    .catch(err => res.status(401).send(err))
})

router.get('/:password', (req, res, next) => {

})

module.exports = router
