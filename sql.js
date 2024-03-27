(async () => {

  const knex = require('./knexfile')

  await knex.migrate.latest()

  await knex.raw(`
    alter table movies rename column id to movie_id;
  `)

  await knex.raw(`
    alter table characters rename column id to character_id;
  `)

  process.exit(0)

})()
