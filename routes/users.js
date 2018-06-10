const express = require('express')
const router  = express.Router()

const { usersController } = require('../controllers')
const { 
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware
} = require('../middleware')

// ------------------------------------

// sanitize all URI parameters for XSS-protection 
router.use('/api/users/:id' , xssMiddleware.sanitizeURI)
router.use('/api/users/:id' , noSqlMiddleware.sanitizeURI)

// authenticate every users route
router.use('/api/users'     , authMiddleware.authenticate)

// ------------------------------------

// GET all users
router.get('/api/users', usersController.getUsers)

// GET user by id
router.get('/api/users/:id', usersController.getUser)

// POST a new user
router.post('/api/users', usersController.createUser)

// ONLY ADMIN
// PUT (update) a user completely
router.put('/api/users/:id', usersController.updateUser)

// PATCH (update) a users email
router.patch('/api/users/:id/email',usersController.updateUserEmail)

// PATCH (update) a users password
router.patch('/api/users/:id/password',usersController.updateUserPassword)

// ONLY ADMIN
// PATCH (update) a users role
router.patch('/api/users/:id/role',usersController.updateUserRole)

// DELETE a user
router.delete('/api/users/:id',usersController.deleteUser)

// ------------------------------------

module.exports = router