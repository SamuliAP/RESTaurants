const express = require('express')
const router  = express.Router()

const { restaurantsViewController } = require('../../controllers')

router.get('/restaurants', restaurantsViewController.getRestaurants)
router.post('/restaurants', restaurantsViewController.createRestaurant)

module.exports = router