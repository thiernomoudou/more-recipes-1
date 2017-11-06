/* eslint-disable */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import config from '../../config';
import application from '../../index';
import db from '../../database/models/index';

chai.use(chaiHttp);
const globalMock = {};

describe('/users', () => {
  beforeEach(async () => {
    await db.User.destroy({ where: {}, truncate: true });
  });
  describe('/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(application)
      .post('/api/v1/users/signup')
      .send({
        name: 'brand new user',
        email: 'brand-new@user.com',
        password: 'secret'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        const responseData = response.body.data;

        expect(responseData.user.id).to.not.be.undefined;
        expect(responseData.access_token).to.not.be.undefined;
        done();
      });
    });
  });

  describe('/signin', () => {
    beforeEach(async () => {
      
      await db.User.destroy({ where: {}, truncate: true });
  
      globalMock.user1 = await db.User.create({
        name: 'kati frantz',
        email: 'kati@frantz.com',
        password: await bcrypt.hash('secret', 10)
      });
  
    });
    it('Should return auth token for valid user credentials', (done) => {
      chai.request(application)
        .post('/api/v1/users/signin')
        .send({
          email: 'kati@frantz.com',
          password: 'secret'
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          const responseData = response.body.data;

          expect(responseData.user.id).to.equal(globalMock.user1.id);
          expect(responseData.access_token).to.not.be.undefined;
          done();
        });
    });
    it('Should return `These credentials do not match our records.` if the user with email is not found.', (done) => {
      chai.request(application)
      .post('/api/v1/users/signin')
      .send({
        email: 'fakeAndInexistent@user.com',
        password: 'secret'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        const responseData = response.body.data;

        expect(responseData.message).to.equal('These credentials do not match our records.');
        done();
      });
    });

    it('Should return `These credentials do not match our records.` if the user password is not correct', (done) => {
      chai.request(application)
      .post('/api/v1/users/signin')
      .send({
        email: 'kati@frantz.com',
        password: 'secret-wrong-password'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        const responseData = response.body.data;

        expect(responseData.message).to.equal('These credentials do not match our records.');
        done();
      });
    });
  });

});
