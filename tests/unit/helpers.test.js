import { expect } from 'chai';
import { wrongPassword, password } from '../fixtures/helpers';

import {
  comparePassword,
  hashPassword,
  addDataToToken,
  verifyToken
} from '../../Utils';

describe('Basic Auth Helper Functions', () => {
  let hashedPassword;
  it('should encrypt plain password sent in', () => {
    hashedPassword = hashPassword(password);
    expect(hashedPassword).length.is.greaterThan(15);
  });
  it('hashed password should be the same as the plain password', () => {
    const comparedPassword = comparePassword(password, hashedPassword);
    expect(comparedPassword).to.be.a('boolean').equals(true);
  });
});
