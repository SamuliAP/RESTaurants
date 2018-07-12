exports.connect = () => {
  const mongoose = require('mongoose')
  
  mongoose.connect(process.env.DB_URI, {
    dbName : process.env.DB_NAME,
    user   : process.env.DB_USER,
    pass   : process.env.DB_PASS
  })
  
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => console.log(`Mongoose connected at ${process.env.DB_URI}/${process.env.DB_NAME}`))
  return db
}