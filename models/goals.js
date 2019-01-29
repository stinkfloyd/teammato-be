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
  .catch(err => next(err))

const acceptGoal = (id, username, next) => {
  console.log("here")
  return knex('goals')
    .where('id', id)
    .update({ accepted: true, acceptedBy: username })
    .returning('*')
    .then((goal) => {
      console.log("goal in acceptGoal (model): ", goal[0])
      return goal[0]
    })
    .catch(err => next(err))
}

const completeGoal = (id, username, next) => {
  console.log("here")
  return knex('goals')
    .where('id', id)
    .update({ completed: true, completedBy: username })
    .returning('*')
    .then((goal) => {
      console.log("goal in completeGoal (model): ", goal[0])
      return goal[0]
    })
    .catch(err => next(err))
}

const unCompleteGoal = (id, username, next) => {
  console.log("here")
  return knex('goals')
    .where('id', id)
    .update({ completed: false, completedBy: '', accepted: false, acceptedBy: '' })
    .returning('*')
    .then((goal) => {
      console.log("goal in completeGoal (model): ", goal[0])
      return goal[0]
    })
    .catch(err => next(err))
}

const deleteGoal = id => knex('goals')
  .where('id', id)
  .del()
  .returning('*')
  .then(goal => goal[0])
  .catch(err => Promise.reject(err))


module.exports = {
  create,
  getGoalsForTeam,
  acceptGoal,
  completeGoal,
  unCompleteGoal,
  deleteGoal
}