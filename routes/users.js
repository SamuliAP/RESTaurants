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

// ------------------------------------

// GET all users
router.get('/api/users', 
  authMiddleware.authenticate, 
  usersController.getUsers
)

// GET user by id
router.get('/api/users/:id', 
  authMiddleware.authenticate, 
  usersController.getUser
)

// POST a new user
router.post('/api/users', usersController.createUser)

// ONLY ADMIN
// PUT (update) a user completely
router.put('/api/users/:id', 
  authMiddleware.authenticate, 
  usersController.updateUser
)

// PATCH (update) a users email
router.patch('/api/users/:id/email', 
  authMiddleware.authenticate, 
  usersController.updateUserEmail
)

// PATCH (update) a users password
router.patch('/api/users/:id/password', 
  authMiddleware.authenticate, 
  usersController.updateUserPassword
)

// ONLY ADMIN
// PATCH (update) a users role
router.patch('/api/users/:id/role', 
  authMiddleware.authenticate, 
  usersController.updateUserRole
)

// DELETE a user
router.delete('/api/users/:id', 
  authMiddleware.authenticate, 
  usersController.deleteUser
)

// ------------------------------------

module.exports = router