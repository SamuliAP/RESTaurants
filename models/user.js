const mongoose  = require('mongoose')

/* Using validator instead of e.g. express-validator as input validation for
 * easier consistent error message formatting. This also
 * enables us doing all our validation in the same spot without
 * having to do it manually (e.g. checking whether email already exist in db).
 */
const validator = require('validator')

const userSchema = mongoose.Schema({
  email: {
    type     : String,
    required : true,
    unique   : true,
    validate : {
      validator : val => validator.isEmail(val),
      message   : '{VALUE} is not a valid email address'
    }
  },
  password: {
    type     : String,
    required : true,
    validate : {
      validator : val => validator.isLength(val, { min: 6 }),
      message   : 'Password needs to be at least 6 characters long'
    }
  },
  role: {
    type     : String,
    enum     : ['basic', 'manager' ,'admin'],
    default  : 'basic',
    required : true
  }
}, { 
  timestamps : {},
  toJSON : { 
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.password;
    }
  }
})

userSchema.virtual('links').get(function() {
  return {
    self : `/api/users/${this.id}`,
    all  : `/api/users`
  }
})

module.exports = mongoose.model('User', userSchema)