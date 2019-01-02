const knex = require('../knex')

// Gets all users in the database ## DEV ONLY
const getAll = () => knex('users')
  .then(users => users)
  .catch(err => Promise.reject(err))

// Creates a user from the given object
const create = body => knex('users')
  .insert(body)
  .returning('*')
  .then(user => user)
  .catch(err => Promise.reject(err))

// Returns the user with the given ID
const getOneUser = id => knex('users')
  .where('id', id)
  .then(user => user)
  .catch((err) => {
    Promise.reject(err)
  })

// Deletes a user with the given ID
const deleteOne = id => knex('users')
  .where('id', id)
  .del()
  .returning('*')
  .then(user => user)
  .catch(err => Promise.reject(err))

module.exports = {
  getAll,
  create,
  getOneUser,
  deleteOne
}