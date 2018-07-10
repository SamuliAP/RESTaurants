const express = require('express')
const router  = express.Router()

const { commentsController } = require('../../controllers')
const { 
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware,
  bodyManipulationMiddleware,
  permissionsMiddleware
} = require('../../middleware')
const { Comment } = require('../../models')

// ------------------------------------

// sanitize all URI parameters for XSS-protection 
router.use('/comments/:id' , xssMiddleware.sanitizeURI)
router.use('/comments/:id' , noSqlMiddleware.sanitizeURI)

// ------------------------------------

// GET all comments
router.get('/comments', authMiddleware.authenticate, commentsController.getComments)

// GET comment by id
router.get('/comments/:id', authMiddleware.authenticate, commentsController.getComment)

// POST a new comment
router.post('/comments',
  authMiddleware.authenticate,
  (req, res, next) => 
    bodyManipulationMiddleware.newBodyProperty('owner', req.session.user.id, req, res, next),
  commentsController.createComment
)

// PUT (update) a comment, only updating the comment contents is allowed
// ADMIN OR OWNER ONLY
router.put('/comments/:id',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrIsOwner(Comment),
  commentsController.updateComment
)

// DELETE a comment
// ADMIN OR OWNER ONLY
router.delete('/comments/:id',
  authMiddleware.authenticate,
  permissionsMiddleware.isAdminOrIsOwner(Comment),
  commentsController.deleteComment
)

// ------------------------------------

module.exports = router