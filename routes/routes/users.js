const express = require('express')
const router  = express.Router()

const { usersController } = require('../../controllers')
const { 
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware,
  permissionsMiddleware,
  bodyManipulationMiddleware
} = require('../../middleware')

// ------------------------------------

// sanitize all URI parameters for XSS-protection 
router.use('/users/:id' , xssMiddleware.sanitizeURI)
router.use('/users/:id' , noSqlMiddleware.sanitizeURI)

// ------------------------------------

// GET all users
// ADMIN ONLY
router.get('/users', 
  authMiddleware.authenticate,
  permissionsMiddleware.isAdmin,
  usersController.getUsers
)

// GET user by id
// ADMIN OR CURRENT USER ONLY
router.get('/users/:id', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.getUser
)

// POST a new user
// NOTE: only admins can create admins and managers by design,
// as we don't want to give manager permissions to everyone.
// Removing the 'role' -property defaults it to the default role 
// defined in the User model definition.
router.post('/users',
  bodyManipulationMiddleware.removeBodyPropertyIfNotAdmin('role'),
  usersController.createUser
)

// PUT (update) a user completely
// ADMIN ONLY
router.put('/users/:id', 
  authMiddleware.authenticate,
  permissionsMiddleware.isAdmin,
  usersController.updateUser
)

// PATCH (update) a users email
// ADMIN OR CURRENT USER ONLY
router.patch('/users/:id/email', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.updateUserEmail
)

// PATCH (update) a users password
// ADMIN OR CURRENT USER ONLY
router.patch('/users/:id/password', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.updateUserPassword
)

// PATCH (update) a users role
// ADMIN ONLY
router.patch('/users/:id/role', 
  authMiddleware.authenticate,
  permissionsMiddleware.isAdmin,
  usersController.updateUserRole
)

// DELETE a user
// ADMIN OR CURRENT USER ONLY
router.delete('/users/:id', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.deleteUser
)

// ------------------------------------

module.exports = router