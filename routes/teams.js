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
// Creates a team
router.post('/', jwtVerify, (req, res, next) => {
  console.log("req.payload: ", req.payload)
  const newTeam = {
    name: req.body.name.toLowerCase(),
    creator: req.payload.id,
    creator_username: req.payload.username.toLowerCase()
  }
  console.log("newTeam:", newTeam)
  teams.create(newTeam).then((response) => {
    if (!response) {
      return next(response)
    } else {
      console.log("yo")
      req.team = response
      return addOwnerToTeam(req, res, next)
    }
  })
    .catch(err => res.status(401).send(err))
})

router.get('/team/:id', jwtVerify, (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  teams.getOneTeam(id, next).then((team) => {
    if (!team) {
      const err = new Error()
      err.status = 404
      err.message = "Team ID does not exist"
      res.status(401).send(err)
    } else {
      team.username = req.payload.username
      res.send(team)
    }
  })
    .catch(err => res.status(401).send(err))
})

// ADDS A USER TO A TEAM
router.post('/join', jwtVerify, (req, res, next) => {
  teams.getOneTeamByName(req.body.name, next)
    .then((response) => {
      if (!response) {
        const err = new Error()
        err.status = 404
        err.message = `Team does not exist`
        return next(err)
      } else {
        req.team = response
        return teams.checkUser(response.id, req.payload.id)
          .then((response) => {
            if (response.length > 0) {
              const err = new Error()
              err.status = 401
              err.message = `Already on team`
              return next(err)
            } else {
              const newTeamMember = {
                team_id: req.team.id,
                user_id: req.payload.id,
                team_creator: false
              }
              return teams.addUserToTeam(newTeamMember)
                .then(response => res.send(response))
                .catch(error => next(error))
            }
          })
      }
    })
    .catch((err) => { next(err) })
})
// gets all teams created by user
router.get('/created', jwtVerify, (req, res, next) => {
  teams.getCreated(req.payload.id)
    .then(teams => res.send(teams))
    .catch(err => res.status(401).send(err))
})
// gets all teams joined but not created by user
router.get('/joined', jwtVerify, (req, res, next) => {
  const teamNames = []
  const joinedTeams = []
  teams.getJoined(req.payload.id)
    .then((teamList) => {
      teamList.forEach((team) => {
        if (!team.team_creator) {
          joinedTeams.push(team.team_id)
        }
      })
      return teams.getTeamNamesById(joinedTeams)
        .then(result => res.send(result))
        .catch(err => res.status(401).send(err))
    })
    .catch(err => res.status(401).send(err))
})

const addOwnerToTeam = async (req, res, next) => {
  const creator = {
    team_id: req.team.id,
    user_id: req.team.creator,
    team_creator: true
  }
  teams.addUserToTeam(creator)
    .then(response => res.send(response))
}


module.exports = router