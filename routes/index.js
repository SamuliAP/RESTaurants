
const express = require('express')
const router  = express.Router()

/* define routes for /api and for /,
 * /api will dispatch with response.send()
 * / will dispatch with response.render()
 */
 router.use('/api', require('./api'))
 router.use('/'   , require('./app'))

module.exports = router