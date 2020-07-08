'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(15),
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      lastModule: {
        allowNull: true,
        type: Sequelize.STRING(25),
        field: 'last_module'
      },
      lastLogin: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'last_login'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_account');
  }
};