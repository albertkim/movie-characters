(async () => {

  const path = require('path')
  const openai = require('./openai')
  const knex = require('./knexfile')
  const { LocalIndex } = require('vectra')

  // Migrations
  await knex.migrate.latest()

  // Initialize Vectra local vector database
  const vectraIndex = new LocalIndex(path.join(__dirname, 'database', 'vectra'))

  if (!await vectraIndex.isIndexCreated()) {
    await vectraIndex.createIndex()
  }

  const characters = await knex('characters').select()

  for (let i = 0; i < characters.length; i++) {

    const character = characters[i]

    if (character.character_journey) {
      const embeddings = await openai.getEmbeddings(character.character_journey)

      let vector = new Float32Array(embeddings)
      let buffer = Buffer.from(vector.buffer)

      console.log('Got embeddings for:', character.character_name)

      // Store embeddings in characters db for lookup reference
      await knex('characters').update({
        character_journey_vector: buffer
      }).where('id', character.id)

      // Also store them in the vector database for searching
      await vectraIndex.insertItem({
        vector: embeddings,
        metadata: {
          character_id: character.id
        }
      })

      console.log(`Inserted vector for ${character.id}:`, character.character_name)
    }

  }

  process.exit()

})()
