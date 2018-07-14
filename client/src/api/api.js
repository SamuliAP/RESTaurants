const handleRequest = method => (uri, options = {}) => 
  fetch(process.env.REACT_APP_API_URL + uri, {...options, method: method})


// GET
export const get = handleRequest('GET')

// POST
export const post = handleRequest('POST')

// PUT
export const put = handleRequest('PUT')

// PATCH
export const patch = handleRequest('PATCH')

// DELETE
export const del = handleRequest('DELETE')