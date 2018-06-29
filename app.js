// ------------------------------------
// External modules
// ------------------------------------
require('dotenv').config()
const express          = require('express')
const helmet           = require('helmet')
const bodyParser       = require('body-parser')
const expressSanitizer = require('express-sanitizer')
const session          = require('express-session')
const csurf            = require('csurf')
var hbs                = require('express-hbs');

// ------------------------------------
// Internal modules
// ------------------------------------
const routes          = require('./routes')
const mongo           = require('./database')
const envVarValidator = require('./utils/envVarValidator')
const {
  xssMiddleware,
  noSqlMiddleware
} = require('./middleware')

// Application port
const PORT = process.env.PORT || 3000

// Initialize App
const app = express()

// ------------------------------------
// View engine
// ------------------------------------
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: __dirname + '/views/layouts/layout.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// serve assets for handlebars
app.use(express.static(__dirname + '/public'));

// ------------------------------------
// Application level middleware
// ------------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.use(expressSanitizer())

let sess = {
  secret: 'extremely secretive secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1800000 // 30 minutes
  }
}

// Use secure cookies if environment is set to production
// This requires HTTPS
if (process.env.NODE_ENV === 'production' ) {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(session(sess))
//app.use(csurf()) TODO TÄMÄ PÄÄLLE 

// ------------------------------------
// Custom application level middleware
// ------------------------------------
app.use(xssMiddleware.sanitizeBody)
app.use(noSqlMiddleware.sanitizeBody)

// ------------------------------------
// API routes, registered in order of the routes -array
// ------------------------------------
app.use(routes)

// ------------------------------------
// connect to database and start listening only if the environment is configured correctly
// ------------------------------------
if(envVarValidator.validate()) {
  mongo.connect()
  app.listen(PORT, console.log(`The server is listening in port ${PORT}`))
}