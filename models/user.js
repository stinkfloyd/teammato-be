const knex = require('../knex')


// Gets all users in the database ## DEV ONLY
const getAll = () => knex('users')
  .then(users => users)
  .catch(err => Promise.reject(err))

// Creates a user from the given object
const create = body => knex('users')
  .insert(body)
  .returning(['username', 'firstName', 'lastName', 'email'])
  .then(user => user)
  .catch(err => Promise.reject(err))


// Returns the user with the given Username
const getOneUser = username => knex('users')
  .where('username', username).first()
  .then(user => user)
  .catch(err => Promise.reject(err))

// Deletes a user with the given username
const deleteOne = username => knex('users')
  .where('username', username)
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