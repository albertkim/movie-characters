(async () => {

  const openai = require('./openai')

  const knex = require('./knexfile')

  // Load VSS extension
  const { loadVSSExtention } = require('./load-vss-extension')
  await loadVSSExtention()

  // Migrations
  await knex.migrate.latest()

  const characters = await knex('characters').select()

  for (let i = 0; i < characters.length; i++) {

    const character = characters[i]

    if (character.character_journey) {
      const embeddings = await openai.getEmbeddings(character.character_journey)

      let vector = new Float32Array(embeddings)
      let buffer = Buffer.from(vector.buffer)

      console.log('Got embeddings for:', character.character_name)

      await knex('characters').update({
        character_journey_vector: buffer
      }).where('id', character.id)

      await knex('vss_characters_2').insert({
        rowid: character.id,
        character_journey_vector: embeddings
      })

      console.log(`Inserted vector for ${character.id}:`, character.character_name)
    }

  }

  process.exit()

})()
