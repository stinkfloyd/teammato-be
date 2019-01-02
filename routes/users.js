const express = require('express')
const user = require('../models/user')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/', (req, res, next) => {
  user.create(req.body)
    .then(res => console.log("res:", res))
})

module.exports = router
