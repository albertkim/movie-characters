(async () => {

  const path = require('path')
  const knex = require('./knexfile')
  const { LocalIndex } = require('vectra')

  // Migrations
  await knex.migrate.latest()

  // Initialize Vectra local vector database
  const vectraIndex = new LocalIndex(path.join(__dirname, 'database', 'vectra'))

  // How many similar characters to retrieve
  const count = 10

  const characterId = 80 // Darth Vader

  const character = await knex('characters').where('id', characterId).first()

  if (!character) {
    console.log('Character not found')
    process.exit(1)
  }

  const buffer = new Buffer.from(character.character_journey_vector)
  const vector = new Float32Array(buffer.buffer)
  const array = Array.from(vector)

  // Search the database for the n closest characters by vector distance. Vectra returns an array of objects that look like this:
  /**
   * {
      item: {
        id: '8858db0d-f9de-43a7-a28e-3cbc61e42bc1',
        metadata: object (passed in),
        vector: array (embeddings),
        norm: 1.0000000611974589
      },
      score: number (0 to 1, where 1 is the same as the query vector)
    }
   */
  const results = await vectraIndex.queryItems(array, count)

  const characterIds = results.map(result => result.item.metadata.character_id)

  const characters = await knex('characters').whereIn('id', characterIds)

  const finalResults = results.map((result) => {
    const matchingCharacter = characters.find(character => character.id === result.item.metadata.character_id)
    return {
      character_name: matchingCharacter.character_name,
      character_journey: matchingCharacter.character_journey,
      score: result.score
    }
  })

  console.log(finalResults)

  process.exit(0)

})()
