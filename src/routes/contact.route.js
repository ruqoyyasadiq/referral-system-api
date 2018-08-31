const express = require('express')
const contactController = require('../controllers/contact.controller')

const contactRouter = express.Router()

contactRouter.get('/', contactController.all)
contactRouter.get('/leaderboard', contactController.getLeaderBoard)
contactRouter.get('/:contactId', contactController.getContactById)
contactRouter.put('/:contactId', contactController.update)

module.exports = contactRouter