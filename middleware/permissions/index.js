// be careful for namespace crossing in permissions
module.exports = {
  ...require('./ownerPermissions'),
  ...require('./rolePermissions'),
  ...require('./userPermissions')
}