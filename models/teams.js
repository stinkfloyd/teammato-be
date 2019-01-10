const knex = require('../knex')

// Gets all teams in the database
const getAll = () => knex('teams')
  .then(teams => teams)
  .catch(err => Promise.reject(err))

const getCreated = id => knex('teams')
  .where('creator', id)
  .then(teams => teams)
  .catch(err => Promise.reject(err))

const getJoined = id => knex('teams_users')
  .where('user_id', id)
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

const getTeamNamesById = id => knex('teams')
  .select('name', 'id')
  .whereIn('id', id)
  .then(team => team)
  .catch(err => err)

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
  .then(team => team)
  .catch((err) => {
    Promise.reject(err)
  })

// Adds a user to a team.
const addUserToTeam = body => knex('teams_users')
  .insert(body)
  .returning('*')
  .then(response => response)
  .catch(err => Promise.reject(err))

// Deletes a user from a team
const checkUser = (teamId, userId) => knex('teams_users')
  .where('team_id', teamId)
  .andWhere('user_id', userId)
  .then(response => response)
  .catch(err => Promise.reject(err))

module.exports = {
  getAll,
  create,
  getOneTeam,
  getOneTeamByName,
  deleteOne,
  editName,
  checkName,
  addUserToTeam,
  getCreated,
  getJoined,
  checkUser,
  getTeamNamesById
}