require('dotenv').config()
const { mongoose } = require('../database')
const { User } = require('../models')

// connect to database
db = mongoose.connect()

db.once('open', () => {
  let adminParams = {
    email: "admin@admin.admin",
    password: "admin1",
    role: "admin"
  }
  let managerParams = {
    email: "manager@manager.manager",
    password: "manager1",
    role: "manager"
  }
  let basicParams = {
    email: "basic@basic.basic",
    password: "basic1",
    role: "basic"
  }

  Promise.all([
    createUser(adminParams),
    createUser(managerParams),
    createUser(basicParams)
  ]).then(() => process.exit())
})

// create default users for all roles
createUser = params => 
  User.create(params) 
    .then(doc => {
      if(doc) console.log("User created with: " + JSON.stringify(params, null, 2))
    })
    .catch(err => console.error(`ERROR: ${err._message}. \nThis is most likely caused by trying to create already existing documents.`))
