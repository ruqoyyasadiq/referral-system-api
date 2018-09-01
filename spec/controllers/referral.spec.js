const request = require('supertest')
const { expect } = require('chai')
const app = require('../../src/server')
const Contact = require('../../src/models').Contact
const Referral = require('../../src/models').Referral


const REFERRAL_POINTS = 100

describe('Referrals Endpoints /v1/referrals', () => {
  beforeEach((done) => {
    Referral.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
    .then((err) => {
      if (!err) {
        Contact.destroy({
          where: {},
          truncate: true,
          cascade: true,
          restartIdentity: true
        })
        .then(() => {
          if (!err) {
            Contact.destroy({
              where: {},
              truncate: true,
              cascade: true,
              restartIdentity: true
            })
          }
        }).then(() => {
          done()
        })
      }
    })
  })

  describe('Create Referrals Endpoint /v1/referrals', () => {
    beforeEach(done => {
      Contact.create({
        email: 'test.user1@influitive.com',
        name: 'Test User1',
        points: 100
      }).then(() => {
        done()
      })
    })
    it('should not create referral if referral email exists', done => {
      Referral.create({
        email: 'referral.one@influitive.com',
        name: 'Referral One',
        points: REFERRAL_POINTS,
        referrerId: 1
      })
      request(app)
        .post('/v1/referrals/new')
        .send({
          email: 'referral.one@influitive.com',
          name: 'Referral Two',
          points: REFERRAL_POINTS,
          referrerId: 1
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(409)
          expect(res.body.message).to.equal('Record already exists')
          done()
        })
    })
  })
})
