module.exports = {

  loadVSSExtention: async function() {

    const knex = require('./knexfile')
    const path = require('path')
    const sqliteVSSVectorPath = path.join(__dirname, 'node_modules', 'sqlite-vss-darwin-arm64', 'lib', 'vector0')
    const sqliteVSSPath = path.join(__dirname, 'node_modules', 'sqlite-vss-darwin-arm64', 'lib', 'vss0')

    const knexConnection = await knex.client.acquireConnection()

    knexConnection.loadExtension(sqliteVSSVectorPath, (err) => {
      if (err) {
        console.error('Error loading vector0 extension:', err)
        return
      }

      knexConnection.loadExtension(sqliteVSSPath, (err) => {
        if (err) {
          console.error('Error loading VSS extension:', err)
        } else {
          console.log('VSS extension loaded successfully.')
        }
      })
    })

    knex.client.releaseConnection(knexConnection)

  }

}
