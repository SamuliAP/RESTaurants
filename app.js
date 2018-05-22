require('dotenv').config()    // dotenv for setting environment variables in .env
require('./database/connect') // mongoose database connection
const express          = require('express')
const app              = express()
const helmet           = require('helmet')
const bodyParser       = require('body-parser')
// TODO: middleware for parsing response bodies
const expressSanitizer = require('express-sanitizer')
const serverPort       = process.env.PORT || 3000

// Application middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())
app.use(expressSanitizer())

// API routes

app.listen(serverPort, console.log(`The server is listening in port ${serverPort}`))