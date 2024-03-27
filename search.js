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
    SELECT
      c.id,
      c.character_name,
      c.character_journey,
      vss_search(CAST(c.character_journey_vector AS BLOB), (SELECT character_journey_vector FROM characters WHERE id = 80)) AS distance
    FROM characters c
    WHERE c.id != 80
    ORDER BY distance ASC
    LIMIT 10;
  `)

  console.log(results)

  process.exit(0)

})()
