/**
 * @description checks if resource exists
 * @param  {object} req - request from the client to the server
 * @param  {object} res - response from the server to the client
 * @param  {object} resource to be checked for
 * @return {boolean} true or false
 */
const resourceExist = (req, res, resource) => {
  if (resource) {
    res.status(409).json({
      message: `Record already exists`
    })
    return true
  }
  return false
}

module.exports = {
  resourceExist
}
