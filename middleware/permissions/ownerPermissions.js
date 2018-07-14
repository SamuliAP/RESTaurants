const { User }  = require('../../models')
const { error } = require('../../controllers/apiControllers/responses')
const { Comment } = require('../../models')
// Check whether session user is Model owner, return error otherwise
// NOTE: Model must have a field with key 'owner' 
isOwner = Model => (req, res, next) => {
  let query = { owner: req.session.user.id }
  if(Model === Comment) {
    query = { "owner._id": req.session.user.id }
  }
  Model.findOne(query, (err, doc) => {
    if(err || !doc) {
      return error.create(res, next, error.type.NOTPERMITTED) 
    }

    return next()
  })
}
exports.isOwner = isOwner

// Check whether session user is Model owner OR user is admin, return error otherwise
// NOTE: Model must have a field with key 'owner' 
exports.isAdminOrIsOwner = Model => (req, res, next) => {

  User.findById(req.session.user.id, (err, user) => {

    // if user wasn't admin, check whether they are owner
    if(err || !user || user.role !== 'admin') { 
      return isOwner(Model)(req,res,next)
    }
    
    return next()
  })
}