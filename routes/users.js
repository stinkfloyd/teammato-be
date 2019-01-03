const express = require('express')
const user = require('../models/user')

const router = express.Router()

/*
 * GET ALL USERS. Dev only.
*/
router.get('/', (req, res, next) => {
  user.getAll()
    .then((allUsers) => { res.send(allUsers) })
})
/*
 * POST NEW USER. No validation
*/
router.post('/', (req, res, next) => {
  console.log("req.body ", req.body)
  user.create(req.body)
    .then((createdUser) => { console.log(createdUser); res.send(createdUser) })
    .catch(err => res.status(401).send(err))
})

module.exports = router
