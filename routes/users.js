const express = require('express')
const router = express.Router()
const { usersController } = require('../controllers')

router.get('/api/users', usersController.getUsers)
router.get('/api/users/:id', usersController.getUser)
router.post('/api/users', usersController.createUser)
router.put('/api/users/:id', usersController.updateUser) // ONLY ADMIN
router.patch('/api/users/:id/email',  usersController.updateUserEmail)
router.patch('/api/users/:id/password',  usersController.updateUserPassword)
router.patch('/api/users/:id/role',  usersController.updateUserRole) // ONLY ADMIN
router.delete('/api/users/:id', usersController.deleteUser)

module.exports = router