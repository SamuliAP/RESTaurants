const { User }  = require('../../models')
const { error } = require('../../controllers/apiControllers/responses')

// Check whether session user is Model owner, return error otherwise
// NOTE: Model must have a field with key 'owner' 
isOwner = Model => (req, res, next) => {
  Model.findOne({ owner: req.session.user.id }, (err, doc) => {

    if(err || !doc) {
      return error.create(res, next, error.type.UNAUTHORIZED) 
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