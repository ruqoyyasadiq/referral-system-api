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

const ContactModel = require('../../src/models/Contact')

describe('src/models/Contact', () => {
  const Contact = ContactModel(sequelize, dataTypes)
  const contact = new Contact()

  checkModelName(Contact)('Contact')

  context('check valid properties', () => {
    ;[
      'name',
      'email',
      'points',
    ].forEach(checkPropertyExists(contact))
  })

  context('associations', () => {
    const Referral = { name: 'Test User', email: 'test.user@influitive.com', id: 1, contactId: 2 }
    const Event = 'Random event'

    before(() => {
      Contact.associate({ Referral })
      Contact.associate({ Event })
    })

    it('defined a hasMany association with Contact', () => {
      expect(Contact.hasMany).to.have.been.calledWith(Referral)
    })

    it('defined a belongsToMany association with Event', () => {
      expect(Contact.belongsToMany).to.have.been.calledWith(Event)
    })
  })
})