const express = require('express')
const path = require('path')
const knex = require('../knexfile')
const { searchSimilarCharacters } = require('../search')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {

  const movies = await knex('movies').select('*')
  res.render('movies', {
    movies: movies
  })

})

app.get('/movies/:id', async (req, res) => {

  const movieId = parseInt(req.params.id)
  const movie = await knex('movies')
    .select('*')
    .where({ movie_id: movieId })
    .first()
  const characters = await knex('characters')
    .select('*')
    .where({ movie_id: movieId })
    .whereNotNull('characters.character_journey_vector')
  res.render('characters', {
    movie: movie,
    characters: characters
  })

})

app.get('/movies/:id/character/:characterId', async (req, res) => {

  const characterId = parseInt(req.params.characterId)
  const movie = await knex('movies')
    .select('*')
    .where({ movie_id: characterId }).first()
  const character = await knex('characters')
    .select('*')
    .where({ character_id: characterId })
    .first()
  const similarCharacters = await searchSimilarCharacters(characterId)

  res.render('matches', {
    movie: movie,
    character: character,
    similarCharacters: similarCharacters,
  })

})

app.listen(port, () => {

  console.log(`Server is running at http://localhost:${port}`)

})
