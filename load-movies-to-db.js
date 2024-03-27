(async () => {

  const csv = require('csvtojson')

  const csvFilePath = './database/imdb.csv'

  /**
   * Raw CSV fields:
   * Ranking: string (number)
   * Name: string
   * Year: string (year number in brackets)
   * Minutes: string
   * Genre: string, comma-separated
   * Rating: string (number)
   * Votes: string (number)
   * Gross: string (number)
   */
  const csvObject = await csv().fromFile(csvFilePath)

  const knex = require('./knexfile')

  // Load VSS extension
  const { loadVSSExtention } = require('./load-vss-extension')
  await loadVSSExtention()

  // Migrations
  await knex.migrate.latest()

  // Insert movie entries 1 at a time
  for (let i = 0; i < csvObject.length; i++) {
    await knex('movies').insert({
      movie_title: csvObject[i].Name,
      movie_year: csvObject[i].Year
    })
  }

  const databaseMovies = await knex('movies').select()

  console.log(databaseMovies)

  process.exit()

})()
