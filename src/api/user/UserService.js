import UserNotFoundError from '../../errors/user/UserNotFoundError';

export default class UserService {
  constructor(models) {
    this._User = models.User;
  }

  getAllUsers() {
    return this._User.findAll({ attributes: { exclude: ['password'] } });
  }

  getUserById(id) {
    return this._findUserById(id);
  }

  getUserByUsername(username) {
    return this._findUserByUsername(username);
  }

  async createUser(payload) {
    const user = new this._User(payload);
    const {
      username, createdAt, lastModule, lastLogin
    } = await user.save();

    return {
      username, createdAt, lastModule, lastLogin
    };
  }

  async _findUserByUsername(username) {
    const user = await this._User.findUserByUsername(username);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async _findUserById(userId) {
    const user = await this._User.findUserById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    return { success: true, user };
  }
}
