import jwt from 'jsonwebtoken';
import config from '../../../config/index';
import { comparePassword } from '../../../utils/password';
import IncorrectCredentials from '../../errors/user/IncorrectCredentials';

export default class AuthService {
  constructor(models) {
    this._User = models.User;
  }

  async authenticateUser(username, password) {
    let user = await this._User.findUserByCredentials(username);
    const validPassword = await comparePassword(password, user.password);
    if (user && validPassword) {
      user = this._removeUserPassword(user);
      const payload = { user };
      const response = {
        token: jwt.sign(payload, config.secret, { algorithm: 'HS256', expiresIn: '1h' })
      };
      return response;
    }
    throw new IncorrectCredentials();
  }

  // eslint-disable-next-line class-methods-use-this
  _removeUserPassword(user) {
    return {
      id: user.id,
      username: user.username,
      lastLogin: user.lastLogin,
      lastModule: user.lastModule,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
