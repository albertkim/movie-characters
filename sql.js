(async () => {

  const knex = require('./knexfile')

  await knex.raw(`
    drop table vss_characters;
  `)

  process.exit(0)

})()
