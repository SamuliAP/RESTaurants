const dotenv           = require('dotenv')
const express          = require('express')
const helmet           = require('helmet')
const bodyParser       = require('body-parser')
const expressSanitizer = require('express-sanitizer') // TODO: middleware for parsing response bodies
const routes           = require('./routes')
const PORT             = process.env.PORT || 3000
const mongo            = require('./database')
const envVarValidator  = require('./helpers/envVarValidator')

const app = express()

// enable .env
dotenv.config()

// Application middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.use(expressSanitizer())

// API routes
app.use(...routes)

// connect to database and start listening only if the environment is configured correctly
if(envVarValidator.validate()) {
  mongo.connect()
  app.listen(PORT, console.log(`The server is listening in port ${PORT}`))
}