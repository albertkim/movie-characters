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

  const buffer = new Buffer.from(character.character_journey_vector)
  const vector = new Float32Array(buffer.buffer)
  const array = Array.from(vector)

  console.log(array)

  // Search the database for the 10 closest characters by vector distance using sqlite-vss
  // TODO: I CAN'T GET THIS TO WORK, TRYING EVERYTHING!
  const results = await knex.raw(`
    select rowid, distance
    from vss_characters_2
    where vss_search(
      character_journey_vector,
      ?
    )
    limit 10;
  `, buffer)

  console.log(results)

  process.exit(0)

})()
