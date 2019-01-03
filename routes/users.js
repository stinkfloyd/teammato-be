const express = require('express')
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


/*
 *  GET ALL USERS. Dev only.
 */
router.get('/', (req, res, next) => {
  user.getAll()
    .then((allUsers) => { res.send(allUsers) })
})
/*
 *  POST NEW USER. No validation
 */
router.post('/', validateBody, (req, res, next) => {
  user.create(req.body)
    .then((createdUser) => { res.send(createdUser) })
    .catch(err => res.status(401).send(err))
})

module.exports = router
