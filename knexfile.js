const knex = require('knex')
require('./load-vss-extension')

const databasePath = './database/database.db'

const config = {

  client: 'sqlite3',
  connection: {
    filename: databasePath
  },
  migrations: {
    directory: './database/migrations'
  },
  useNullAsDefault: true

}

const db = knex(config)

module.exports = db
