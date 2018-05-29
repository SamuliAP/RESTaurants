const express = require('express')
const router = express.Router()
const { usersController } = require('../controllers')

router.get('/api/users', usersController.getUsers)
router.get('/api/users/:id', usersController.getUser)
router.post('/api/users', usersController.createUser)
router.patch('/api/users/:id',  usersController.updateUser)
router.delete('/api/users/:id', usersController.deleteUser)

module.exports = router