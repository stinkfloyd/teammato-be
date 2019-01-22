exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('username', 255).notNullable().unique().defaultTo('')
    table.string('firstName', 255).notNullable().defaultTo('')
    table.string('lastName', 255).notNullable().defaultTo('')
    table.string('password', 255).notNullable().defaultTo('')
    table.string('email', 255).notNullable().unique().defaultTo('')
    table.string('desc', 255).defaultTo('')
    table.string('photoUrl', 255).defaultTo('http://www.placekitten.com/200/200')
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}