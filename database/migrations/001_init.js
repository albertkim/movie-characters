module.exports.up = async (knex) => {

  await knex.raw(`
    CREATE TABLE movies (
      movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_type TEXT,
      movie_title TEXT,
      movie_year INT,
      movie_synopsis TEXT,
      movie_story_type TEXT,
      movie_story_type_explanation TEXT
    );
  `)

  await knex.raw(`
    CREATE TABLE characters (
      character_id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_name TEXT NOT NULL,
      movie_id INT NOT NULL,
      character_journey TEXT,
      character_journey_vector BLOB,
      FOREIGN KEY (movie_id) REFERENCES movies(ID)
    );
  `)

}

module.exports.down = async () => {

}
