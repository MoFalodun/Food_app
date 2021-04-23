import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { CustomerModel } from '../../Models';
import app from '../../app';
import { userLogin, user } from '../fixtures/customers';

chai.use(chaiHttp);
let token;
describe('Auth Routes', () => {
  before(async () => {
    await CustomerModel.deleteMany();
  });
  it('should properly signup a user', (done) => {
    chai.request(app).post('/signup').send(user).end((err, res) => {
      expect(res.body.status).to.be.equal.to(9);
    });
    done();
  });
  it('should login a registered user', (done) => {
    chai.request(app).post('/login').send(userLogin)
      .end((err, res) => {
        console.log(res);
        token = res.body.data.token;
        // expect(res.body.status).to.be.equal.to(400);
      });
    done();
  });
  it('should get all items in the user cart', (done) => {
    chai.request(app).get('/cart').set({ Authorization: token })
      .end((err, res) => {
        expect(res.body.status).to.be.equal.to(200);
      });
    done();
  });
});
