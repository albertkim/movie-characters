const path = require('path')
const knex = require('./knexfile')
const { LocalIndex } = require('vectra')

// Initialize Vectra local vector database
const vectraIndex = new LocalIndex(path.join(__dirname, 'database', 'vectra'))

// How many similar characters to retrieve
const count = 10

module.exports = {

  searchSimilarCharacters: async function(characterId) {

    const character = await knex('characters').where('character_id', characterId).first()

    if (!character || !character.character_journey_vector) {
      return []
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

    const characters = await knex('characters')
      .whereIn('character_id', characterIds)
      .leftJoin('movies', 'characters.movie_id', 'movies.movie_id')
      .select('characters.*', 'movies.movie_id', 'movies.movie_title', 'movies.movie_synopsis')

    const finalResults = results
      .filter((result) => result.item.metadata.character_id !== characterId)
      .map((result) => {
        const matchingCharacter = characters.find(character => character.character_id === result.item.metadata.character_id)
        return {
          character_id: matchingCharacter.character_id,
          character_name: matchingCharacter.character_name,
          movie_id: matchingCharacter.movie_id,
          movie_title: matchingCharacter.movie_title,
          character_journey: matchingCharacter.character_journey,
          movie_synopsis: matchingCharacter.movie_synopsis,
          score: result.score
        }
      })

    return finalResults

  }

}
