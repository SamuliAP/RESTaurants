module.exports = (req, res, next) => {
  // TODO POISTA TÄMÄ
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Credentials':true,
  }).status(res.locals.response.code).send(res.locals.response.message)
}
