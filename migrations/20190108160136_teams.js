exports.up = function (knex, Promise) {
  return knex.schema.createTable('teams', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('name', 255).notNullable().unique().defaultTo('')
    table.integer('creator').notNullable()
    table.foreign(`creator`).references(`users.id`).onDelete(`CASCADE`)
    table.string('creator_username')
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('teams')
}