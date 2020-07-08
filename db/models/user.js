'use strict';
const { hashPassword } = require('../../utils/password');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(15),
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    lastModule: {
      allowNull: true,
      type: DataTypes.STRING(25),
      field: 'last_module'
    },
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'last_login'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user_account',
    hooks: {
      async beforeCreate(user) {
        user.password = await hashPassword(user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.findUserByCredentials = function(username) {
    return User.findOne({
      where: {
        username
      }
    });
  }

  User.findUserById = function(id) {
    return User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    });
  }

  User.findUserByUsername = function(username) {
    return User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
  }
  return User;
};