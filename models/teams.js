const knex = require('../knex')

// Gets all teams in the database
const getAll = () => knex('teams')
  .then(teams => teams)
  .catch(err => Promise.reject(err))

// Creates a team from the given object
const create = body => knex('teams')
  .insert(body)
  .returning('*')
  .then(team => team[0])
  .catch(err => Promise.reject(err))

// Returns the team with the given ID
const getOneTeam = (id, next) => knex('teams')
  .where('id', id).first()
  .then(team => team)
  .catch((err) => {
    next(err)
  })

// Returns the team with the given Name
const getOneTeamByName = (name, next) => knex('teams')
  .where('name', name).first()
  .then(team => team)
  .catch((err) => {
    next(err)
  })

// Edits the given ID's team name
const editName = (id, body) => knex('teams')
  .where('id', id).first()
  .update(body)
  .returning('*')
  .then(team => team)
  .catch(err => Promise.reject(err))

// Deletes a team with the given ID
const deleteOne = (id, next) => knex('teams')
  .where('id', id)
  .del()
  .returning('*')
  .then(team => team)
  .catch(err => next(err))

// Returns the team with the given name
const checkName = name => knex('teams')
  .where('name', name).first()
  .then(user => user)
  .catch((err) => {
    Promise.reject(err)
  })

module.exports = {
  getAll,
  create,
  getOneTeam,
  getOneTeamByName,
  deleteOne,
  editName,
  checkName
}