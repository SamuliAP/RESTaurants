// Basically a simple front controller, this handles
// every request made by the client application
// returns a Promise created by fetch
const dispatchRequest = method => (uri, options = {}) => {

  // server root URI
  uri = process.env.REACT_APP_API_URL + uri

  // HTTP-method
  options = {...options, method: method}

  // send cookies
  options.credentials = 'same-origin'

  // set content-type and csrf-headers
  let _csrf = sessionStorage.getItem('_csrf')
  options.headers = {
    ...(options.headers), 
    'content-type': 'application/json',
    "CSRF-TOKEN": _csrf
  }

  // stringify body object
  if(options.body) {
    options.body = JSON.stringify(options.body)
  }
  
  return fetch(uri, options)
}


// GET
export const get = dispatchRequest('GET')

// POST
export const post = dispatchRequest('POST')

// PUT
export const put = dispatchRequest('PUT')

// PATCH
export const patch = dispatchRequest('PATCH')

// DELETE, delete is a reserved word so this is remaned to del
export const del = dispatchRequest('DELETE')