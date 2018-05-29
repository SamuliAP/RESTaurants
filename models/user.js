const mongoose = require('mongoose')

// A regular expression for email validation
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = mongoose.Schema({
  email: {
    type     : String,
    required : true,
    unique   : true,
    validate : {
      validator : val => emailRegex.test(val),
      message   : '{VALUE} is not a valid email address'
    }
  },
  password: {
    type     : String,
    required : true,
    validate : {
      validator : val => val.length >= 6,
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
  toJSON : { virtuals: true }
}) 

userSchema.virtual('links').get(function() {
  return {
    self : `/api/users/${this.id}`,
    all  : `/api/users`
  }
})

module.exports = mongoose.model('User', userSchema)