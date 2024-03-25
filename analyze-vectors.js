(async () => {

  const openai = require('./openai')

  const knex = require('./knexfile')

  const characters = await knex('characters').select()

  for (let i = 0; i < characters.length; i++) {

    const character = characters[i]

    const embeddings = await openai.getEmbeddings(character.character_journey)
    const buffer = Buffer.from(new Float32Array(embeddings).buffer)

    await knex('characters').where('id', character.id).update({
      character_journey_vector: buffer
    })

  }

})()
