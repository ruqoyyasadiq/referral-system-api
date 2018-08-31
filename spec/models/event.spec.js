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

const EventModel = require('../../src/models/event')

describe('src/models/Event', () => {
  const Event = EventModel(sequelize, dataTypes)
  const event = new Event()

  checkModelName(Event)('Event')

  context('check valid properties', () => {
    ;[
      'description',
      'type',
      'points',
      'contactId',
      'referrerId'
    ].forEach(checkPropertyExists(event))
  })

  context('associations', () => {
    const Contact = { name: 'Test User', email: 'test.user@influitive.com', id: 1 }
    const Referral = { name: 'Test User', email: 'test.user@influitive.com', id: 1, contactId: 2 }

    before(() => {
      Event.associate({ Contact })
      Event.associate({ Referral })
    })

    it('defined a belongsToMany association with Contact', () => {
      expect(Event.belongsToMany).to.have.been.calledWith(Contact)
    })

    it('defined a belongsToMany association with Referral', () => {
      expect(Event.belongsToMany).to.have.been.calledWith(Referral)
    })
  })
})