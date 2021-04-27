import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { CustomerModel } from '../../Models';
import app from '../../app';
import {
  userLogin, user, errorSignup, invalidEmailLogin, errorLogin, existingUserSignup,
} from '../fixtures/customers';
import { quantity } from '../fixtures/food';

chai.use(chaiHttp);
let token;
let foodId;
describe('User activities', () => {
  describe('Auth Routes', () => {
    before(async () => {
      await CustomerModel.deleteMany();
    });
    it('should properly signup a user', (done) => {
      chai.request(app).post('/signup').send(user)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should login a registered user', (done) => {
      chai.request(app).post('/login').send(userLogin)
        .end((err, res) => {
          // console.log(res.body);
          token = res.body.data.token;
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data.token).length.is.greaterThan(200);
          done();
        });
    });
    it('should get all food items in the available', (done) => {
      chai.request(app).get('/food').end((err, res) => {
        // eslint-disable-next-line no-underscore-dangle
        foodId = res.body.data[0]._id;
        expect(res.body.message).to.be.equal('Foods fetched successfully');
        done();
      });
    });
    it('should throw a validation error', (done) => {
      chai.request(app).post('/signup').send(errorSignup)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.status).to.equals('fail');
          done();
        });
    });
    it('should throw a validation error when signing up with an existing email', (done) => {
      chai.request(app).post('/signup').send(existingUserSignup)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.message).to.equals('user already exists.');
          done();
        });
    });
    it('should throw a validation error on login', (done) => {
      chai.request(app).post('/login').send(invalidEmailLogin)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.message).to.equals('"email" must be a valid email');
          done();
        });
    });
    it('should throw a validation error on login', (done) => {
      chai.request(app).post('/login').send(errorLogin)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.message).to.equals('user does not exist.');
          done();
        });
    });
  });
  describe('food payment routes', () => {
    it('should add a food item to the users cart', (done) => {
      chai.request(app).post(`/cart/${foodId}`).set({ Authorization: `Bearer ${token}` }).send(quantity)
        .end((err, res) => {
          console.log(quantity);
          expect(res.body.status).to.equals('success');
          done();
        });
    });
    it('should get all items in the user cart', (done) => {
      chai.request(app).get('/cart').set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Cart fetched successfully');
          expect(typeof (res.body.data[0].items)).to.be.equal('object');
          done();
        });
    });
    it('should initiate payment for items on the cart', (done) => {
      chai.request(app).post('/payment').set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          console.log(token);
          console.log(res.body);
          expect(res.body.data.access_code).length.is.greaterThan(10);
          done();
        });
    });
  });
});
