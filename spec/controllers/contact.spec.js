const request = require('supertest')
const { expect } = require('chai')
const app = require('../../src/server')
const Contact = require('../../src/models').Contact
const Event = require('../../src/models').Event
const Referral = require('../../src/models').Referral

const REFERRAL_POINTS = 100

describe('Contacts Endpoints /v1/contacts', () => {
  beforeEach((done) => {
    Contact.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then((err) => {
        if (!err) {
          Event.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true
          })
            .then(() => {
              done()
            })
        }
      })
  })

  describe('Get Contacts Endpoint /v1/contacts', () => {
    it('should display the right message when no contact is available', done => {
      request(app)
        .get('/v1/contacts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).to.equal('No Contact available. Start by creating a contact.')
          done()
        })
    })

    it('should successfully get all contacts', (done) => {
      Contact.bulkCreate([
        { email: 'test.user1@influitive.com',
          name: 'Test User1',
          points: 100
        },
        { email: 'test.user2@influitive.com',
          name: 'Test User2',
          points: 500
        }
      ])
      request(app)
        .get('/v1/contacts/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.results.length).to.equal(2)
          expect(res.body.results[0].name).to.equal('Test User1')
          expect(res.body.results[1].email).to.equal('test.user2@influitive.com')
          expect(res.body.results[1].points).to.equal(500)
          done()
        })
    })
  })

  describe('Retrieve Leaderboard Endpoint /v1/contacts/leaderboard', () => {
    beforeEach((done) => {
      Contact.bulkCreate([
        { email: 'test.user1@influitive.com',
          name: 'Test User1',
          points: 100
        },
        { email: 'test.user2@influitive.com',
          name: 'Test User2',
          points: 500
        }
      ]).then(() => {
        Referral.bulkCreate([
          { email: 'referral.one@influitive.com',
            name: 'Referral One',
            points: REFERRAL_POINTS,
            referrerId: 1
          },
          { email: 'referral.two@influitive.com',
            name: 'Referral Two',
            points: REFERRAL_POINTS,
            referrerId: 1
          },
          { email: 'referral.three@influitive.com',
            name: 'Referral Three',
            points: REFERRAL_POINTS,
            referrerId: 1
          },
          { email: 'referral.four@influitive.com',
            name: 'Referral Four',
            points: REFERRAL_POINTS,
            referrerId: 1
          },
          { email: 'referral.five@influitive.com',
            name: 'Referral Five',
            points: REFERRAL_POINTS,
            referrerId: 1
          },
          { email: 'referral.six@influitive.com',
            name: 'Referral Six',
            points: REFERRAL_POINTS,
            referrerId: 2
          }
        ]).then(() => {
          done()
        })
      })
    })
    it('should return contacts in an order form of highest referrals made', (done) => {
      request(app)
        .get('/v1/contacts/leaderboard')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(2)
          expect(parseInt(res.body[0].referrercount)).to.greaterThan(parseInt(res.body[1].referrercount))
          done()
        })
    })
  })

  describe('Retrieve Contact Endpoint /v1/contacts/:contactId', () => {
    beforeEach((done) => {
      Contact.create({
        email: 'test.user1@influitive.com',
        name: 'Test User1',
        points: 100
      }).then(() => {
        done()
      })
    })

    it('should return a 404 error if contact not found', (done) => {
      request(app)
        .get('/v1/contacts/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.message).to.equal('Contact not found')
          done()
        })
    })

    it('should successfully return the document found',
      (done) => {
        request(app)
          .get('/v1/contacts/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Test User1')
            expect(res.body.email).to.equal('test.user1@influitive.com')
            expect(res.body.points).to.equal(100)
            done()
          })
      })

    it('should not allow an invalid document id', (done) => {
      request(app)
        .get('/v1/contacts/aaa')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Invalid Contact ID. Value must be an integer.')
          done()
        })
    })
  })

  describe('Update Document Endpoints /v1/contacts/:contactId', () => {
    beforeEach((done) => {
      Contact.create({
        email: 'test.user1@influitive.com',
        name: 'Test User1',
        points: 100
      }).then(() => {
        done()
      })
    })

    it('should return a 404 error if contact to be updated is not found', (done) => {
      request(app)
        .put('/v1/contacts/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          name: "Test User"
        })
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.message).to.equal('Unable to find contact to update.')
          done()
        })
    })

    it('should not allow an empty email', (done) => {
      request(app)
        .put('/v1/contacts/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          email: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Invalid Email to update. Please specify a valid email')
          done()
        })
    })

    it('should successfully update document\'s details', (done) => {
      request(app)
        .put('/v1/contacts/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          name: 'Test User',
          email: 'test.user@influitive.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('Test User')
          expect(res.body.email).to.equal('test.user@influitive.com')
          done()
        })
    })
  
    it('should increase contacts point if points field is updated', (done) => {
      request(app)
        .put('/v1/contacts/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          points: 100,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.status).to.greaterThan(100)
          expect(res.status).to.equal(200)
          done()
        })
    })
  })
})
