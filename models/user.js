const mongoose  = require('mongoose')

// unique validator plugin for clearer error messages on unique constraint errors 
const uniqueValidator = require('mongoose-unique-validator');

// bcrypt for password hashing
var bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type     : String,
    required : '{PATH} is required!',
    unique   : 'Expected {PATH} to be unique. Value: "{VALUE}".'
  },
  password: {
    type     : String,
    required : '{PATH} is required!'
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

  if(!pass) {
    pass = user._conditions.password
  }

  // not updating password
  if(!pass) {
    return next()
  }

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