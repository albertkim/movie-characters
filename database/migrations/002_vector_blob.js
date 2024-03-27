module.exports.up = async (knex) => {

  await knex.raw(`
    ALTER TABLE characters DROP COLUMN character_journey_vector;
  `)

  await knex.raw(`
    ALTER TABLE characters ADD COLUMN character_journey_vector BLOB;
  `)

}

module.exports.down = async () => {

}
