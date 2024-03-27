(async () => {

  const knex = require('./knexfile')

  // Load VSS extension
  const { loadVSSExtention } = require('./load-vss-extension')
  await loadVSSExtention()

  await knex.raw(`
    drop table vss_characters;
  `)

  process.exit(0)

})()
