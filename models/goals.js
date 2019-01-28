const knex = require('../knex')

// Creates a team from the given object
const create = body => knex('goals')
  .insert(body)
  .returning('*')
  .then(team => team[0])
  .catch(err => Promise.reject(err))

const getGoalsForTeam = (id, next) => knex('goals')
    .where('team_id', id)
    .then(goals => goals)
    .catch(err => err)

module.exports = {
  create,
  getGoalsForTeam
}