const mongoose  = require('mongoose')

/* Using validator instead of e.g. express-validator as input validation for
 * easier consistent error message formatting. This also
 * enables us doing all our validation in the same spot without
 * having to do it manually in a middleware (e.g. checking whether email already exists in db).
 */
const validator = require('validator')

// unique validator plugin for clearer error messages on unique constraint errors 
const uniqueValidator = require('mongoose-unique-validator');

// bcrypt for password hashing
var bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type     : String,
    required : '{PATH} is required!',
    unique   : 'Expected {PATH} to be unique. Value: "{VALUE}".',
    validate : {
      validator : val => validator.isEmail(val),
      message   : '{VALUE} is not a valid email address'
    }
  },
  password: {
    type     : String,
    required : '{PATH} is required!',
    validate : {
      validator : val => validator.isLength(val, { min: 6 }),
      message   : 'Password needs to be at least 6 characters long'
    }
  },
  role: {
    type     : String,
    enum     : ['basic', 'manager' ,'admin'],
    default  : 'basic',
    required : '{PATH} is required!'
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

// hash the password before saving
userSchema.pre('save', function(next) {
  var user = this
  
  bcrypt.hash(user.password, 10, function(err, hash) {
    if(err) {
      return next(err)
    } 
    user.password = hash
    next()
  })
})

// hash the password before updating
userSchema.pre('findOneAndUpdate', function(next) {
  var user = this
  var pass = user._update.password
  
  bcrypt.hash(pass, 10, function(err, hash) {
    if(err) {
      return next(err)
    } 
    user._update.password = hash
    next()
  })
})

// for HATEOAS
userSchema.virtual('links').get(function() {
  return {
    self : `/api/users/${this.id}`,
    all  : `/api/users`
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)