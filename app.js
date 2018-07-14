// ------------------------------------
// External modules
// ------------------------------------

// provide access to process.env
require('dotenv').config()

const express          = require('express'),
      helmet           = require('helmet'),
      bodyParser       = require('body-parser'),
      expressSanitizer = require('express-sanitizer'),
      session          = require('express-session'),
      csurf            = require('csurf')
      cors             = require('cors')

// ------------------------------------
// Internal modules
// ------------------------------------
const routes          = require('./routes'),
      { mongoose }    = require('./database'),
      { hbs }         = require('./viewEngine'),
      { error }       = require('./controllers/apiControllers/responses'),
      envVarValidator = require('./utils/envVarValidator'),
      { xssMiddleware, noSqlMiddleware } = require('./middleware')

// Application port
const PORT = process.env.PORT || 3000

// Initialize App
const app = express()

// ------------------------------------
// View engine
// ------------------------------------
hbs.initialize(app)

// serve assets for views
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client/build'));

// ------------------------------------
// Application level middleware
// ------------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.use(expressSanitizer())

// session
let sess = {
  secret: 'extremely 9aYN9Alkjl secretive kkjfang665 secret J34KkMM',
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

// csrf-protection
app.use(csurf())

// allow origins, need to do this for the react client
app.use(cors())

// ------------------------------------
// Custom application level middleware
// ------------------------------------
// sanitize all request bodies, request URI:s are sanitized in specific routes
app.use(xssMiddleware.sanitizeBody)
app.use(noSqlMiddleware.sanitizeBody)

// ------------------------------------
// App routes, registered in order of the routes -array
// ------------------------------------

// catch errors caused by application middelware before routes
app.use((err, req, res, next) => {

  // unknown error, respond with server error
  if (err.code !== 'EBADCSRFTOKEN') {
    error.create(res, next, error.type.SERVER)  
  }

  // error thrown by csurf, invalid csrf-token
  error.create(res, next, error.type.NOTPERMITTED, {
    message: "invalid csrf-token received"
  })
})

app.use(routes)

// ------------------------------------
// connect to database and start listening only if the environment is configured correctly
// ------------------------------------
if(envVarValidator.validate()) {
  let db = mongoose.connect()

  // start listening once database is connected
  db.once('open', () => app.listen(PORT, console.log(`The server is listening in port ${PORT}`)))
}