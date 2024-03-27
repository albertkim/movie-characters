(async () => {

  const oldKnex = require('./knexfile')

  const newknex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './database/new-database.db'
    },
    migrations: {
      directory: './database/migrations'
    },
    useNullAsDefault: true
  })

  await newknex.migrate.latest()

  await knex.raw(`
  
  `)

  process.exit(0)

})()
