const validator = require('validator')
const Contact = require('../models').Contact
const Referral = require('../models').Referral
const models = require('../models')

class contactController {
  /**
   * @description all - fetches all available contacts in the system
   * @param  {object} req - request from the client to the server
   * @param  {object} res - response from the server to the client
   */
  static all(req, res) {
    const props = {
      order: [
        ['id', 'ASC']
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
    return Contact.findAll(props)
    .then(contacts => {
      if (contacts.length === 0) {
        return res.status(200).json({
          message: 'No Contact available. Start by creating a contact.'
        })
      } else {
        res.status(200).json({ results: contacts })
      }
    })
  }

  /**
   * @description getContactById - fetches a single contact by its specified ID
   * @param  {object} req - request from the client to the server
   * @param  {object} res - response from the server to the client
   */
  static getContactById (req, res) {
    const { contactId } = req.params
    if (!validator.isNumeric(contactId)) {
      res.status(400).json({
        message: 'Invalid Contact ID. Value must be an integer.'
      })
    } else {
      return Contact.findById(contactId, {
        attributes: {
          exclude: [ 'createdAt', 'updatedAt']
        }
      }).then(contact => {
        if (!contact) {
          res.status(404).json({
            message: 'Contact not found'
          })
        } else {
          res.status(200).json(contact)
        }
      }).catch(error => {
        res.status(500).send(error.toString())
      })
    }
  }

  /**
   * @description update - updates a single contact based on the ID given
   * @param  {object} req - request from the client to the server
   * @param  {object} res - response from the server to the client
   */
  static update(req, res) {
    const { contactId } = req.params
    const { body } = req
    if (validator.isEmpty(contactId) || !validator.isNumeric(contactId)) {
      res.status(400).json({
        message: 'Invalid Contact ID. Value must be an integer.'
      })
    } else {
      return Contact.update(body, {
        where: { id: contactId },
        returning: true,
        validate: true
      }).then(updatedContact => {
        res.status(200).json(updatedContact[1][0])
      }).catch(error => {
        res.status(500).send(error.toString())
      })
    }
  }

  /**
   * @description leaderboard - fetches all available contact in the system in order of contacts with the most referrals to the least
   * @param  {object} req - request from the client to the server
   * @param  {object} res - response from the server to the client
   */
  static getLeaderBoard(req, res) {
    models.sequelize.query('SELECT "Contacts".*, COUNT("Referrals".id) AS referrerCount  FROM "Contacts" LEFT JOIN "Referrals" ON "Referrals"."referrerId" = "Contacts"."id" GROUP BY "Contacts"."id", "Contacts"."name", "Contacts"."email", "Contacts"."points" ORDER BY referrerCount DESC;').then(contacts => {
      res.status(200).json(contacts[0])
    }).catch(error => {
      res.status(500).send(error.toString())
    })
  }
  
  static delete() {
    // TODO: delete contact record (not specified in assignment scope)
  }
}

module.exports = contactController
