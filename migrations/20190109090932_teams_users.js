exports.up = function (knex, Promise) {
  return knex.schema.createTable('teams_users', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.integer('team_id').notNullable()
    table.foreign(`team_id`).references(`teams.id`).onDelete(`CASCADE`)
    table.boolean('team_creator').notNullable().defaultTo(false)
    table.integer('user_id').notNullable()
    table.foreign(`user_id`).references(`users.id`).onDelete(`CASCADE`)
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('teams_users')
}