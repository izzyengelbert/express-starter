/* eslint-disable max-lines-per-function */
import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'name'
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'username'
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'email'
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'password'
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'phone_number'
      }
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'user_account'
    });
  }

  static associate(models) {
    const {
      // eslint-disable-next-line no-unused-vars
      User: UserModel
    } = models;
    // Example :
    // UserModel.hasOne(StoreModel);
  }

  static findUserByCredentials(username, hashedPassword) {
    return User.findOne({
      where: {
        username,
        password: hashedPassword
      },
      attributes: { exclude: ['password'] }
      // example for join
      // include: [storeModel]
    });
  }

  static findUserById(id) {
    return User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    });
  }

  static findUserByUsername(username) {
    return User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
  }
}

export default User;
