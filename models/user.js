const mongoose = require('mongoose')

// A regular expression for email validation
const emailRegex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"

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
      validator : val => val.length > 6,
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

userSchema.virtual('links').get(() => ({
  self : `/api/users/${this.id}`,
  all  : `/api/users`
}))

module.exports = mongoose.model('User', userSchema)