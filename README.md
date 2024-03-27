# Introduction

This project was built for me to learn the concepts of semantic search, embeddings, vectors, and vector databases. It uses a database of the top 100 movies from IMDB, and analyzes characters specifically by:

- Type of movie (Blake Snyder's 10 types of stories: https://human.libretexts.org/Bookshelves/Theater_and_Film/Playwriting_(Garcia)/01%3A_Chapters/1.07%3A_Types_of_Story)
- Character journeys

Example of a character journey (Dorothy from The Wizard of Oz):
```
Dorothy starts as a lost and naive girl who dreams of a better life. Through her adventures, she learns the importance of friendship and courage, ultimately realizing that home is where the heart is.
```

Character journeys are intended to be high level, general, and abstract.

It then allows for users to select their favorite characters from any of these movies, and find other movies with characters that go on similar journeys, with little to no regard for genre, setting, budget, or even language.

# TODO

- Include top n TV shows
- Include top n Anime

# How to run

This repository comes with a built-in SQLite database file (/database/database.db) and a vector database directory (/database/vectra) so you can skip straight to the last step. Will work on both Mac and Windows operating systems.

1. `yarn install`
2. Set up env file (optional, only need if running any of the following non-application scripts below)
3. `node load-movies-to-db.js` (optional, if you are adding a new database to the local sqlite instance)
4. `node analyze-movies.js` (optional, analyzes the synopsis and story type of movies)
5. `node analyze-characters.js` (optional, analyzes key characters from movies and their character journeys)
6. `node analyze-vectors.js` (optional, gets OpenAI embeddings for each character journey)
7. `yarn start` (to run simple, interactive web application - go to http://localhost:3000 after running)

# Technologies used

### Node.js

JS runtime environment

### OpenAI

OpenAI embeddings API
https://platform.openai.com/docs/guides/embeddings/frequently-asked-questions

### SQLite

Only used for stories movies and characters.

I tried using the following vector database add-on, but I could not get it to work and the repo/README are too outdated
https://github.com/asg017/sqlite-vss

### Vectra

Found this locally-run node/typecsript vector database project via Google and Hacker News. Works well with no hassle
https://github.com/Stevenic/vectra
