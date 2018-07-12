const express = require('express')
const router  = express.Router()

const { restaurantsViewController } = require('../../controllers')

router.get('/restaurants', restaurantsViewController.getRestaurantsView)
router.get('/restaurants/:id/comments', restaurantsViewController.getRestaurantCommentsView)
router.post('/restaurants', restaurantsViewController.getRestaurantsView)

module.exports = router