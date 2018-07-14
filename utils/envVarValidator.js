getEmpty = required => {
  return required.filter(val => !val.value)
}

exports.validate = () => {

  // always required environment variables
  let required = [
    { 
      name: 'DB_URI',
      value: process.env.DB_URI   
    },
    { 
      name: 'DB_NAME',
      value: process.env.DB_NAME  
    }
  ]
  
  // environment variables required for production
  let prodRequired = [
    { 
      name: 'DB_USER',
      value: process.env.DB_USER 
    },
    { 
      name: 'DB_PASS',
      value: process.env.DB_PASS 
    }
  ]

  // combine if environment is set to production
  let finalRequired = process.env.NODE_ENV === 'production' 
    ? [...required, ...prodRequired]
    : required

  // get environment variables that have no value
  let emptyVars = getEmpty(finalRequired)

  // if found log an error and return false
  if(emptyVars.length !== 0) {
    console.error("ERROR: The server requires the following environment variable(s) to be set:")
    emptyVars.map(val => console.error(val.name))
    return false
  }
  return true
}