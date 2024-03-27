# Introduction

This project uses a database of the top 100 movies from IMDB, analyzes characters specifically by:
- Type of movie (Blake Snyder's 10 types of stories: https://human.libretexts.org/Bookshelves/Theater_and_Film/Playwriting_(Garcia)/01%3A_Chapters/1.07%3A_Types_of_Story)
- Character journeys

It then allows for users to select their favorite characters from any of these movies, and find other movies with characters that go on similar journeys, with little to no regard for genre, setting, budget, or even language.

# TODO

- Include TV shows
- Include Anime

# How to run

1. Set up env file
2. `node load-movies-to-db.js` (optional, if you are adding a new database to the local sqlite instance)
3. `node analyze-movies.js`
4. `node analyze-characters.js`
5. `node analyze-vectors.js`

# Technologies used

Node.js

OpenAI ChatGPT

OpenAI embeddings API
https://platform.openai.com/docs/guides/embeddings/frequently-asked-questions

SQLite

Only use for stories movies and characters

I tried using the following vector database add-on, but I could not get it to work and the repo/README are too outdated
https://github.com/asg017/sqlite-vss

Vectra

Found this locally-run node/typecsript vector database project via Google and Hacker News. Works well with no hassle
https://github.com/Stevenic/vectra
