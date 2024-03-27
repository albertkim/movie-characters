module.exports.up = async (knex) => {

  await knex.raw(`
    CREATE VIRTUAL TABLE vss_characters_2 USING vss0(\
      character_journey_vector(1536)
    );
  `)

}

module.exports.down = async () => {

}
