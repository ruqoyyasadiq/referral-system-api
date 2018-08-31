const express = require('express')
const contactRoutes = require('./routes/contact.route')
const referralRoutes = require('./routes/referral.route')

const routes = () => {
  const router = express.Router()
  router.use('/contacts', contactRoutes)
  router.use('/referrals', referralRoutes)
  return router
}

module.exports = routes
