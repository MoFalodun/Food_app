import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { AdminModel } from '../../Models';
import app from '../../app';
import { admin, adminLogin, wrongAdmin } from '../fixtures/admin';
import { food } from '../fixtures/food';

chai.use(chaiHttp);
let token;
let foodId;
describe('Admin Auth Routes', () => {
  before(async () => {
    await Promise.all([AdminModel.deleteMany(),
      AdminModel.create(admin)]);
  });
  it('should login a registered admin', (done) => {
    chai.request(app).post('/admin/login').send(adminLogin)
      .end((err, res) => {
        token = res.body.data.token;
        expect(res.body.status).to.be.equal('success');
        expect(res.body.message).to.be.equal('Admin logged in successfully');
        done();
      });
  });
  it('should not login an unauthorized person', (done) => {
    chai.request(app).post('/admin/login').send(wrongAdmin)
      .end((err, res) => {
        expect(res.body.status).to.equals('fail');
        done();
      });
  });
  it('should add food items to the store', (done) => {
    chai.request(app).post('/food').set({ Authorization: `Bearer ${token}` }).send(food)
      .end((err, res) => {
        expect(res.body.status).to.be.equal('success');
        // eslint-disable-next-line no-underscore-dangle
        expect(res.body.data._id).length.to.above(23);
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
  it('should delete food added', (done) => {
    chai.request(app).delete(`/food/${foodId}`).set({ Authorization: `Bearer ${token}` }).end((err, res) => {
      expect(res.body.status).to.be.equals('success');
      done();
    });
  });
});
