const express = require('express')
const referralRoutes = require('./routes/referral.route')

const routes = () => {
  const router = express.Router()
  router.use('/referrals', referralRoutes)
  return router
}

module.exports = routes
