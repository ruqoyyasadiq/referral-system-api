const Referral = require('../models').Referral
const Contact = require('../models').Contact
const Event = require('../models').Event
const { resourceExist } = require('../utils')
const { EVENT_TYPE_REFERRAL_CREATED } = require('../constants')

const REFERRAL_POINTS = process.env.REFERRAL_POINTS || 100 // set default value in case environment variable is not set.

class referralController {
  /**
   * @description creates new Referral, updates Contact table, create Event for the action.
   * @param  {object} req - request from the client to the server
   * @param  {object} res - response from the server to the client
   */
  static create(req, res) {
    const { email, name, referrerId } = req.body
    return Referral.findOne({
      where: { email }
    }).then(referral => {
      if (!resourceExist(req, res, referral)) {
        return Referral
          .create({ email, name, points: REFERRAL_POINTS, referrerId })
          .then(createdReferral => {
            Contact.findOne({
              where: { id: referrerId },
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            }).then(contact => {
              if(contact) {
                const accruedPoints = contact.points + parseInt(REFERRAL_POINTS)
                const modifiedContact = contact.dataValues
                modifiedContact.points = accruedPoints
                Contact.update(modifiedContact, {
                  where: { id: referrerId },
                  returning: true
                }).then(() => {
                  Event.create({
                    description: '',
                    type: EVENT_TYPE_REFERRAL_CREATED,
                    points: REFERRAL_POINTS,
                    contactId: referrerId,
                    referralId: createdReferral.dataValues.id
                  })
                })
              }
            })
            res.status(200).json(createdReferral)
          }
        ).catch(error => {
          res.status(500).send(error.toString())
        })
      }
    })
  }
}

module.exports = referralController
