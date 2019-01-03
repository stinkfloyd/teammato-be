const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/users', usersRouter)

/*
 * Error Handling below
 */
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    error: {
      status: err.status,
      message: err.message
    }
  })
})

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Not found'
    }
  })
})

module.exports = app
