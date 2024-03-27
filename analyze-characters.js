(async () => {

  const openai = require('./openai')

  const knex = require('./knexfile')

  const movies = await knex('movies').select()

  for (let i = 0; i < movies.length; i++) {

    const movie = movies[i]

    // Can re-run if the script fails
    const existingCharacters = await knex('characters').where('movie_id', movie.movie_id).select()
    if (existingCharacters.length > 0) {
      continue
    }

    const charactersResponse = await openai.getJSONResponse(`
      <Instruction>
        Identify up to 5 characters with significant screentime in the film "${movie.movie_title}". For each character, describe their character journey and development using simple, abstract, universal concepts in 2-3 complete sentences without referencing the setting, genre, or specific names of anything. Be specific with the conflicts they experience using general concepts. Spoilers are okay.

        Example of journeys:

        Gurren Lagann - Simon: Simon starts as a young inexperienced boy who is afraid of the world outside his village. Following the tragic death of his mentor figure, he learns to believe in himself in order to build human society and face ever-challenging foes that want to keep humanity down. By the end Simon learns to not only be a leader but also move on from his powers and let the next generation take over.

        (note that I did not mention Kamina, Gurren Lagann, anti-spirals, or any specifics, but i mention that the enemies specifically want to keep humanity down)
        
        This data will be used to compare characters from various media to help people find new characters they like regardless of media type.
        
        Return in JSON format as an array of character objects:

        {
          characters: [
            {
              character_name: string
              journey: string
            }
          ]
        }
        
      </Instruction>
    `)

    await knex('characters').insert(charactersResponse.characters.map(character => {
      return {
        movie_id: movie.movie_id,
        character_name: character.character_name,
        character_journey: character.journey
      }
    }))

  }

  process.exit()

})()
