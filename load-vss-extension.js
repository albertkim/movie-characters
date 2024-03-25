(async () => {

  const sqlite3 = require('sqlite3').verbose()

  (async () => {
    // Dynamically import the sqlite-vss module
    const sqlite_vss = await import('sqlite-vss')
    
    const db = new sqlite3.Database(':memory:')
    db.loadExtension(sqlite_vss.getLoadablePath(), (err) => {
      if (err) {
        console.error('Error loading VSS extension:', err)
        return
      }
      console.log('VSS extension loaded successfully.')

      // Perform other database initializations here if necessary
      db.close() // Close the database if you're done with setup
    })
  })()

})
