module.exports = (req, res, next) => {
  let message = res.locals.response.message
  let code    = res.locals.response.code
  
  // include csrf-token in response body
  message._csrfToken = req.csrfToken()

  res.status(code).send(message)
}
