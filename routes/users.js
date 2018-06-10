const express = require('express')
const router  = express.Router()

const { usersController } = require('../controllers')
const { 
  xssMiddleware, 
  authMiddleware
} = require('../middleware')

router.use('/api/users', authMiddleware.authenticate)

router.get('/api/users',
  usersController.getUsers
)

router.get('/api/users/:id',
  xssMiddleware.sanitizeURI,
  usersController.getUser
)

router.post('/api/users', 
  usersController.createUser
)

// ONLY ADMIN
router.put('/api/users/:id', 
  xssMiddleware.sanitizeURI,
  usersController.updateUser
)

router.patch('/api/users/:id/email',  
  xssMiddleware.sanitizeURI,
  usersController.updateUserEmail
)

router.patch('/api/users/:id/password',  
  xssMiddleware.sanitizeURI,
  usersController.updateUserPassword
)

// ONLY ADMIN
router.patch('/api/users/:id/role',  
  xssMiddleware.sanitizeURI,
  usersController.updateUserRole
)

router.delete('/api/users/:id', 
  xssMiddleware.sanitizeURI,
  usersController.deleteUser
)

module.exports = router