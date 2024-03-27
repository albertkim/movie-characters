(async () => {

  const knex = require('./knexfile')
  const { loadVSSExtention } = require('./load-vss-extension')

  // Load VSS extension
  await loadVSSExtention()

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

  const vector = character.character_journey_vector

  // Search the database for the 10 closest characters by vector distance using sqlite-vss
  const results = await knex.raw(`
    SELECT
      id,
      character_name,
      character_journey_vector,
      vss(character_journey_vector, x'${vector.toString('hex')}') AS distance
    FROM characters
    WHERE id != ${characterId}
    ORDER BY distance ASC
    LIMIT 10
  `)

  console.log(results)

  process.exit(0)

})()
