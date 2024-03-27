(async () => {

  const openai = require('./openai')

  const knex = require('./knexfile')

  // Load VSS extension
  const { loadVSSExtention } = require('./load-vss-extension')
  await loadVSSExtention()

  const characters = await knex('characters').select()

  for (let i = 0; i < characters.length; i++) {

    const character = characters[i]

    if (character.character_journey) {
      const embeddings = await openai.getEmbeddings(character.character_journey)
      const vectorBuffer = Buffer.from(new Float32Array(embeddings).buffer)

      console.log('Got embeddings for:', character.character_name)

      await knex('vss_characters').insert({
        character_journey_vector: vectorBuffer
      })

      console.log('Inserted vector for:', character.character_name)
    }

  }

  process.exit()

})()
