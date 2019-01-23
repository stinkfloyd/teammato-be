exports.up = function (knex, Promise) {
  return knex.schema.createTable('goals', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.integer('team_id').notNullable()
    table.foreign(`team_id`).references(`teams.id`).onDelete(`CASCADE`)
    table.string('title').notNullable()
    table.string('desc').notNullable()
    table.integer('creator').notNullable()
    table.foreign(`creator`).references(`users.id`).onDelete(`CASCADE`)
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('goals')
}