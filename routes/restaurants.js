const express = require('express')
const router  = express.Router()

const { restaurantsController } = require('../controllers')
const { 
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware,
  bodyManipulationMiddleware,
  permissionsMiddleware
} = require('../middleware')
const { Restaurant } = require('../models')

// ------------------------------------

// sanitize all URI parameters for XSS-protection 
router.use('/api/restaurants/:id' , xssMiddleware.sanitizeURI)
router.use('/api/restaurants/:id' , noSqlMiddleware.sanitizeURI)

// ------------------------------------

// GET all restaurants
// Open also to non logged in users
router.get('/api/restaurants', restaurantsController.getRestaurants)

// GET restaurant by id
// Open also to non logged in users
router.get('/api/restaurants/:id', restaurantsController.getRestaurant)

// POST a new restaurant
// ADMIN OR MANAGER ONLY
router.post('/api/restaurants',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  // Assign the current session user as the owner by 
  // binding it as a new body property
  (req, res, next) => 
    bodyManipulationMiddleware.newBodyProperty('owner', req.session.user, req, res, next),
  restaurantsController.createRestaurant
)

// PUT (update) a restaurant apart from owner
// ADMIN OR MANAGER+OWNER ONLY
router.put('/api/restaurants/:id',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.updateRestaurant
)

// PATCH (update) a restaurants name
// ADMIN OR MANAGER+OWNER ONLY
router.patch('/api/restaurants/:id/name',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.updateRestaurantName
)

// PATCH (update) a restaurants address
// ADMIN OR MANAGER+OWNER ONLY
router.patch('/api/restaurants/:id/address',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.updateRestaurantAddress
)

// DELETE a restaurant
// ADMIN OR MANAGER+OWNER ONLY
router.delete('/api/restaurants/:id',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.deleteRestaurant
)

// ------------------------------------

module.exports = router