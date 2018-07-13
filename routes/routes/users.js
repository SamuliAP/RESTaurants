const express = require('express')
const router  = express.Router()

const { usersController, sessionsController } = require('../../controllers')
const { 
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware,
  permissionsMiddleware,
  bodyManipulationMiddleware,
  inputValidationMiddleware
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
  inputValidationMiddleware.validateEmail,
  inputValidationMiddleware.validatePassword,
  usersController.createUser
)

// PUT (update) a user completely
// ADMIN ONLY
router.put('/users/:id', 
  authMiddleware.authenticate,
  permissionsMiddleware.isAdmin,
  inputValidationMiddleware.validateEmail,
  inputValidationMiddleware.validatePassword,
  usersController.updateUser
)

// PATCH (update) a users email
// ADMIN OR CURRENT USER ONLY
router.patch('/users/:id/email', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  inputValidationMiddleware.validateEmail,
  usersController.updateUserEmail
)

// PATCH (update) a users password
// ADMIN OR CURRENT USER ONLY
router.patch('/users/:id/password', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  inputValidationMiddleware.validatePassword,
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

/*
 * semantically incorrect POST routes for hbs templates 
 * since template rendering has limitations when using XHR, and 
 * html <form> only supports GET and POST
 */

// POST a new user email
// ADMIN OR CURRENT USER ONLY
router.post('/users/:id/email', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  inputValidationMiddleware.validateEmail,
  usersController.updateUserEmail
)

// POST a new user password
// ADMIN OR CURRENT USER ONLY
router.post('/users/:id/password', 
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  inputValidationMiddleware.validatePassword,
  usersController.updateUserPassword
)

// POST to delete a user
// ADMIN OR CURRENT USER ONLY
router.post('/users/:id/delete',
  authMiddleware.authenticate, 
  permissionsMiddleware.IsAdminOrUriIdIsUser,
  usersController.deleteUser
)

// ------------------------------------

module.exports = router