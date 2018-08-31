const express = require('express')
const referralController = require('../controllers/referral.controller')

const referralRouter = express.Router()

referralRouter.post('/new', referralController.create)

module.exports = referralRouter
