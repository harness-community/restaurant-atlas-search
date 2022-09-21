import dbConnection from 'mongoose'

dbConnection.connect(process.env.ATLAS_URI, {
  // when using Atlas, specify the db name in this options object
  dbName: 'sample_restaurants',
  useNewUrlParser: true,
  useUnifiedTopology: true
})

dbConnection.set('debug', function (collectionName, method, query, doc) {
  console.debug("Query: " + JSON.stringify(query))
})

const db = dbConnection.connection

db.once('open', (_) => {
  console.log('Connected to database')
})

db.on('error', (err) => {
  console.error('Mongodb connection error:', err)
})

export default db
