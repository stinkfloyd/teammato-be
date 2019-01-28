/* eslint-disable import/order */
require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')


const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const profileRouter = require('./routes/profile')
const teamsRouter = require('./routes/teams')
const goalRouter = require('./routes/goal')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect(`https://${req.get('host')}${req.url}`)
  }
  return next()
}

app.use(requireHTTPS)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200")
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  next()
})

app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)
app.use('/teams', teamsRouter)
app.use('/goal', goalRouter)

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

module.exports = { app: app, server: server }
