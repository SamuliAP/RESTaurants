const express = require('express')
const router  = express.Router()

const { restaurantsController } = require('../../controllers')
const { 
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware,
  bodyManipulationMiddleware,
  permissionsMiddleware
} = require('../../middleware')
const { Restaurant } = require('../../models')

// ------------------------------------

// sanitize all URI parameters for XSS-protection 
router.use('/restaurants/:id' , xssMiddleware.sanitizeURI)
router.use('/restaurants/:id' , noSqlMiddleware.sanitizeURI)

// ------------------------------------

// GET all restaurants
router.get('/restaurants', authMiddleware.authenticate, restaurantsController.getRestaurants)

// GET restaurant by id
router.get('/restaurants/:id', authMiddleware.authenticate, restaurantsController.getRestaurant)

// POST a new restaurant
// ADMIN OR MANAGER ONLY
router.post('/restaurants',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  // Assign the current session user as the owner by 
  // binding it as a new body property
  (req, res, next) => 
    bodyManipulationMiddleware.newBodyProperty('owner', req.session.user.id, req, res, next),
  restaurantsController.createRestaurant
)

// PUT (update) a restaurant apart from owner
// ADMIN OR MANAGER+OWNER ONLY
router.put('/restaurants/:id',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.updateRestaurant
)

// PATCH (update) a restaurants name
// ADMIN OR MANAGER+OWNER ONLY
router.patch('/restaurants/:id/name',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.updateRestaurantName
)

// PATCH (update) a restaurants address
// ADMIN OR MANAGER+OWNER ONLY
router.patch('/restaurants/:id/address',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.updateRestaurantAddress
)

// DELETE a restaurant
// ADMIN OR MANAGER+OWNER ONLY
router.delete('/restaurants/:id',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.deleteRestaurant
)

// GET restaurant comments
router.get('/restaurants/:id/comments',
  authMiddleware.authenticate,
  restaurantsController.getRestaurantComments
)

// ------------------------------------

/*
 * semantically incorrect POST routes for hbs templates 
 * since template rendering has limitations when using XHR, and 
 * html <form> only supports GET and POST
 */

// POST to delete a restaurant
// ADMIN OR MANAGER+OWNER ONLY
router.post('/restaurants/:id/delete',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrHasRole('manager'),
  permissionsMiddleware.isAdminOrIsOwner(Restaurant),
  restaurantsController.deleteRestaurant
)

module.exports = router