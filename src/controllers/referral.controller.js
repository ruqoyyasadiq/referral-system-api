const Referral = require('../models').Referral
const Contact = require('../models').Contact
const Event = require('../models').Event
const { resourceExist } = require('../utils')

const REFERRAL_POINTS = process.env.REFERRAL_POINTS || 100 // set default value in case environment variable is not set.

class referralController {
  static create(req, res) {
    const { email, name, referrerId, pointsEarned } = req.body
    // console.log(referrerId, 'body')
    return Referral.findOne({
      where: { email }
    }).then(referral => {
      // console.log(referral, 'referral in controller')
      if (!resourceExist(req, res, referral)) {
        return Referral
          .create({ email, name, pointsEarned, referrerId })
          .then(createdReferral => {
            // console.log(createdReferral.dataValues, 'createdReferral')
            Contact.findOne({
              where: { id: referrerId },
              attributes: ['points']
            }).then(contact => {
              console.log(contact.points, 'contact in findOne')
              if(contact) {
                const accruedPoints = contact.points + REFERRAL_POINTS
                console.log(accruedPoints, 'accruedPoints')
              } else {
                
              }
            })
          })
      }
    })
  }
}

module.exports = referralController
