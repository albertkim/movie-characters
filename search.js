(async () => {

  const knex = require('./knexfile')
  // Load VSS extension
  const { loadVSSExtention } = require('./load-vss-extension')
  await loadVSSExtention()

  // Migrations
  await knex.migrate.latest()

  const vssVersion = await knex.raw(`
    select vss_version();
  `)

  console.log(vssVersion)

  const characterId = 80 // Darth Vader

  const character = await knex('characters').where('id', characterId).first()

  if (!character) {
    console.log('Character not found')
    process.exit(1)
  }

  // Search the database for the 10 closest characters by vector distance using sqlite-vss
  const results = await knex.raw(`
    select rowid, distance
    from vss_characters_2
    where vss_search(
      character_journey_vector,
      (select character_journey_vector from characters where rowid = 80)
    )
    limit 10;
  `)

  console.log(results)

  process.exit(0)

})()
