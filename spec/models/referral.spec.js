const  chai = require('chai')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const ReferralModel = require('../../src/models/referral')

describe('src/models/Referral', () => {
  const Referral = ReferralModel(sequelize, dataTypes)
  const referral = new Referral()

  checkModelName(Referral)('Referral')

  context('check valid properties', () => {
    ;[
      'name',
      'email',
      'points',
    ].forEach(checkPropertyExists(referral))
  })

  context('associations', () => {
    const Contact = { name: 'Test User', email: 'test.user@influitive.com', id: 1 }
    const Event = 'Random event'

    before(() => {
      Referral.associate({ Contact })
      Referral.associate({ Event })
    })

    it('defined a belongsTo association with Contact', () => {
      expect(Referral.belongsTo).to.have.been.calledWith(Contact)
    })

    it('defined a belongsToMany association with Event', () => {
      expect(Referral.belongsToMany).to.have.been.calledWith(Event)
    })
  })
})