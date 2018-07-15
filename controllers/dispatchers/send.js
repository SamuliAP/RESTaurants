module.exports = (req, res, next) => {
  res.status(res.locals.response.code).send(res.locals.response.message)
}
