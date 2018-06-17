const express = require('express')
const router  = express.Router()

const { usersController } = require('../controllers')
const { 
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware,
  permissionsMiddleware
} = require('../middleware')

// ------------------------------------

// sanitize all URI parameters for XSS-protection 
router.use('/api/users/:id' , xssMiddleware.sanitizeURI)
router.use('/api/users/:id' , noSqlMiddleware.sanitizeURI)

// ------------------------------------

// GET all users
// ADMIN ONLY
router.get('/api/users', 
  authMiddleware.authenticate,
  permissionsMiddleware.isAdmin,
  usersController.getUsers
)

// GET user by id
// ADMIN OR CURRENT USER ONLY
router.get('/api/users/:id', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.getUser
)

// POST a new user
router.post('/api/users', usersController.createUser)

// PUT (update) a user completely
// ADMIN ONLY
router.put('/api/users/:id', 
  authMiddleware.authenticate,
  permissionsMiddleware.isAdmin,
  usersController.updateUser
)

// PATCH (update) a users email
// ADMIN OR CURRENT USER ONLY
router.patch('/api/users/:id/email', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.updateUserEmail
)

// PATCH (update) a users password
// ADMIN OR CURRENT USER ONLY
router.patch('/api/users/:id/password', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.updateUserPassword
)

// PATCH (update) a users role
// ADMIN ONLY
router.patch('/api/users/:id/role', 
  authMiddleware.authenticate,
  permissionsMiddleware.isAdmin,
  usersController.updateUserRole
)

// DELETE a user
// ADMIN OR CURRENT USER ONLY
router.delete('/api/users/:id', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.deleteUser
)

// ------------------------------------

module.exports = router